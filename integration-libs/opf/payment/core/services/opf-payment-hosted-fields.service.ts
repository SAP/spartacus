/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, inject } from '@angular/core';
import {
  ActiveCartFacade,
  CartAccessCodeFacade,
} from '@spartacus/cart/base/root';
import {
  DEFAULT_AUTHORIZATION_ERROR_RETRIES_COUNT,
  GlobalMessageService,
  RoutingService,
  UserIdService,
  WindowRef,
  backOff,
  isAuthorizationError,
} from '@spartacus/core';
import { Order, OrderFacade } from '@spartacus/order/root';

import { EMPTY, Observable, combineLatest, from, of, throwError } from 'rxjs';
import { catchError, concatMap, map, switchMap, tap } from 'rxjs/operators';

import {
  OpfPaymentError,
  OpfPaymentErrorType,
  OpfPaymentMerchantCallback,
  OpfPaymentMethod,
  OpfPaymentSubmitCompleteInput,
  OpfPaymentSubmitCompleteRequest,
  OpfPaymentSubmitCompleteResponse,
  OpfPaymentSubmitInput,
  OpfPaymentSubmitRequest,
  OpfPaymentSubmitResponse,
  OpfPaymentSubmitStatus,
  opfDefaultPaymentError,
} from '@spartacus/opf/payment/root';
import { OpfPaymentConnector } from '../connectors/opf-payment.connector';
import { OpfPaymentErrorHandlerService } from '../services/opf-payment-error-handler.service';

import { getBrowserInfo } from '../utils/opf-payment-utils';

@Injectable()
export class OpfPaymentHostedFieldsService {
  protected opfPaymentConnector = inject(OpfPaymentConnector);
  protected winRef = inject(WindowRef);
  protected cartAccessCodeFacade = inject(CartAccessCodeFacade);
  protected activeCartFacade = inject(ActiveCartFacade);
  protected userIdService = inject(UserIdService);
  protected routingService = inject(RoutingService);
  protected orderFacade = inject(OrderFacade);
  protected globalMessageService = inject(GlobalMessageService);
  protected opfPaymentErrorHandlerService = inject(
    OpfPaymentErrorHandlerService
  );

  submitPayment(submitInput: OpfPaymentSubmitInput): Observable<boolean> {
    const {
      paymentMethod,
      additionalData,
      paymentSessionId,
      returnPath,
      encryptedToken,
    } = submitInput;

    const submitRequest: OpfPaymentSubmitRequest = {
      paymentMethod,
      additionalData,
      channel: 'BROWSER',
      browserInfo: getBrowserInfo(this.winRef.nativeWindow),
    };
    if (paymentMethod !== OpfPaymentMethod.CREDIT_CARD) {
      submitRequest.encryptedToken = '';
    }
    if (encryptedToken) {
      submitRequest.encryptedToken = encryptedToken;
    }

    return this.getCartAccessCode(submitRequest).pipe(
      concatMap(([request, { accessCode: otpKey }]) =>
        this.opfPaymentConnector.submitPayment(
          request,
          otpKey,
          paymentSessionId as string
        )
      ),
      concatMap((response: OpfPaymentSubmitResponse) =>
        this.paymentResponseHandler(response, submitInput.callbacks)
      ),
      tap((order: Order) => {
        if (order) {
          this.routingService.go({ cxRoute: 'orderConfirmation' });
        }
      }),
      map((order: Order) => (order ? true : false)),
      catchError((error: OpfPaymentError | undefined) => {
        this.opfPaymentErrorHandlerService.handlePaymentError(
          error,
          returnPath
        );
        return throwError(error);
      }),
      backOff({
        /**
         * We should retry this sequence only if the error is an authorization error.
         * It means that `accessCode` (OTP signature) is not valid or expired and we need to refresh it.
         */
        shouldRetry: isAuthorizationError,
        maxTries: DEFAULT_AUTHORIZATION_ERROR_RETRIES_COUNT,
      })
    );
  }

  submitCompletePayment(
    submitCompleteInput: OpfPaymentSubmitCompleteInput
  ): Observable<boolean> {
    const { additionalData, paymentSessionId, returnPath } =
      submitCompleteInput;

    const submitCompleteRequest: OpfPaymentSubmitCompleteRequest = {
      additionalData,
      paymentSessionId,
    };
    return this.getCartAccessCode(submitCompleteRequest).pipe(
      concatMap(([request, { accessCode: otpKey }]) =>
        this.opfPaymentConnector.submitCompletePayment(
          request,
          otpKey,
          paymentSessionId
        )
      ),
      concatMap((response: OpfPaymentSubmitCompleteResponse) =>
        this.paymentResponseHandler(response, submitCompleteInput.callbacks)
      ),
      tap((order: Order) => {
        if (order) {
          this.routingService.go({ cxRoute: 'orderConfirmation' });
        }
      }),
      map((order: Order) => (order ? true : false)),
      catchError((error: OpfPaymentError | undefined) => {
        this.opfPaymentErrorHandlerService.handlePaymentError(
          error,
          returnPath
        );
        return throwError(() => error);
      }),
      backOff({
        /**
         * We should retry this sequence only if the error is an authorization error.
         * It means that `accessCode` (OTP signature) is not valid or expired and we need to refresh it.
         */
        shouldRetry: isAuthorizationError,
        maxTries: DEFAULT_AUTHORIZATION_ERROR_RETRIES_COUNT,
      })
    );
  }

  protected paymentResponseHandler(
    response: OpfPaymentSubmitResponse | OpfPaymentSubmitCompleteResponse,
    callbacks: {
      onSuccess: OpfPaymentMerchantCallback;
      onPending: OpfPaymentMerchantCallback;
      onFailure: OpfPaymentMerchantCallback;
    }
  ): Observable<Order> {
    if (
      response.status === OpfPaymentSubmitStatus.ACCEPTED ||
      response.status === OpfPaymentSubmitStatus.DELAYED
    ) {
      return from(Promise.resolve(callbacks.onSuccess(response))).pipe(
        concatMap(() => this.orderFacade.placePaymentAuthorizedOrder(true))
      );
    } else if (response.status === OpfPaymentSubmitStatus.PENDING) {
      return from(Promise.resolve(callbacks.onPending(response))).pipe(
        concatMap(() => EMPTY)
      );
    } else if (response.status === OpfPaymentSubmitStatus.REJECTED) {
      return from(Promise.resolve(callbacks.onFailure(response))).pipe(
        concatMap(() =>
          throwError({
            ...opfDefaultPaymentError,
            type: OpfPaymentErrorType.PAYMENT_REJECTED,
          })
        )
      );
    } else {
      return from(Promise.resolve(callbacks.onFailure(response))).pipe(
        concatMap(() =>
          throwError({
            ...opfDefaultPaymentError,
            type: OpfPaymentErrorType.STATUS_NOT_RECOGNIZED,
          })
        )
      );
    }
  }
  protected getCartAccessCode(
    submitRequest: OpfPaymentSubmitRequest | OpfPaymentSubmitCompleteRequest
  ): Observable<
    [
      OpfPaymentSubmitRequest | OpfPaymentSubmitCompleteRequest,
      { accessCode: string },
    ]
  > {
    return combineLatest([
      this.userIdService.takeUserId(),
      this.activeCartFacade.takeActiveCartId(),
    ]).pipe(
      switchMap(([userId, activeCartId]: [string, string]) => {
        return combineLatest([
          of(submitRequest),
          this.cartAccessCodeFacade.getCartAccessCode(userId, activeCartId),
        ]);
      })
    );
  }
}
