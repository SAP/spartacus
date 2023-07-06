/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import {
  Command,
  CommandService,
  GlobalMessageService,
  RoutingService,
  UserIdService,
  WindowRef,
} from '@spartacus/core';
import {
  MerchantCallback,
  OpfOrderFacade,
  OpfOtpFacade,
  OpfPaymentError,
  OpfPaymentFacade,
  OpfPaymentVerificationPayload,
  OpfPaymentVerificationResponse,
  PaymentErrorType,
  PaymentMethod,
  SubmitInput,
  SubmitRequest,
  SubmitResponse,
  SubmitStatus,
  defaultError,
} from '@spartacus/opf/base/root';

import { ActiveCartFacade } from '@spartacus/cart/base/root';
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
import { OpfPaymentConnector } from '../connectors/opf-payment.connector';
import { OpfPaymentErrorHandlerService } from '../services/opf-payment-error-handler.service';
import { getBrowserInfo } from '../utils/opf-payment-utils';

@Injectable()
export class OpfPaymentService implements OpfPaymentFacade {
  protected verifyPaymentCommand: Command<
    {
      paymentSessionId: string;
      paymentVerificationPayload: OpfPaymentVerificationPayload;
    },
    OpfPaymentVerificationResponse
  > = this.commandService.create((payload) =>
    this.opfPaymentConnector.verifyPayment(
      payload.paymentSessionId,
      payload.paymentVerificationPayload
    )
  );

  protected submitPaymentCommand: Command<
    {
      submitInput: SubmitInput;
    },
    boolean
  > = this.commandService.create((payload) => {
    const {
      paymentMethod,
      cartId,
      additionalData,
      paymentSessionId,
      returnPath,
    } = payload.submitInput;

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
        this.submitPaymentResponseHandler(
          response,
          payload.submitInput.callbackArray
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
  });

  protected submitPaymentResponseHandler(
    response: SubmitResponse,
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

  constructor(
    protected commandService: CommandService,
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

  verifyPayment(
    paymentSessionId: string,
    paymentVerificationPayload: OpfPaymentVerificationPayload
  ): Observable<OpfPaymentVerificationResponse> {
    return this.verifyPaymentCommand.execute({
      paymentSessionId,
      paymentVerificationPayload,
    });
  }

  submitPayment(submitInput: SubmitInput): Observable<boolean> {
    return this.submitPaymentCommand.execute({ submitInput });
  }
}
