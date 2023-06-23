import { Injectable } from '@angular/core';
import { ActiveCartFacade } from '@spartacus/cart/base/root';
import { RoutingService, UserIdService, WindowRef } from '@spartacus/core';
import {
  KeyValuePair,
  MerchantCallback,
  OpfOrderFacade,
  OpfPaymentFacade,
  OpfResponseMapElement,
  PaymentMethod,
  SubmitRequest,
  SubmitResponse,
  SubmitStatus,
} from '@spartacus/opf/base/root';
import { OpfOtpFacade } from '@spartacus/opf/checkout/root';
import { EMPTY, Observable, combineLatest, from, throwError } from 'rxjs';
import {
  catchError,
  concatMap,
  concatMapTo,
  filter,
  switchMap,
  tap,
} from 'rxjs/operators';

/** Observable constant that emits undefined and then completes. */
export const UNDEFINED = new Observable<undefined>((observer) => {
  observer.next();
  observer.complete();
});

/** Observable constant that emits void and then completes. */
export const VOID: Observable<void> = UNDEFINED;

@Injectable({
  providedIn: 'root',
})
export class OpfHostedFieldsPaymentService {
  constructor(
    protected winRef: WindowRef,
    protected routingService: RoutingService,
    protected opfPaymentService: OpfPaymentFacade,

    protected opfOrderFacade: OpfOrderFacade,
    protected userIdService: UserIdService,
    protected activeCartService: ActiveCartFacade,
    protected opfOtpService: OpfOtpFacade
  ) {
    console.log('constructor triggered');
  }

  // initializeService(selectedPaymentId: string): void {
  //   this.registerVerify();
  //   this.registerSubmit(selectedPaymentId);
  // }

  // removeService(): void {
  //   const window = this.winRef.nativeWindow as any;
  //   if (window?.Upscale) {
  //     window.Upscale = {};
  //   }
  // }

  verifyPayment(
    paymentSessionId: string,
    responseMap: OpfResponseMapElement[]
  ): Observable<void> {
    return this.opfPaymentService
      .verifyPayment(paymentSessionId, {
        responseMap: [...responseMap],
      })
      .pipe(
        tap((response) => console.log('flo response', response)),
        concatMapTo(VOID)
      );
  }

  submit(
    additionalData: Array<KeyValuePair>,
    paymentSessionId: string,
    cartId: string,
    callbackArray: [MerchantCallback, MerchantCallback, MerchantCallback],
    returnPath?: Array<string>,
    paymentMethod = PaymentMethod.CREDIT_CARD
  ): Observable<void> {
    const [submitSuccess, submitPending, submitFailure] = callbackArray;

    const currentDate = new Date();
    const timeZoneOffset = currentDate.getTimezoneOffset();
    const submitRequest: SubmitRequest = {
      paymentMethod,
      cartId,
      channel: 'BROWSER',
      browserInfo: {
        acceptHeader: '*/*',
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
      this.activeCartService.getActiveCartId(),
    ]).pipe(
      switchMap(([userId, cartId]: [string, string]) => {
        // this.activeCartId = cartId;
        console.log('userId', userId);
        console.log('cartId', cartId);
        submitRequest.cartId = cartId;
        return this.opfOtpService.generateOtpKey(userId, cartId);
      }),
      filter((response) => Boolean(response?.value)),
      concatMap(({ value: otpKey }) =>
        this.opfPaymentService.submitPayment({ ...submitRequest, otpKey })
      ),
      concatMap((response: SubmitResponse) => {
        if (
          response.status === SubmitStatus.ACCEPTED ||
          response.status === SubmitStatus.DELAYED
        ) {
          return from(Promise.resolve(submitSuccess(response)));
        } else if (response.status === SubmitStatus.PENDING) {
          return from(Promise.resolve(submitPending(response))).pipe(
            concatMapTo(EMPTY)
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
      concatMapTo(VOID),
      catchError((error: any) => {
        if (String(error.status) === SubmitStatus.REJECTED) {
          console.log('error REJECTED, returnPath', returnPath);
        }
        console.log('error, returnPath', returnPath);
        return throwError(error);
      })
    );
  }

  // private getGlobalFunctionContainer(): GlobalUpscalePaymentMethods {
  //   const window = this.winRef.nativeWindow as any;
  //   if (!window.Upscale?.payments) {
  //     window.Upscale = window?.Upscale ?? {};
  //     window.Upscale.payments = {};
  //   }
  //   return window.Upscale.payments;
  // }

  // private registerSubmit(paymentSessionId: string): void {
  //   this.getGlobalFunctionContainer().submit = ({
  //     cartId,
  //     additionalData,
  //     submitSuccess = (): void => {
  //       // this is intentional
  //     },
  //     submitPending = (): void => {
  //       // this is intentional
  //     },
  //     submitFailure = (): void => {
  //       // this is intentional
  //     },
  //     paymentMethod,
  //   }: {
  //     cartId: string;
  //     additionalData: Array<KeyValuePair>;
  //     submitSuccess: MerchantCallback;
  //     submitPending: MerchantCallback;
  //     submitFailure: MerchantCallback;
  //     paymentMethod: PaymentMethod;
  //   }): Promise<void> =>
  //     this.ngZone.run(() => {
  //       const callbackArray: [
  //         MerchantCallback,
  //         MerchantCallback,
  //         MerchantCallback
  //       ] = [submitSuccess, submitPending, submitFailure];
  //       // TODO: Add returnPath based on current route
  //       return this.submit(
  //         additionalData,
  //         paymentSessionId,
  //         cartId,
  //         callbackArray,
  //         undefined,
  //         paymentMethod
  //       ).toPromise();
  //     });
  // }

  // private registerVerify(): void {
  //   this.getGlobalFunctionContainer().verify = (): Promise<void> =>
  //     this.ngZone.run(() => {
  //       console.log('in zone');
  //       return this.verifyPayment('123', [
  //         { key: '1', value: '2' },
  //       ]).toPromise();
  //     });
  //   //  }
  //   // };
  // }
}
