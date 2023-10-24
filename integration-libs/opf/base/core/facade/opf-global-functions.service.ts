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
  ErrorDialogOptions,
  GlobalFunctionsDomain,
  GlobalFunctionsInput,
  GlobalOpfPaymentMethods,
  KeyValuePair,
  MerchantCallback,
  OpfGlobalFunctionsFacade,
  OpfPage,
  OpfPaymentFacade,
  PaymentMethod,
  defaultErrorDialogOptions,
} from '@spartacus/opf/base/root';
import { LAUNCH_CALLER, LaunchDialogService } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { finalize, take } from 'rxjs/operators';

@Injectable()
export class OpfGlobalFunctionsService implements OpfGlobalFunctionsFacade {
  constructor(
    protected winRef: WindowRef,
    private ngZone: NgZone,
    protected opfPaymentFacade: OpfPaymentFacade,
    protected launchDialogService: LaunchDialogService
  ) {}

  registerGlobalFunctions({
    domain,
    paymentSessionId,
    vcr,
    paramsMap,
  }: GlobalFunctionsInput): void {
    switch (domain) {
      case GlobalFunctionsDomain.CHECKOUT:
        this.registerSubmit(domain, paymentSessionId, vcr);
        this.registerSubmitComplete(domain, paymentSessionId, vcr);
        this.registerThrowPaymentError(domain, vcr);

        break;
      case GlobalFunctionsDomain.REDIRECT:
        this.registerSubmitCompleteRedirect(domain, paymentSessionId, vcr);
        this.registerGetRedirectParams(domain, paramsMap ?? []);
        break;
      default:
        break;
    }
  }

  removeGlobalFunctions(domain: GlobalFunctionsDomain): void {
    const window = this.winRef.nativeWindow as any;
    if (window?.Opf?.payments[domain]) {
      window.Opf.payments[domain] = undefined;
    }
  }

  protected getGlobalFunctionContainer(
    domain: GlobalFunctionsDomain
  ): GlobalOpfPaymentMethods {
    const window = this.winRef.nativeWindow as any;
    if (!window.Opf?.payments[domain]) {
      window.Opf = window?.Opf ?? {};
      window.Opf.payments = {};
      window.Opf.payments[domain] = {};
    }
    return window.Opf.payments[domain];
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

  protected registerGetRedirectParams(
    domain: GlobalFunctionsDomain,
    paramsMap: Array<KeyValuePair> = []
  ): void {
    this.getGlobalFunctionContainer(domain).getRedirectParams = () =>
      paramsMap.map((p) => {
        return { key: p.key, value: p.value };
      });
  }

  protected registerThrowPaymentError(
    domain: GlobalFunctionsDomain,
    vcr?: ViewContainerRef
  ): void {
    this.getGlobalFunctionContainer(domain).throwPaymentError = (
      errorDialogOptions: ErrorDialogOptions = defaultErrorDialogOptions
    ): void => {
      if (!vcr) {
        return;
      }
      this.ngZone.run(() => {
        const dialog = this.launchDialogService.openDialog(
          LAUNCH_CALLER.OPF_ERROR,
          undefined,
          vcr,
          errorDialogOptions
        );

        if (dialog) {
          dialog.pipe(take(1)).subscribe();
        }
      });
    };
  }

  protected registerSubmit(
    domain: GlobalFunctionsDomain,
    paymentSessionId: string,
    vcr?: ViewContainerRef
  ): void {
    this.getGlobalFunctionContainer(domain).submit = ({
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

  protected runSubmitComplete(
    cartId: string,
    additionalData: Array<KeyValuePair>,
    callbackArray: [MerchantCallback, MerchantCallback, MerchantCallback],
    paymentSessionId: string,
    returnPath?: string | undefined,
    vcr?: ViewContainerRef
  ) {
    return this.ngZone.run(() => {
      let overlayedSpinner: void | Observable<ComponentRef<any> | undefined>;
      if (vcr) {
        overlayedSpinner = this.startLoaderSpinner(vcr);
      }

      return this.opfPaymentFacade
        .submitCompletePayment({
          additionalData,
          paymentSessionId,
          cartId,
          callbackArray,
          returnPath,
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
  }

  protected registerSubmitComplete(
    domain: GlobalFunctionsDomain,
    paymentSessionId: string,
    vcr?: ViewContainerRef
  ): void {
    this.getGlobalFunctionContainer(domain).submitComplete = ({
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
      return this.runSubmitComplete(
        cartId,
        additionalData,
        [submitSuccess, submitPending, submitFailure],
        paymentSessionId,
        undefined,
        vcr
      );
    };
  }

  protected registerSubmitCompleteRedirect(
    domain: GlobalFunctionsDomain,
    paymentSessionId: string,
    vcr?: ViewContainerRef
  ): void {
    this.getGlobalFunctionContainer(domain).submitCompleteRedirect = ({
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
      return this.runSubmitComplete(
        cartId,
        additionalData,
        [submitSuccess, submitPending, submitFailure],
        paymentSessionId,
        OpfPage.CHECKOUT_REVIEW_PAGE,
        vcr
      );
    };
  }
}
