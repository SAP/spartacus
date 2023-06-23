import { Injectable, NgZone } from '@angular/core';
import { WindowRef } from '@spartacus/core';
import { VOID } from '@spartacus/opf/base/core';
import {
  GlobalUpscalePaymentMethods,
  KeyValuePair,
  MerchantCallback,
  OpfPaymentFacade,
  PaymentMethod,
} from '@spartacus/opf/base/root';
import { BehaviorSubject } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class GlobalFunctionsService {
  constructor(
    protected winRef: WindowRef,
    private ngZone: NgZone,
    protected opfPaymentFacade: OpfPaymentFacade
  ) {
    console.log('constructor registration triggered');
  }

  private _isGlobalFunctionInit = false;

  get isGlobalFunctionInit() {
    return this._isGlobalFunctionInit;
  }

  private _isPaymentInProgress$ = new BehaviorSubject<boolean>(false);
  isPaymentInProgress$() {
    return this._isPaymentInProgress$.asObservable();
  }

  private getGlobalFunctionContainer(): GlobalUpscalePaymentMethods {
    const window = this.winRef.nativeWindow as any;
    if (!window.Upscale?.payments) {
      window.Upscale = window?.Upscale ?? {};
      window.Upscale.payments = {};
    }
    return window.Upscale.payments;
  }

  private registerSubmit(paymentSessionId: string): void {
    this.getGlobalFunctionContainer().submit = ({
      cartId,
      additionalData,
      submitSuccess = (): void => {
        // this is intentional
      },
      submitPending = (): void => {
        // this is intentional
      },
      submitFailure = (): void => {
        // this is intentional
      },
      paymentMethod,
    }: {
      cartId: string;
      additionalData: Array<KeyValuePair>;
      submitSuccess: MerchantCallback;
      submitPending: MerchantCallback;
      submitFailure: MerchantCallback;
      paymentMethod: PaymentMethod;
    }): Promise<boolean> =>
      this.ngZone.run(() => {
        this._isPaymentInProgress$.next(true);
        const callbackArray: [
          MerchantCallback,
          MerchantCallback,
          MerchantCallback
        ] = [submitSuccess, submitPending, submitFailure];

        return this.opfPaymentFacade
          .submitPayment({
            additionalData,
            paymentSessionId,
            cartId,
            callbackArray,
            returnPath: undefined,
            paymentMethod,
          })
          .pipe(
            tap((isOrderPlaced: boolean) => {
              // only remove global fct when order was placed
              // submitComplete could be called if PENDING was received thus still need global fct
              if (isOrderPlaced) {
                this.removeService();
              }
              console.log('isOrderPlaced:', isOrderPlaced);
            }),
            finalize(() => {
              //console.log(error);
              this._isPaymentInProgress$.next(false);
            })
          )

          .toPromise();
      });
  }

  private registerSubmitComplete(paymentSessionId: string): void {
    this.getGlobalFunctionContainer().submitComplete = ({
      cartId,
      additionalData,
      submitSuccess = (): void => {
        // this is intentional
      },
      submitPending = (): void => {
        // this is intentional
      },
      submitFailure = (): void => {
        // this is intentional
      },
      paymentMethod,
    }: {
      cartId: string;
      additionalData: Array<KeyValuePair>;
      submitSuccess: MerchantCallback;
      submitPending: MerchantCallback;
      submitFailure: MerchantCallback;
      paymentMethod: PaymentMethod;
    }): Promise<boolean> =>
      this.ngZone.run(() => {
        this._isPaymentInProgress$.next(true);
        const callbackArray: [
          MerchantCallback,
          MerchantCallback,
          MerchantCallback
        ] = [submitSuccess, submitPending, submitFailure];

        return this.opfPaymentFacade
          .submitPayment({
            additionalData,
            paymentSessionId,
            cartId,
            callbackArray,
            returnPath: undefined,
            paymentMethod,
          })
          .pipe(
            tap((isOrderPlaced: boolean) => {
              if (isOrderPlaced) {
                console.log('isOrderPlaced:', isOrderPlaced);
              }
            }),
            finalize(() => {
              //console.log(error);
              this._isPaymentInProgress$.next(false);
            })
          )

          .toPromise();
      });
  }

  private registerTest(): void {
    this.getGlobalFunctionContainer().test = (): Promise<void> =>
      this.ngZone
        .run(() => {
          console.log('in zone');

          return VOID;
        })
        .toPromise();
  }

  initializeService(selectedPaymentId: string): void {
    this.registerTest();
    this.registerSubmit(selectedPaymentId);
    this.registerSubmitComplete(selectedPaymentId);
    this._isGlobalFunctionInit = true;
  }

  removeService(): void {
    console.log('removeService');
    const window = this.winRef.nativeWindow as any;
    if (window?.Upscale) {
      window.Upscale = undefined;
    }
    this._isGlobalFunctionInit = false;
  }
}
