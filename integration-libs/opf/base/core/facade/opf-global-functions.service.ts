/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ComponentRef,
  Injectable,
  NgZone,
  ViewContainerRef,
} from '@angular/core';
import { WindowRef } from '@spartacus/core';
import {
  GlobalOpfPaymentMethods,
  KeyValuePair,
  MerchantCallback,
  OpfGlobalFunctionsFacade,
  OpfPaymentFacade,
  PaymentMethod,
} from '@spartacus/opf/base/root';
import { LAUNCH_CALLER, LaunchDialogService } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Injectable()
export class OpfGlobalFunctionsService implements OpfGlobalFunctionsFacade {
  protected _isGlobalServiceInit = false;

  constructor(
    protected winRef: WindowRef,
    private ngZone: NgZone,
    protected opfPaymentFacade: OpfPaymentFacade,
    protected launchDialogService: LaunchDialogService
  ) {}

  registerGlobalFunctions(
    paymentSessionId: string,
    vcr?: ViewContainerRef
  ): void {
    this.registerSubmit(paymentSessionId, vcr);
    this.registerSubmitComplete(paymentSessionId, vcr);
    this._isGlobalServiceInit = true;
  }

  removeGlobalFunctions(): void {
    if (!this._isGlobalServiceInit) {
      return;
    }
    const window = this.winRef.nativeWindow as any;
    if (window?.Opf) {
      window.Opf = undefined;
    }
    this._isGlobalServiceInit = false;
  }

  protected getGlobalFunctionContainer(): GlobalOpfPaymentMethods {
    const window = this.winRef.nativeWindow as any;
    if (!window.Opf?.payments) {
      window.Opf = window?.Opf ?? {};
      window.Opf.payments = {};
    }
    return window.Opf.payments;
  }

  protected startLoaderSpinner(
    vcr: ViewContainerRef
  ): void | Observable<ComponentRef<any> | undefined> {
    return this.launchDialogService.launch(
      LAUNCH_CALLER.PLACE_ORDER_SPINNER,
      vcr
    );
  }

  protected stopLoaderSpinner(
    overlayedSpinner: void | Observable<ComponentRef<any> | undefined>
  ): void {
    if (!overlayedSpinner) {
      return;
    }
    overlayedSpinner
      .subscribe((component) => {
        this.launchDialogService.clear(LAUNCH_CALLER.PLACE_ORDER_SPINNER);
        if (component) {
          component.destroy();
        }
      })
      .unsubscribe();
  }

  protected registerSubmit(
    paymentSessionId: string,
    vcr?: ViewContainerRef
  ): void {
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
    }): Promise<boolean> => {
      return this.ngZone.run(() => {
        let overlayedSpinner: void | Observable<ComponentRef<any> | undefined>;
        if (vcr) {
          overlayedSpinner = this.startLoaderSpinner(vcr);
        }
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
            paymentMethod,
            returnPath: undefined,
          })
          .pipe(
            finalize(() => {
              if (overlayedSpinner) {
                this.stopLoaderSpinner(overlayedSpinner);
              }
            })
          )
          .toPromise();
      });
    };
  }

  protected registerSubmitComplete(
    paymentSessionId: string,
    vcr?: ViewContainerRef
  ): void {
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
    }: {
      cartId: string;
      additionalData: Array<KeyValuePair>;
      submitSuccess: MerchantCallback;
      submitPending: MerchantCallback;
      submitFailure: MerchantCallback;
    }): Promise<boolean> => {
      return this.ngZone.run(() => {
        let overlayedSpinner: void | Observable<ComponentRef<any> | undefined>;
        if (vcr) {
          overlayedSpinner = this.startLoaderSpinner(vcr);
        }
        const callbackArray: [
          MerchantCallback,
          MerchantCallback,
          MerchantCallback
        ] = [submitSuccess, submitPending, submitFailure];

        return this.opfPaymentFacade
          .submitCompletePayment({
            additionalData,
            paymentSessionId,
            cartId,
            callbackArray,
          })
          .pipe(
            finalize(() => {
              if (overlayedSpinner) {
                this.stopLoaderSpinner(overlayedSpinner);
              }
            })
          )
          .toPromise();
      });
    };
  }
}
