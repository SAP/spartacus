import { Injectable, NgZone } from '@angular/core';
import { WindowRef } from '@spartacus/core';
import {
  GlobalOpfPaymentMethods,
  KeyValuePair,
  MerchantCallback,
  OpfPaymentFacade,
  PaymentMethod,
} from '@spartacus/opf/base/root';
import {
  PaymentPattern,
  PaymentSessionData,
} from '@spartacus/opf/checkout/root';
import { BehaviorSubject } from 'rxjs';
import { finalize } from 'rxjs/operators';

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

  private _isGlobalServiceInit = false;

  get isGlobalServiceInit() {
    return this._isGlobalServiceInit;
  }

  private _isPaymentInProgress$ = new BehaviorSubject<boolean>(false);
  isPaymentInProgress$() {
    return this._isPaymentInProgress$.asObservable();
  }

  private getGlobalFunctionContainer(): GlobalOpfPaymentMethods {
    const window = this.winRef.nativeWindow as any;
    if (!window.Opf?.payments) {
      window.Opf = window?.Opf ?? {};
      window.Opf.payments = {};
    }
    return window.Opf.payments;
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
            finalize(() => {
              console.log('completed');
              this._isPaymentInProgress$.next(false);
            })
          )

          .toPromise();
      });
  }

  initializeService(paymentSessionData: PaymentSessionData | Error): void {
    if (
      !(paymentSessionData instanceof Error) &&
      paymentSessionData?.paymentSessionId &&
      paymentSessionData?.pattern === PaymentPattern.HOSTED_FIELDS
    ) {
      console.log('registerGlobalService');
      this.registerSubmit(paymentSessionData.paymentSessionId);

      this._isGlobalServiceInit = true;
    } else if (this._isGlobalServiceInit) {
      this.removeService();
    }
  }

  removeService(): void {
    console.log('removeGlobalService');
    if (!this._isGlobalServiceInit) {
      console.log('leave');
      return;
    }
    const window = this.winRef.nativeWindow as any;
    if (window?.Opf) {
      window.Opf = undefined;
    }
    this._isGlobalServiceInit = false;
  }
}
