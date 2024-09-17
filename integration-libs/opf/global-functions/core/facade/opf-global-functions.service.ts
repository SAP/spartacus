/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ComponentRef,
  Injectable,
  NgZone,
  ViewContainerRef,
  inject,
} from '@angular/core';
import { WindowRef } from '@spartacus/core';
import {
  ErrorDialogOptions,
  defaultErrorDialogOptions,
} from '@spartacus/opf/base/root';
import { OpfCtaFacade } from '@spartacus/opf/cta/root';
import {
  GlobalFunctionsDomain,
  GlobalFunctionsInput,
  OpfGlobalFunctionsFacade,
} from '@spartacus/opf/global-functions/root';
import {
  GlobalOpfPaymentMethods,
  KeyValuePair,
  MerchantCallback,
  OpfPage,
  OpfPaymentFacade,
  PaymentMethod,
} from '@spartacus/opf/payment/root';
import { LAUNCH_CALLER, LaunchDialogService } from '@spartacus/storefront';
import { Observable, Subject, lastValueFrom } from 'rxjs';
import { finalize, take } from 'rxjs/operators';

@Injectable()
export class OpfGlobalFunctionsService implements OpfGlobalFunctionsFacade {
  protected winRef = inject(WindowRef);
  protected ngZone = inject(NgZone);
  protected opfPaymentFacade = inject(OpfPaymentFacade);
  protected launchDialogService = inject(LaunchDialogService);
  protected opfCtaFacade = inject(OpfCtaFacade);
  protected loaderSpinnerCpntRef: void | Observable<
    ComponentRef<any> | undefined
  >;
  protected _readyForScriptEvent: Subject<string> = new Subject();
  readyForScriptEvent$: Observable<string> =
    this._readyForScriptEvent.asObservable();

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
        this.registerStartLoadIndicator(domain, vcr);
        this.registerStopLoadIndicator(domain);
        break;
      case GlobalFunctionsDomain.REDIRECT:
        this.registerSubmitCompleteRedirect(domain, paymentSessionId, vcr);
        this.registerGetRedirectParams(domain, paramsMap ?? []);
        break;
      case GlobalFunctionsDomain.GLOBAL:
        this.registerScriptReady(domain);
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

  protected registerStartLoadIndicator(
    domain: GlobalFunctionsDomain,
    vcr?: ViewContainerRef
  ): void {
    this.getGlobalFunctionContainer(domain).startLoadIndicator = (): void => {
      if (!vcr) {
        return;
      }
      this.ngZone.run(() => {
        if (this.loaderSpinnerCpntRef) {
          this.stopLoaderSpinner(this.loaderSpinnerCpntRef);
        }
        this.loaderSpinnerCpntRef = this.startLoaderSpinner(vcr);
      });
    };
  }

  protected registerStopLoadIndicator(domain: GlobalFunctionsDomain): void {
    this.getGlobalFunctionContainer(domain).stopLoadIndicator = (): void => {
      this.ngZone.run(() => {
        this.stopLoaderSpinner(this.loaderSpinnerCpntRef);
      });
    };
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
    paymentSessionId?: string,
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
          MerchantCallback,
        ] = [submitSuccess, submitPending, submitFailure];

        return lastValueFrom(
          this.opfPaymentFacade
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
        );
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

      return lastValueFrom(
        this.opfPaymentFacade
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
      );
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
  protected registerScriptReady(domain: GlobalFunctionsDomain): void {
    this.getGlobalFunctionContainer(domain).scriptReady = (
      scriptIdentifier: string
    ): void => {
      console.log('flo', scriptIdentifier);
      this.ngZone.run(() => {
        this.opfCtaFacade.emitScriptReadyEvent(scriptIdentifier);
        // this._readyForScriptEvent.next(scriptIdentifier);
      });
    };
  }
  // listenScriptReadyEvent() {
  //   return this.readyForScriptEvent$;
  // }
}
