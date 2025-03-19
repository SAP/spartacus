/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
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
  OpfErrorDialogOptions,
  OpfKeyValueMap,
  OpfPage,
  defaultOpfErrorDialogOptions,
} from '@spartacus/opf/base/root';
import { OpfCtaFacade } from '@spartacus/opf/cta/root';
import {
  OpfGlobalFunctionsDomain,
  OpfGlobalFunctionsFacade,
  OpfRegisterGlobalFunctionsInput,
} from '@spartacus/opf/global-functions/root';
import {
  OpfPaymentFacade,
  OpfPaymentGlobalMethods,
  OpfPaymentMerchantCallback,
  OpfPaymentMethod,
} from '@spartacus/opf/payment/root';
import { LAUNCH_CALLER, LaunchDialogService } from '@spartacus/storefront';
import { Observable, Subject, lastValueFrom } from 'rxjs';
import { finalize, last, take } from 'rxjs/operators';

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
  }: OpfRegisterGlobalFunctionsInput): void {
    // SSR not supported
    if (!this.winRef.isBrowser()) {
      return;
    }
    switch (domain) {
      case OpfGlobalFunctionsDomain.CHECKOUT:
        this.registerSubmit(domain, paymentSessionId, vcr);
        this.registerSubmitComplete(domain, paymentSessionId, vcr);
        this.registerThrowPaymentError(domain, vcr);
        this.registerStartLoadIndicator(domain, vcr);
        this.registerStopLoadIndicator(domain);
        break;
      case OpfGlobalFunctionsDomain.REDIRECT:
        this.registerSubmitCompleteRedirect(domain, paymentSessionId, vcr);
        this.registerGetRedirectParams(domain, paramsMap ?? []);
        break;
      case OpfGlobalFunctionsDomain.GLOBAL:
        this.registerCtaScriptReady(domain);
        break;
      default:
        break;
    }
  }

  unregisterGlobalFunctions(domain: OpfGlobalFunctionsDomain): void {
    // SSR not supported
    if (!this.winRef.isBrowser()) {
      return;
    }
    const window = this.winRef.nativeWindow as any;
    if (window?.Opf?.payments[domain]) {
      window.Opf.payments[domain] = undefined;
    }
  }

  protected getGlobalFunctionContainer(
    domain: OpfGlobalFunctionsDomain
  ): OpfPaymentGlobalMethods {
    const window = this.winRef.nativeWindow as any;
    if (!window.Opf?.payments[domain]) {
      window.Opf = window?.Opf ?? {};
      window.Opf.payments = {};
      window.Opf.payments[domain] = {};
    }
    return window.Opf.payments[domain];
  }

  protected registerStartLoadIndicator(
    domain: OpfGlobalFunctionsDomain,
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

  protected registerStopLoadIndicator(domain: OpfGlobalFunctionsDomain): void {
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
    domain: OpfGlobalFunctionsDomain,
    paramsMap: Array<OpfKeyValueMap> = []
  ): void {
    this.getGlobalFunctionContainer(domain).getRedirectParams = () =>
      paramsMap.map((p) => {
        return { key: p.key, value: p.value };
      });
  }

  protected registerThrowPaymentError(
    domain: OpfGlobalFunctionsDomain,
    vcr?: ViewContainerRef
  ): void {
    this.getGlobalFunctionContainer(domain).throwPaymentError = (
      opfErrorDialogOptions: OpfErrorDialogOptions = defaultOpfErrorDialogOptions
    ): void => {
      if (!vcr) {
        return;
      }
      this.ngZone.run(() => {
        const dialog = this.launchDialogService.openDialog(
          LAUNCH_CALLER.OPF_ERROR,
          undefined,
          vcr,
          opfErrorDialogOptions
        );

        if (dialog) {
          dialog.pipe(take(1)).subscribe();
        }
      });
    };
  }

  protected registerSubmit(
    domain: OpfGlobalFunctionsDomain,
    paymentSessionId?: string,
    vcr?: ViewContainerRef
  ): void {
    this.getGlobalFunctionContainer(domain).submit = ({
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
      additionalData: Array<OpfKeyValueMap>;
      submitSuccess: OpfPaymentMerchantCallback;
      submitPending: OpfPaymentMerchantCallback;
      submitFailure: OpfPaymentMerchantCallback;
      paymentMethod: OpfPaymentMethod;
    }): Promise<boolean> => {
      return this.ngZone.run(() => {
        let overlayedSpinner: void | Observable<ComponentRef<any> | undefined>;
        if (vcr) {
          overlayedSpinner = this.startLoaderSpinner(vcr);
        }
        const callbacks: {
          onSuccess: OpfPaymentMerchantCallback;
          onPending: OpfPaymentMerchantCallback;
          onFailure: OpfPaymentMerchantCallback;
        } = {
          onSuccess: submitSuccess,
          onPending: submitPending,
          onFailure: submitFailure,
        };

        return lastValueFrom(
          this.opfPaymentFacade
            .submitPayment({
              additionalData,
              paymentSessionId,
              callbacks,
              paymentMethod,
              returnPath: undefined,
            })
            .pipe(
              /**
               * Needed to to handle empty emissions gracefully without
               * triggering a sequence error.
               *
               * It will resolve with `true` if no values are emitted.
               */
              last(() => true, true),
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
    additionalData: Array<OpfKeyValueMap>,
    callbacks: {
      onSuccess: OpfPaymentMerchantCallback;
      onPending: OpfPaymentMerchantCallback;
      onFailure: OpfPaymentMerchantCallback;
    },
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
            callbacks,
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
    domain: OpfGlobalFunctionsDomain,
    paymentSessionId: string,
    vcr?: ViewContainerRef
  ): void {
    this.getGlobalFunctionContainer(domain).submitComplete = ({
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
      additionalData: Array<OpfKeyValueMap>;
      submitSuccess: OpfPaymentMerchantCallback;
      submitPending: OpfPaymentMerchantCallback;
      submitFailure: OpfPaymentMerchantCallback;
    }): Promise<boolean> => {
      return this.runSubmitComplete(
        additionalData,
        {
          onSuccess: submitSuccess,
          onPending: submitPending,
          onFailure: submitFailure,
        },
        paymentSessionId,
        undefined,
        vcr
      );
    };
  }

  protected registerSubmitCompleteRedirect(
    domain: OpfGlobalFunctionsDomain,
    paymentSessionId: string,
    vcr?: ViewContainerRef
  ): void {
    this.getGlobalFunctionContainer(domain).submitCompleteRedirect = ({
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
      additionalData: Array<OpfKeyValueMap>;
      submitSuccess: OpfPaymentMerchantCallback;
      submitPending: OpfPaymentMerchantCallback;
      submitFailure: OpfPaymentMerchantCallback;
    }): Promise<boolean> => {
      return this.runSubmitComplete(
        additionalData,
        {
          onSuccess: submitSuccess,
          onPending: submitPending,
          onFailure: submitFailure,
        },
        paymentSessionId,
        OpfPage.CHECKOUT_REVIEW_PAGE,
        vcr
      );
    };
  }
  protected registerCtaScriptReady(domain: OpfGlobalFunctionsDomain): void {
    this.getGlobalFunctionContainer(domain).scriptReady = (
      scriptIdentifier: string
    ): void => {
      this.ngZone.run(() => {
        this.opfCtaFacade.emitScriptReadyEvent(scriptIdentifier);
      });
    };
  }
}
