/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { ActiveCartFacade } from '@spartacus/cart/base/root';
import {
  GlobalMessageService,
  RoutingService,
  UserIdService,
  WindowRef,
} from '@spartacus/core';
import { Order } from '@spartacus/order/root';

import { EMPTY, Observable, combineLatest, from, throwError } from 'rxjs';
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
  defaultError,
} from '@spartacus/opf/base/root';
import { OpfPaymentConnector } from '../connectors/opf-payment.connector';
import { OpfPaymentErrorHandlerService } from '../services/opf-payment-error-handler.service';
import { getBrowserInfo } from '../utils/opf-payment-utils';

@Injectable()
export class OpfPaymentHostedFieldsService {
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

  submitPayment(submitInput: SubmitInput): Observable<boolean> {
    const {
      paymentMethod,
      cartId,
      additionalData,
      paymentSessionId,
      returnPath,
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

    return combineLatest([
      this.userIdService.getUserId(),
      this.activeCartFacade.getActiveCartId(),
    ]).pipe(
      switchMap(([userId, activeCartId]: [string, string]) => {
        submitRequest.cartId = activeCartId;
        return this.opfOtpFacade.generateOtpKey(userId, activeCartId);
      }),
      filter((response) => Boolean(response?.value)),
      take(1),
      concatMap(({ value: otpKey }) =>
        this.opfPaymentConnector.submitPayment(
          submitRequest,
          otpKey,
          paymentSessionId
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
      switchMap(([userId, activeCartId]: [string, string]) => {
        submitCompleteRequest.cartId = activeCartId;
        return this.opfOtpFacade.generateOtpKey(userId, activeCartId);
      }),
      filter((response) => Boolean(response?.value)),
      take(1),
      concatMap(({ value: otpKey }) =>
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
    ]
  ) {
    if (
      response.status === SubmitStatus.ACCEPTED ||
      response.status === SubmitStatus.DELAYED
    ) {
      return from(Promise.resolve(submitSuccess(response))).pipe(
        concatMap(() => this.opfOrderFacade.placeOpfOrder(true))
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
