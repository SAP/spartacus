/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import {
  Command,
  CommandService,
  QueryService,
  UserIdService,
  WindowRef,
} from '@spartacus/core';
import {
  OpfOtpFacade,
  OpfPaymentFacade,
  OpfPaymentVerificationPayload,
  OpfPaymentVerificationResponse,
  PaymentMethod,
  SubmitCompleteRequest,
  SubmitCompleteResponse,
  SubmitInput,
  SubmitRequest,
  SubmitResponse,
  SubmitStatus,
} from '@spartacus/opf/base/root';

import { ActiveCartFacade } from '@spartacus/cart/base/root';
import { Observable, combineLatest, from, of, throwError } from 'rxjs';
import {
  catchError,
  concatMap,
  concatMapTo,
  filter,
  switchMap,
  take,
} from 'rxjs/operators';
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
      submitRequest: SubmitRequest;
    },
    SubmitResponse
  > = this.commandService.create((payload) =>
    this.opfPaymentConnector.submitPayment(payload.submitRequest)
  );

  protected submitPayment2Command: Command<
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
        // this.activeCartId = cartId;
        console.log('userId', userId);
        console.log('cartId', cartId);
        submitRequest.cartId = cartId;
        return this.opfOtpFacade.generateOtpKey(userId, cartId);
      }),
      filter((response) => Boolean(response?.value)),
      concatMap(({ value: otpKey }) =>
        this.opfPaymentConnector.submitPayment({ ...submitRequest, otpKey })
      ),
      concatMap((response: SubmitResponse) => {
        if (
          response.status === SubmitStatus.ACCEPTED ||
          response.status === SubmitStatus.DELAYED
        ) {
          return from(Promise.resolve(submitSuccess(response)));
        } else if (response.status === SubmitStatus.PENDING) {
          return from(Promise.resolve(submitPending(response))).pipe(
            concatMapTo(of(false))
          );
        } else if (response.status === SubmitStatus.REJECTED) {
          return from(Promise.resolve(submitFailure(response))).pipe(
            concatMapTo(
              throwError({ status: -1, type: 'PAYMENT_REJECTED', message: '' })
            )
          );
        } else {
          return from(Promise.resolve(submitFailure(response))).pipe(
            concatMapTo(
              throwError({
                status: -1,
                type: 'STATUS_NOT_RECOGNIZED',
                message: '',
              })
            )
          );
        }
      }),
      concatMapTo(of(true)),
      take(1),
      catchError((error: any) => {
        if (String(error.status) === SubmitStatus.REJECTED) {
          console.log('error REJECTED, returnPath', returnPath);
        }
        console.log('error, returnPath', returnPath);
        return throwError(error);
      })
    );
  });

  protected submitCompletePaymentCommand: Command<
    {
      submitCompleteRequest: SubmitCompleteRequest;
    },
    SubmitCompleteResponse
  > = this.commandService.create((payload) =>
    this.opfPaymentConnector.submitCompletePayment(
      payload.submitCompleteRequest
    )
  );

  constructor(
    protected queryService: QueryService,
    protected commandService: CommandService,
    protected opfPaymentConnector: OpfPaymentConnector,
    protected winRef: WindowRef,
    protected opfOtpFacade: OpfOtpFacade,
    protected activeCartFacade: ActiveCartFacade,
    protected userIdService: UserIdService
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

  submitPayment(submitRequest: SubmitRequest): Observable<SubmitResponse> {
    return this.submitPaymentCommand.execute({ submitRequest });
  }

  submitPayment2(submitInput: SubmitInput): Observable<boolean> {
    return this.submitPayment2Command.execute({ submitInput });
  }

  // submitPayment2Command(submitInput: SubmitInput): Observable<boolean> {
  //   const [submitSuccess, submitPending, submitFailure] =
  //     submitInput.callbackArray;
  //   const {
  //     paymentMethod,
  //     cartId,
  //     additionalData,
  //     paymentSessionId,
  //     returnPath,
  //   } = submitInput;
  //   const currentDate = new Date();
  //   const timeZoneOffset = currentDate.getTimezoneOffset();
  //   const submitRequest: SubmitRequest = {
  //     paymentMethod,
  //     cartId,
  //     channel: 'BROWSER',
  //     browserInfo: {
  //       acceptHeader: '*/*',
  //       colorDepth: this.winRef.nativeWindow?.screen?.colorDepth,
  //       javaEnabled: this.winRef.nativeWindow?.navigator?.javaEnabled(),
  //       javaScriptEnabled: true,
  //       language: this.winRef.nativeWindow?.navigator?.language,
  //       screenHeight: this.winRef.nativeWindow?.screen?.height,
  //       screenWidth: this.winRef.nativeWindow?.screen?.width,
  //       userAgent: this.winRef.nativeWindow?.navigator?.userAgent,
  //       originUrl: this.winRef.nativeWindow?.location?.origin,
  //       timeZoneOffset,
  //     },
  //     additionalData,
  //     paymentSessionId,
  //   };
  //   if (paymentMethod !== PaymentMethod.CREDIT_CARD) {
  //     submitRequest.encryptedToken = '';
  //   }
  //   console.log('flo submitRequest', submitRequest);
  //   return combineLatest([
  //     this.userIdService.getUserId(),
  //     this.activeCartFacade.getActiveCartId(),
  //   ]).pipe(
  //     switchMap(([userId, cartId]: [string, string]) => {
  //       // this.activeCartId = cartId;
  //       console.log('userId', userId);
  //       console.log('cartId', cartId);
  //       submitRequest.cartId = cartId;
  //       return this.opfOtpFacade.generateOtpKey(userId, cartId);
  //     }),
  //     filter((response) => Boolean(response?.value)),
  //     concatMap(({ value: otpKey }) =>
  //       this.opfPaymentConnector.submitPayment({ ...submitRequest, otpKey })
  //     ),
  //     concatMap((response: SubmitResponse) => {
  //       if (
  //         response.status === SubmitStatus.ACCEPTED ||
  //         response.status === SubmitStatus.DELAYED
  //       ) {
  //         return from(Promise.resolve(submitSuccess(response)));
  //       } else if (response.status === SubmitStatus.PENDING) {
  //         return from(Promise.resolve(submitPending(response))).pipe(
  //           concatMapTo(of(false))
  //         );
  //       } else if (response.status === SubmitStatus.REJECTED) {
  //         return from(Promise.resolve(submitFailure(response))).pipe(
  //           concatMapTo(
  //             throwError({ status: -1, type: 'PAYMENT_REJECTED', message: '' })
  //           )
  //         );
  //       } else {
  //         return from(Promise.resolve(submitFailure(response))).pipe(
  //           concatMapTo(
  //             throwError({
  //               status: -1,
  //               type: 'STATUS_NOT_RECOGNIZED',
  //               message: '',
  //             })
  //           )
  //         );
  //       }
  //     }),
  //     concatMapTo(of(true)),
  //     take(1),
  //     catchError((error: any) => {
  //       if (String(error.status) === SubmitStatus.REJECTED) {
  //         console.log('error REJECTED, returnPath', returnPath);
  //       }
  //       console.log('error, returnPath', returnPath);
  //       return throwError(error);
  //     })
  //   );
  // }

  submitCompletePayment(
    submitCompleteRequest: SubmitCompleteRequest
  ): Observable<SubmitCompleteResponse> {
    return this.submitCompletePaymentCommand.execute({ submitCompleteRequest });
  }
}
