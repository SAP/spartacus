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
  HttpErrorModel,
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
  PaymentMethod,
  SubmitCompleteInput,
  SubmitCompleteRequest,
  SubmitCompleteResponse,
  SubmitInput,
  SubmitRequest,
  SubmitResponse,
  SubmitStatus,
} from '@spartacus/opf/base/root';

import { ActiveCartFacade } from '@spartacus/cart/base/root';
import { Order } from '@spartacus/order/root';
import { EMPTY, Observable, combineLatest, from, of, throwError } from 'rxjs';
import { catchError, concatMap, filter, switchMap, take } from 'rxjs/operators';
import { OpfPaymentConnector } from '../connectors/opf-payment.connector';

/** Observable constant that emits undefined and then completes. */
export const UNDEFINED = new Observable<undefined>((observer) => {
  observer.next();
  observer.complete();
});

/** Observable constant that emits void and then completes. */
export const VOID: Observable<void> = UNDEFINED;
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
      paymentSessionId,
    };
    if (paymentMethod !== PaymentMethod.CREDIT_CARD) {
      submitRequest.encryptedToken = '';
    }
    console.log('flo submitRequest', submitRequest);
    return combineLatest([
      this.userIdService.getUserId(),
      this.activeCartFacade.getActiveCartId(),
    ]).pipe(
      switchMap(([userId, cartId]: [string, string]) => {
        submitRequest.cartId = cartId;
        return this.opfOtpFacade.generateOtpKey(userId, cartId);
      }),
      filter((response) => Boolean(response?.value)),
      take(1),
      concatMap(({ value: otpKey }) =>
        this.opfPaymentConnector.submitPayment({ ...submitRequest, otpKey })
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
            concatMap(() => throwError(this.defaultError))
          );
        } else {
          return from(Promise.resolve(submitFailure(response))).pipe(
            concatMap(() => throwError(this.defaultError))
          );
        }
      }),
      concatMap((order: Order) => {
        console.log('order:', order);
        // only reach this point when order is succesfull
        if (order) {
          console.log('go orderConfirmation');
          this.routingService.go({ cxRoute: 'orderConfirmation' });
          return of(true);
        } else {
          return of(false);
        }
      }),

      catchError((error: HttpErrorModel | undefined) => {
        if (String(error?.status) === SubmitStatus.REJECTED) {
          console.log('error REJECTED, returnPath', returnPath);
        }
        console.log('error, returnPath', returnPath);

        this.displayError(error);
        return throwError(error);
      })
    );
  });

  protected submitCompletePaymentCommand: Command<
    {
      submitCompleteInput: SubmitCompleteInput;
    },
    boolean
  > = this.commandService.create((payload) => {
    const [submitSuccess, submitPending, submitFailure] =
      payload.submitCompleteInput.callbackArray;
    const { cartId, additionalData, paymentSessionId, returnPath } =
      payload.submitCompleteInput;

    const submitCompleteRequest: SubmitCompleteRequest = {
      cartId,
      additionalData,
      paymentSessionId,
    };

    console.log('flo submitCompleteRequest', submitCompleteRequest);
    return combineLatest([
      this.userIdService.getUserId(),
      this.activeCartFacade.getActiveCartId(),
    ]).pipe(
      switchMap(([userId, cartId]: [string, string]) => {
        submitCompleteRequest.cartId = cartId;
        return this.opfOtpFacade.generateOtpKey(userId, cartId);
      }),
      filter((response) => Boolean(response?.value)),
      take(1),
      concatMap(({ value: otpKey }) =>
        this.opfPaymentConnector.submitCompletePayment({
          ...submitCompleteRequest,
          otpKey,
        })
      ),
      concatMap((response: SubmitCompleteResponse) => {
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
            concatMap(() => throwError(this.defaultError))
          );
        } else {
          return from(Promise.resolve(submitFailure(response))).pipe(
            concatMap(() => throwError(this.defaultError))
          );
        }
      }),
      concatMap((order: Order) => {
        console.log('order:', order);
        // only reach this point when order is succesfull
        if (order) {
          console.log('go orderConfirmation');
          this.routingService.go({ cxRoute: 'orderConfirmation' });
          return of(true);
        } else {
          return of(false);
        }
      }),

      catchError((error: HttpErrorModel | undefined) => {
        if (String(error?.status) === SubmitStatus.REJECTED) {
          console.log('error REJECTED, returnPath', returnPath);
        }
        console.log('error, returnPath', returnPath);

        this.displayError(error);
        return throwError(error);
      })
    );
  });

  // protected submitCompletePaymentCommand: Command<
  //   {
  //     submitCompleteRequest: SubmitCompleteRequest;
  //   },
  //   SubmitCompleteResponse
  // > = this.commandService.create((payload) =>
  //   this.opfPaymentConnector.submitCompletePayment(
  //     payload.submitCompleteRequest
  //   )
  // );

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

  defaultError: HttpErrorModel = {
    statusText: 'Payment Verification Error',
    message: 'opf.payment.errors.proceedPayment',
    status: -1,
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

  displayError(error: HttpErrorModel | undefined): void {
    this.globalMessageService.add(
      {
        key:
          error?.message && error?.status === -1
            ? error.message
            : 'opf.payment.errors.proceedPayment',
      },
      GlobalMessageType.MSG_TYPE_ERROR
    );
  }

  submitCompletePayment(
    submitCompleteInput: SubmitCompleteInput
  ): Observable<boolean> {
    return this.submitCompletePaymentCommand.execute({ submitCompleteInput });
  }
}
