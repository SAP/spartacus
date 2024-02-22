/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { inject, Injectable } from '@angular/core';
import {
  ActiveCartFacade,
  CartType,
  MultiCartFacade,
} from '@spartacus/cart/base/root';
import {
  GlobalMessageService,
  RoutingService,
  UserIdService,
  WindowRef,
} from '@spartacus/core';
import { Order } from '@spartacus/order/root';

import { combineLatest, EMPTY, from, Observable, throwError } from 'rxjs';
import {
  catchError,
  concatMap,
  filter,
  map,
  switchMap,
  take,
  tap,
} from 'rxjs/operators';

import {
  defaultError,
  MerchantCallback,
  OpfOrderFacade,
  OpfOtpFacade,
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
} from '@spartacus/opf/base/root';
import { OpfPaymentConnector } from '../connectors/opf-payment.connector';
import { OpfPaymentErrorHandlerService } from '../services/opf-payment-error-handler.service';
import { getBrowserInfo } from '../utils/opf-payment-utils';

@Injectable()
export class OpfPaymentHostedFieldsService {
  protected multiCartFacade = inject(MultiCartFacade);
  constructor(
    protected opfPaymentConnector: OpfPaymentConnector,
    protected winRef: WindowRef,
    protected opfOtpFacade: OpfOtpFacade,
    protected activeCartFacade: ActiveCartFacade,
    protected userIdService: UserIdService,
    protected routingService: RoutingService,
    protected opfOrderFacade: OpfOrderFacade,
    protected globalMessageService: GlobalMessageService,
    protected opfPaymentErrorHandlerService: OpfPaymentErrorHandlerService
  ) {}

  submitPayment(
    submitInput: SubmitInput,
    isMultiCart?: boolean
  ): Observable<boolean> {
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
    const cartId$ = isMultiCart
      ? this.multiCartFacade.getCartIdByType(CartType.NEW_CREATED)
      : this.activeCartFacade.getActiveCartId();
    return combineLatest([this.userIdService.getUserId(), cartId$]).pipe(
      filter(
        ([userId, currentCartId]: [string, string]) =>
          !!currentCartId && !!userId
      ),
      switchMap(([userId, currentCartId]: [string, string]) => {
        submitRequest.cartId = currentCartId;
        return this.opfOtpFacade.generateOtpKey(userId, currentCartId);
      }),
      filter((response) => Boolean(response?.accessCode)),
      take(1),
      concatMap(({ accessCode: otpKey }) =>
        this.opfPaymentConnector.submitPayment(
          submitRequest,
          otpKey,
          paymentSessionId
        )
      ),
      concatMap((response: SubmitResponse) =>
        this.paymentResponseHandler(
          response,
          submitInput.callbackArray,
          isMultiCart
        )
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
      })
    );
  }

  submitCompletePayment(submitCompleteInput: SubmitCompleteInput) {
    const { cartId, additionalData, paymentSessionId, returnPath } =
      submitCompleteInput;

    const submitCompleteRequest: SubmitCompleteRequest = {
      cartId,
      additionalData,
      paymentSessionId,
    };

    return combineLatest([
      this.userIdService.getUserId(),
      this.activeCartFacade.getActiveCartId(),
    ]).pipe(
      filter(
        ([userId, activeCartId]: [string, string]) => !!activeCartId && !!userId
      ),
      switchMap(([userId, activeCartId]: [string, string]) => {
        submitCompleteRequest.cartId = activeCartId;
        return this.opfOtpFacade.generateOtpKey(userId, activeCartId);
      }),
      filter((response) => Boolean(response?.accessCode)),
      take(1),
      concatMap(({ accessCode: otpKey }) =>
        this.opfPaymentConnector.submitCompletePayment(
          submitCompleteRequest,
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
        return throwError(error);
      })
    );
  }

  protected paymentResponseHandler(
    response: SubmitResponse | SubmitCompleteResponse,
    [submitSuccess, submitPending, submitFailure]: [
      MerchantCallback,
      MerchantCallback,
      MerchantCallback
    ],
    isMultiCart?: boolean
  ) {
    if (
      response.status === SubmitStatus.ACCEPTED ||
      response.status === SubmitStatus.DELAYED
    ) {
      return from(Promise.resolve(submitSuccess(response))).pipe(
        concatMap(() => this.opfOrderFacade.placeOpfOrder(true, isMultiCart))
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
}
