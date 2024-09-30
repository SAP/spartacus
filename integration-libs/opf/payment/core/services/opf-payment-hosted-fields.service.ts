/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import {
  ActiveCartFacade,
  CartAccessCodeFacade,
} from '@spartacus/cart/base/root';
import {
  backOff,
  DEFAULT_AUTHORIZATION_ERROR_RETRIES_COUNT,
  GlobalMessageService,
  isAuthorizationError,
  RoutingService,
  UserIdService,
  WindowRef,
} from '@spartacus/core';
import { Order, OrderFacade } from '@spartacus/order/root';

import { combineLatest, EMPTY, from, Observable, of, throwError } from 'rxjs';
import { catchError, concatMap, map, switchMap, tap } from 'rxjs/operators';

import {
  defaultError,
  MerchantCallback,
  OpfPaymentError,
  PaymentErrorType,
  PaymentMethod,
  SubmitCompleteInput,
  SubmitCompleteRequest,
  SubmitCompleteResponse,
  SubmitInput,
  SubmitRequest,
  SubmitResponse,
  SubmitStatus,
} from '@spartacus/opf/payment/root';
import { OpfPaymentConnector } from '../connectors/opf-payment.connector';
import { OpfPaymentErrorHandlerService } from '../services/opf-payment-error-handler.service';

import { getBrowserInfo } from '../utils/opf-payment-utils';

@Injectable()
export class OpfPaymentHostedFieldsService {
  constructor(
    protected opfPaymentConnector: OpfPaymentConnector,
    protected winRef: WindowRef,
    protected cartAccessCodeFacade: CartAccessCodeFacade,
    protected activeCartFacade: ActiveCartFacade,
    protected userIdService: UserIdService,
    protected routingService: RoutingService,
    protected orderFacade: OrderFacade,
    protected globalMessageService: GlobalMessageService,
    protected opfPaymentErrorHandlerService: OpfPaymentErrorHandlerService
  ) {}

  submitPayment(submitInput: SubmitInput): Observable<boolean> {
    const {
      paymentMethod,
      cartId,
      additionalData,
      paymentSessionId,
      returnPath,
      encryptedToken,
    } = submitInput;

    const submitRequest: SubmitRequest = {
      paymentMethod,
      cartId,
      additionalData,
      channel: 'BROWSER',
      browserInfo: getBrowserInfo(this.winRef.nativeWindow),
    };
    if (paymentMethod !== PaymentMethod.CREDIT_CARD) {
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
      concatMap((response: SubmitResponse) =>
        this.paymentResponseHandler(response, submitInput.callbackArray)
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
    submitCompleteInput: SubmitCompleteInput
  ): Observable<boolean> {
    const { cartId, additionalData, paymentSessionId, returnPath } =
      submitCompleteInput;

    const submitCompleteRequest: SubmitCompleteRequest = {
      cartId,
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
      concatMap((response: SubmitCompleteResponse) =>
        this.paymentResponseHandler(response, submitCompleteInput.callbackArray)
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
    response: SubmitResponse | SubmitCompleteResponse,
    [submitSuccess, submitPending, submitFailure]: [
      MerchantCallback,
      MerchantCallback,
      MerchantCallback,
    ]
  ): Observable<Order> {
    if (
      response.status === SubmitStatus.ACCEPTED ||
      response.status === SubmitStatus.DELAYED
    ) {
      return from(Promise.resolve(submitSuccess(response))).pipe(
        concatMap(() => this.orderFacade.placePaymentAuthorizedOrder(true))
      );
    } else if (response.status === SubmitStatus.PENDING) {
      return from(Promise.resolve(submitPending(response))).pipe(
        concatMap(() => EMPTY)
      );
    } else if (response.status === SubmitStatus.REJECTED) {
      return from(Promise.resolve(submitFailure(response))).pipe(
        concatMap(() =>
          throwError({
            ...defaultError,
            type: PaymentErrorType.PAYMENT_REJECTED,
          })
        )
      );
    } else {
      return from(Promise.resolve(submitFailure(response))).pipe(
        concatMap(() =>
          throwError({
            ...defaultError,
            type: PaymentErrorType.STATUS_NOT_RECOGNIZED,
          })
        )
      );
    }
  }
  protected getCartAccessCode(
    submitRequest: SubmitRequest | SubmitCompleteRequest
  ): Observable<
    [SubmitRequest | SubmitCompleteRequest, { accessCode: string }]
  > {
    return combineLatest([
      this.userIdService.takeUserId(),
      this.activeCartFacade.takeActiveCartId(),
    ]).pipe(
      switchMap(([userId, activeCartId]: [string, string]) => {
        submitRequest.cartId = activeCartId;
        return combineLatest([
          of(submitRequest),
          this.cartAccessCodeFacade.getCartAccessCode(userId, activeCartId),
        ]);
      })
    );
  }
}
