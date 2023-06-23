import { Injectable, NgZone } from '@angular/core';
import { WindowRef } from '@spartacus/core';
import {
  GlobalUpscalePaymentMethods,
  KeyValuePair,
  MerchantCallback,
  OpfPaymentFacade,
  PaymentMethod,
} from '@spartacus/opf/base/root';
import { OpfHostedFieldsPaymentService } from './opf-hosted-fields-payment.service';

@Injectable({
  providedIn: 'root',
})
export class GlobalFunctionsRegistrationService {
  constructor(
    protected winRef: WindowRef,
    private ngZone: NgZone,
    protected opfHostedFieldsPaymentService: OpfHostedFieldsPaymentService,
    protected opfPaymentFacade: OpfPaymentFacade
  ) {
    console.log('constructor registration triggered');
  }

  private _isGlobalFunctionInit = false;

  get isGlobalFunctionInit() {
    return this._isGlobalFunctionInit;
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
        const callbackArray: [
          MerchantCallback,
          MerchantCallback,
          MerchantCallback
        ] = [submitSuccess, submitPending, submitFailure];
        // TODO: Add returnPath based on current route
        // return this.opfHostedFieldsPaymentService
        //   .submit(
        //     additionalData,
        //     paymentSessionId,
        //     cartId,
        //     callbackArray,
        //     undefined,
        //     paymentMethod
        //   )
        //   .toPromise();
        return this.opfPaymentFacade
          .submitPayment2({
            additionalData,
            paymentSessionId,
            cartId,
            callbackArray,
            returnPath: undefined,
            paymentMethod,
          })
          .toPromise();
      });
  }

  private registerVerify(): void {
    this.getGlobalFunctionContainer().verify = (): Promise<void> =>
      this.ngZone.run(() => {
        console.log('in zone');
        return this.opfHostedFieldsPaymentService
          .verifyPayment('123', [{ key: '1', value: '2' }])
          .toPromise();
      });
    //  }
    // };
  }

  initializeService(selectedPaymentId: string): void {
    this.registerVerify();
    this.registerSubmit(selectedPaymentId);
    this._isGlobalFunctionInit = true;
  }

  removeService(): void {
    console.log('removeService');
    const window = this.winRef.nativeWindow as any;
    if (window?.Upscale) {
      window.Upscale = {};
    }
    this._isGlobalFunctionInit = false;
  }
}
