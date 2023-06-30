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
  GlobalMessageType,
  QueryService,
  RoutingService,
  UserIdService,
  WindowRef,
} from '@spartacus/core';
import {
  OpfOrderFacade,
  OpfOtpFacade,
  OpfPaymentFacade,
  OpfPaymentVerificationPayload,
  OpfPaymentVerificationResponse,
  PaymentError,
  PaymentMethod,
  SubmitInput,
  SubmitRequest,
  SubmitResponse,
  SubmitStatus,
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
    const [submitSuccess, submitPending, submitFailure] =
      payload.submitInput.callbackArray;
    const {
      paymentMethod,
      cartId,
      additionalData,
      paymentSessionId,
      returnPath,
    } = payload.submitInput;
    const currentDate = new Date();
    const timeZoneOffset = currentDate.getTimezoneOffset();
    const submitRequest: SubmitRequest = {
      paymentMethod,
      cartId,
      channel: 'BROWSER',
      browserInfo: {
        acceptHeader: 'application/json',
        colorDepth: this.winRef.nativeWindow?.screen?.colorDepth,
        javaEnabled: this.winRef.nativeWindow?.navigator?.javaEnabled(),
        javaScriptEnabled: true,
        language: this.winRef.nativeWindow?.navigator?.language,
        screenHeight: this.winRef.nativeWindow?.screen?.height,
        screenWidth: this.winRef.nativeWindow?.screen?.width,
        userAgent: this.winRef.nativeWindow?.navigator?.userAgent,
        originUrl: this.winRef.nativeWindow?.location?.origin,
        timeZoneOffset,
      },
      additionalData,
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
      concatMap((response: SubmitResponse) => {
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
              throwError({ ...this.defaultError, type: 'PAYMENT_REJECTED' })
            )
          );
        } else {
          return from(Promise.resolve(submitFailure(response))).pipe(
            concatMap(() =>
              throwError({
                ...this.defaultError,
                type: 'STATUS_NOT_RECOGNIZED',
              })
            )
          );
        }
      }),
      tap((order: Order) => {
        if (order) {
          this.routingService.go({ cxRoute: 'orderConfirmation' });
        }
      }),
      map((order: Order) => (order ? true : false)),
      catchError((error: PaymentError | undefined) => {
        this.handlePaymentError(error, returnPath);
        return throwError(error);
      })
    );
  });

  constructor(
    protected queryService: QueryService,
    protected commandService: CommandService,
    protected opfPaymentConnector: OpfPaymentConnector,
    protected winRef: WindowRef,
    protected opfOtpFacade: OpfOtpFacade,
    protected activeCartFacade: ActiveCartFacade,
    protected userIdService: UserIdService,
    protected routingService: RoutingService,
    protected opfOrderFacade: OpfOrderFacade,
    protected globalMessageService: GlobalMessageService
  ) {}

  defaultError: PaymentError = {
    statusText: 'Payment Error',
    message: 'opf.payment.errors.proceedPayment',
    status: -1,
    type: '',
  };

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

  protected displayError(error: PaymentError | undefined): void {
    this.globalMessageService.add(
      {
        key: error?.message ? error.message : this.defaultError.message,
      },
      GlobalMessageType.MSG_TYPE_ERROR
    );
  }

  protected handle400error(errorType: string): string {
    let message = this.defaultError.message;
    switch (errorType) {
      case 'EXPIRED':
        message = 'opf.payment.errors.cardExpired';
        break;
      case 'INSUFFICENT_FUNDS':
      case 'CREDIT_LIMIT':
        message = 'opf.payment.errors.insufficientFunds';
        break;
      case 'INVALID_CARD':
      case 'INVALID_CVV':
        message = 'opf.payment.errors.invalidCreditCard';
        break;
      case 'LOST_CARD':
        message = 'opf.payment.errors.cardReportedLost';
        break;
    }
    return message;
  }

  protected handlePaymentError(
    error: PaymentError | undefined,
    returnPath: Array<string> = []
  ): void {
    let message = this.defaultError.message;
    if (error?.status === 400) {
      message = this.handle400error(error?.type);
    } else {
      if (error?.type !== 'PAYMENT_CANCELLED') {
        message = 'opf.payment.errors.cancelPayment';
      }
    }
    this.displayError(error ? { ...error, message } : undefined);
    if (returnPath.length) {
      this.routingService.go([...returnPath]);
    }
  }
}
