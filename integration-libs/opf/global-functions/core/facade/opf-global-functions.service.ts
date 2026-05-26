/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
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
import {
  Address,
  RoutingService,
  UserIdService,
  WindowRef,
} from '@spartacus/core';
import {
  ActiveCartFacade,
  Cart,
  DeliveryMode,
  MultiCartFacade,
  CartAccessCodeFacade,
} from '@spartacus/cart/base/root';
import {
  OpfErrorDialogOptions,
  OpfKeyValueMap,
  OpfMetadataModel,
  OpfMetadataStoreService,
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
  OpfPaymentEventsService,
  OpfPaymentFacade,
  OpfPaymentGlobalMethods,
  OpfPaymentInitiationConfig,
  OpfPaymentChannel,
  OpfPaymentMerchantCallback,
  OpfPaymentMethod,
  OpfPaymentSessionData,
  OpfPaymentConfig,
  OpfPaymentUpdateConfig,
  OpfPaymentUpdatePayload,
  OpfPaymentVerificationPayload,
  OpfPaymentVerificationResponse,
} from '@spartacus/opf/payment/root';
import { OpfQuickBuyTransactionService } from '@spartacus/opf/quick-buy/core';
import { getBrowserInfo } from '@spartacus/opf/payment/core';
import { LAUNCH_CALLER, LaunchDialogService } from '@spartacus/storefront';
import {
  Observable,
  Subject,
  combineLatest,
  lastValueFrom,
  of,
  throwError,
} from 'rxjs';
import {
  filter,
  finalize,
  last,
  map,
  retry,
  switchMap,
  take,
  skip,
} from 'rxjs/operators';

@Injectable()
export class OpfGlobalFunctionsService implements OpfGlobalFunctionsFacade {
  protected winRef = inject(WindowRef);
  protected ngZone = inject(NgZone);
  protected opfPaymentFacade = inject(OpfPaymentFacade);
  protected launchDialogService = inject(LaunchDialogService);
  protected opfCtaFacade = inject(OpfCtaFacade);
  protected opfMetadataStoreService = inject(OpfMetadataStoreService);
  protected opfPaymentEventsService = inject(OpfPaymentEventsService);
  protected activeCartFacade = inject(ActiveCartFacade);
  protected multiCartFacade = inject(MultiCartFacade);
  protected userIdService = inject(UserIdService);
  protected cartAccessCodeFacade = inject(CartAccessCodeFacade);
  protected routingService = inject(RoutingService);
  protected opfQuickBuyTransactionService = inject(
    OpfQuickBuyTransactionService
  );
  protected loaderSpinnerCpntRef: void | Observable<
    ComponentRef<any> | undefined
  >;
  protected globalLoaderSpinnerCpntRef: void | Observable<
    ComponentRef<any> | undefined
  >;
  protected _readyForScriptEvent: Subject<string> = new Subject();
  readyForScriptEvent$: Observable<string> =
    this._readyForScriptEvent.asObservable();

  protected static readonly PAYMENT_SESSION_ID_REQUIRED_ERROR =
    'paymentSessionId is required';
  protected static readonly UPDATE_PAYMENT_TRANSACTION_RETRY_COUNT = 2;
  protected static readonly UPDATE_PAYMENT_TRANSACTION_RETRY_DELAY = 300;

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
        this.registerReinitiatePaymentForm(domain);
        this.registerHandle3DSRedirect(domain, paymentSessionId, vcr);
        this.registerUpdatePaymentTransaction(domain);
        break;
      case OpfGlobalFunctionsDomain.REDIRECT:
        this.registerSubmitCompleteRedirect(domain, paymentSessionId, vcr);
        this.registerGetRedirectParams(domain, paramsMap ?? []);
        break;
      case OpfGlobalFunctionsDomain.GLOBAL:
        this.registerCtaScriptReady(domain);
        this.registerGetCart(domain);
        this.registerSetBillingAddress(domain);
        this.registerGetBillingAddress(domain);
        this.registerSetDeliveryAddress(domain);
        this.registerGetDeliveryAddress(domain);
        this.registerSetDeliveryMode(domain);
        this.registerGetDeliveryMode(domain);
        this.registerDeleteAddress(domain);
        this.registerUpdateCartGuestUserEmail(domain);
        this.registerCreateCartGuestUser(domain);
        this.registerStartLoadIndicatorGlobal(domain);
        this.registerStopLoadIndicatorGlobal(domain);
        this.registerThrowPaymentErrorGlobal(domain);
        this.registerInitiatePayment(domain);
        this.registerUpdatePaymentTransaction(domain);
        this.registerVerifyPayment(domain);
        this.registerSubmit(domain);
        this.registerSubmitComplete(domain);
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
      window.Opf.payments = window.Opf.payments ?? {};
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
    this.getGlobalFunctionContainer(domain).submit = (options: {
      cartId?: string;
      additionalData: Array<OpfKeyValueMap>;
      submitSuccess: OpfPaymentMerchantCallback;
      submitPending: OpfPaymentMerchantCallback;
      submitFailure: OpfPaymentMerchantCallback;
      submitCancel?: OpfPaymentMerchantCallback;
      paymentMethod: OpfPaymentMethod;
      paymentSessionId?: string;
      savePaymentMethod?: boolean;
    }): Promise<boolean> => {
      return this.ngZone.run(() => {
        const finalPaymentSessionId =
          options.paymentSessionId ??
          paymentSessionId ??
          this.opfMetadataStoreService.opfMetadataState.value
            ?.opfPaymentSessionId;

        if (!finalPaymentSessionId) {
          return Promise.reject(
            new Error(
              OpfGlobalFunctionsService.PAYMENT_SESSION_ID_REQUIRED_ERROR
            )
          );
        }

        let overlayedSpinner: void | Observable<ComponentRef<any> | undefined>;
        if (vcr) {
          overlayedSpinner = this.startLoaderSpinner(vcr);
        }

        const {
          submitSuccess = (): void => {
            // this is intentional
          },
          submitPending = (): void => {
            // this is intentional
          },
          submitFailure = (): void => {
            // this is intentional
          },
          submitCancel = (): void => {
            // this is intentional
          },
          paymentMethod,
          savePaymentMethod,
        } = options;

        const callbacks: {
          onSuccess: OpfPaymentMerchantCallback;
          onPending: OpfPaymentMerchantCallback;
          onFailure: OpfPaymentMerchantCallback;
          onCancel?: OpfPaymentMerchantCallback;
        } = {
          onSuccess: submitSuccess,
          onPending: submitPending,
          onFailure: submitFailure,
          onCancel: submitCancel,
        };

        return lastValueFrom(
          this.opfPaymentFacade
            .submitPayment({
              additionalData: options.additionalData,
              paymentSessionId: finalPaymentSessionId,
              callbacks,
              paymentMethod,
              returnPath: undefined,
              savePaymentMethod,
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
      onCancel?: OpfPaymentMerchantCallback;
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
    paymentSessionId?: string,
    vcr?: ViewContainerRef
  ): void {
    this.getGlobalFunctionContainer(domain).submitComplete = (options: {
      cartId?: string;
      additionalData: Array<OpfKeyValueMap>;
      submitSuccess: OpfPaymentMerchantCallback;
      submitPending: OpfPaymentMerchantCallback;
      submitFailure: OpfPaymentMerchantCallback;
      submitCancel?: OpfPaymentMerchantCallback;
      paymentSessionId?: string;
    }): Promise<boolean> => {
      return this.ngZone.run(() => {
        const finalPaymentSessionId =
          options.paymentSessionId ??
          paymentSessionId ??
          this.opfMetadataStoreService.opfMetadataState.value
            ?.opfPaymentSessionId;

        if (!finalPaymentSessionId) {
          return Promise.reject(
            new Error(
              OpfGlobalFunctionsService.PAYMENT_SESSION_ID_REQUIRED_ERROR
            )
          );
        }

        const {
          submitSuccess = (): void => {
            // this is intentional
          },
          submitPending = (): void => {
            // this is intentional
          },
          submitFailure = (): void => {
            // this is intentional
          },
          submitCancel = (): void => {
            // this is intentional
          },
        } = options;

        return this.runSubmitComplete(
          options.additionalData,
          {
            onSuccess: submitSuccess,
            onPending: submitPending,
            onFailure: submitFailure,
            onCancel: submitCancel,
          },
          finalPaymentSessionId,
          undefined,
          vcr
        );
      });
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
      submitCancel = (): void => {
        // this is intentional
      },
    }: {
      cartId: string;
      additionalData: Array<OpfKeyValueMap>;
      submitSuccess: OpfPaymentMerchantCallback;
      submitPending: OpfPaymentMerchantCallback;
      submitFailure: OpfPaymentMerchantCallback;
      submitCancel?: OpfPaymentMerchantCallback;
    }): Promise<boolean> => {
      return this.runSubmitComplete(
        additionalData,
        {
          onSuccess: submitSuccess,
          onPending: submitPending,
          onFailure: submitFailure,
          onCancel: submitCancel,
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

  protected registerGetCart(domain: OpfGlobalFunctionsDomain): void {
    this.getGlobalFunctionContainer(domain).getCart = (
      cartId?: string
    ): Promise<Cart | undefined> => {
      return this.ngZone.run(() => {
        if (cartId) {
          this.multiCartFacade.reloadCart(cartId);
          return lastValueFrom(
            this.multiCartFacade.getCart(cartId).pipe(take(1))
          );
        }

        return lastValueFrom(
          this.reloadCartAndWaitForStable().pipe(
            switchMap(() => this.activeCartFacade.takeActive()),
            take(1)
          )
        );
      });
    };
  }

  protected registerStartLoadIndicatorGlobal(
    domain: OpfGlobalFunctionsDomain
  ): void {
    this.getGlobalFunctionContainer(domain).startLoadIndicator = (): void => {
      this.ngZone.run(() => {
        if (this.globalLoaderSpinnerCpntRef) {
          this.stopLoaderSpinner(this.globalLoaderSpinnerCpntRef);
        }
        const result = this.launchDialogService.launch(
          LAUNCH_CALLER.PLACE_ORDER_SPINNER
        );
        if (result) {
          this.globalLoaderSpinnerCpntRef = result;
        }
      });
    };
  }

  protected registerStopLoadIndicatorGlobal(
    domain: OpfGlobalFunctionsDomain
  ): void {
    this.getGlobalFunctionContainer(domain).stopLoadIndicator = (): void => {
      this.ngZone.run(() => {
        this.stopLoaderSpinner(this.globalLoaderSpinnerCpntRef);
        this.globalLoaderSpinnerCpntRef = undefined;
      });
    };
  }

  protected registerThrowPaymentErrorGlobal(
    domain: OpfGlobalFunctionsDomain
  ): void {
    this.getGlobalFunctionContainer(domain).throwPaymentError = (
      opfErrorDialogOptions: OpfErrorDialogOptions = defaultOpfErrorDialogOptions
    ): void => {
      this.ngZone.run(() => {
        const dialog = this.launchDialogService.openDialog(
          LAUNCH_CALLER.OPF_ERROR,
          undefined,
          undefined,
          opfErrorDialogOptions
        );

        if (dialog) {
          dialog.pipe(take(1)).subscribe();
        }
      });
    };
  }

  protected registerInitiatePayment(domain: OpfGlobalFunctionsDomain): void {
    /**
     * Exposes global initiatePayment for explicit first-session creation.
     * For session updates, use updatePaymentTransaction.
     */
    this.getGlobalFunctionContainer(domain).initiatePayment = (
      configurationIdOrPaymentConfig: string | number | OpfPaymentConfig
    ): Promise<OpfPaymentSessionData> => {
      return this.ngZone.run(() => {
        const paymentConfig = this.normalizePaymentConfig(
          configurationIdOrPaymentConfig
        );

        if (!paymentConfig.configurationId) {
          return Promise.reject(new Error('configurationId is required'));
        }

        const cartId$ = paymentConfig.cartId
          ? of(paymentConfig.cartId)
          : this.activeCartFacade.getActiveCartId().pipe(take(1));

        const userId$ = this.userIdService.getUserId().pipe(take(1));
        return lastValueFrom(
          combineLatest([userId$, cartId$]).pipe(
            switchMap(([userId, cartId]) =>
              this.initiatePaymentWithCart(userId, cartId, paymentConfig)
            )
          )
        );
      });
    };
  }

  protected normalizePaymentConfig(
    configurationIdOrPaymentConfig: string | number | OpfPaymentConfig
  ): OpfPaymentConfig {
    return typeof configurationIdOrPaymentConfig === 'string' ||
      typeof configurationIdOrPaymentConfig === 'number'
      ? {
          configurationId: String(configurationIdOrPaymentConfig),
        }
      : configurationIdOrPaymentConfig;
  }

  protected initiatePaymentWithCart(
    userId: string,
    cartId: string | undefined,
    paymentConfig: OpfPaymentConfig
  ): Observable<OpfPaymentSessionData> {
    if (!cartId) {
      return throwError(
        () => new Error('Cart ID is required. No active cart found.')
      );
    }

    return this.cartAccessCodeFacade.getCartAccessCode(userId, cartId).pipe(
      map((response) => this.extractOtpKey(response)),
      filter((otpKey) => Boolean(otpKey)),
      switchMap((otpKey) =>
        this.buildAndInitiatePaymentConfig(
          paymentConfig,
          cartId,
          otpKey as string
        )
      ),
      take(1)
    );
  }

  protected extractOtpKey(response: unknown): string | undefined {
    return typeof response === 'string'
      ? response
      : ((response as { accessCode?: string })?.accessCode ??
          (response as string | undefined));
  }

  protected buildAndInitiatePaymentConfig(
    paymentConfig: OpfPaymentConfig,
    cartId: string,
    otpKey: string
  ): Observable<OpfPaymentSessionData> {
    const configWithDefaults: OpfPaymentConfig = {
      ...paymentConfig,
      cartId: paymentConfig.cartId ?? cartId,
      channel: paymentConfig.channel ?? OpfPaymentChannel.BROWSER,
      browserInfo:
        paymentConfig.browserInfo ?? getBrowserInfo(this.winRef.nativeWindow),
      resultURL:
        paymentConfig.resultURL ??
        this.routingService.getFullUrl({
          cxRoute: OpfPage.RESULT_PAGE,
        }),
      cancelURL:
        paymentConfig.cancelURL ??
        this.routingService.getFullUrl({
          cxRoute: OpfPage.CANCEL_PAGE,
        }),
    };

    const fullConfig: OpfPaymentInitiationConfig = {
      otpKey,
      config: configWithDefaults,
    };

    return this.opfPaymentFacade.initiatePayment(fullConfig);
  }

  protected updatePaymentTransactionWithCart(
    userId: string,
    cartId: string | undefined,
    updatePaymentConfig: OpfPaymentUpdateConfig
  ): Observable<OpfPaymentSessionData> {
    if (!cartId) {
      return throwError(
        () => new Error('Cart ID is required. No active cart found.')
      );
    }

    return this.cartAccessCodeFacade.getCartAccessCode(userId, cartId).pipe(
      map((response) => this.extractOtpKey(response)),
      filter((otpKey) => Boolean(otpKey)),
      switchMap((otpKey) =>
        this.buildAndUpdatePaymentConfig(updatePaymentConfig, otpKey as string)
      ),
      take(1)
    );
  }

  protected buildAndUpdatePaymentConfig(
    updatePaymentConfig: OpfPaymentUpdateConfig,
    otpKey: string
  ): Observable<OpfPaymentSessionData> {
    const paymentConfig = updatePaymentConfig.config ?? {};

    const configWithDefaults: OpfPaymentUpdatePayload = {
      ...paymentConfig,
      channel: paymentConfig.channel ?? OpfPaymentChannel.BROWSER,
      browserInfo:
        paymentConfig.browserInfo ?? getBrowserInfo(this.winRef.nativeWindow),
    };

    return this.opfPaymentFacade
      .updatePaymentTransaction({
        ...updatePaymentConfig,
        otpKey: updatePaymentConfig.otpKey ?? otpKey,
        config: configWithDefaults,
      })
      .pipe(
        retry({
          count:
            OpfGlobalFunctionsService.UPDATE_PAYMENT_TRANSACTION_RETRY_COUNT,
          delay:
            OpfGlobalFunctionsService.UPDATE_PAYMENT_TRANSACTION_RETRY_DELAY,
        })
      );
  }

  protected registerVerifyPayment(domain: OpfGlobalFunctionsDomain): void {
    this.getGlobalFunctionContainer(domain).verifyPayment = (
      paymentSessionId: string,
      paymentVerificationPayload: OpfPaymentVerificationPayload
    ): Promise<OpfPaymentVerificationResponse> => {
      return this.ngZone.run(() => {
        return lastValueFrom(
          this.opfPaymentFacade
            .verifyPayment(paymentSessionId, paymentVerificationPayload)
            .pipe(take(1))
        );
      });
    };
  }

  protected registerUpdatePaymentTransaction(
    domain: OpfGlobalFunctionsDomain
  ): void {
    /**
     * Exposes global updatePaymentTransaction for existing sessions.
     * Backend is responsible for any internal fallback strategy.
     */
    this.getGlobalFunctionContainer(domain).updatePaymentTransaction = (
      updatePaymentConfig: OpfPaymentUpdateConfig
    ): Promise<OpfPaymentSessionData> => {
      return this.ngZone.run(() => {
        if (!updatePaymentConfig?.paymentSessionId) {
          return Promise.reject(new Error('paymentSessionId is required'));
        }
        return this.executeUpdatePaymentTransaction(updatePaymentConfig)
          .then((sessionData) => sessionData)
          .catch((error) => {
            throw this.createUpdatePaymentTransactionError(error);
          });
      });
    };
  }

  protected executeUpdatePaymentTransaction(
    updatePaymentConfig: OpfPaymentUpdateConfig
  ): Promise<OpfPaymentSessionData> {
    const cartId$ = this.activeCartFacade.getActiveCartId().pipe(take(1));
    const userId$ = this.userIdService.getUserId().pipe(take(1));

    return lastValueFrom(
      combineLatest([userId$, cartId$]).pipe(
        switchMap(([userId, cartId]) =>
          this.updatePaymentTransactionWithCart(
            userId,
            cartId,
            updatePaymentConfig
          )
        )
      )
    );
  }

  protected createUpdatePaymentTransactionError(error: unknown): Error {
    const message = this.extractErrorMessage(error);
    return new Error(
      message
        ? `Failed to update payment transaction: ${message}`
        : 'Failed to update payment transaction'
    );
  }

  protected extractErrorMessage(error: unknown): string | undefined {
    if (!error) {
      return undefined;
    }
    const errorObj = error as any;
    // Extract message from normalized HttpErrorModel structure
    return errorObj?.details?.[0]?.message || errorObj?.message;
  }

  protected registerUpdateCartGuestUserEmail(
    domain: OpfGlobalFunctionsDomain
  ): void {
    this.getGlobalFunctionContainer(domain).updateCartGuestUserEmail = (
      email: string
    ): Promise<boolean> => {
      return this.ngZone.run(() => {
        return lastValueFrom(
          this.opfQuickBuyTransactionService
            .updateCartGuestUserEmail(email)
            .pipe(take(1))
        );
      });
    };
  }

  protected registerCreateCartGuestUser(
    domain: OpfGlobalFunctionsDomain
  ): void {
    this.getGlobalFunctionContainer(domain).createCartGuestUser =
      (): Promise<boolean> => {
        return this.ngZone.run(() => {
          return lastValueFrom(
            this.opfQuickBuyTransactionService
              .createCartGuestUser()
              .pipe(take(1))
          );
        });
      };
  }

  protected registerSetBillingAddress(domain: OpfGlobalFunctionsDomain): void {
    this.getGlobalFunctionContainer(domain).setBillingAddress = (
      address: Address
    ): Promise<unknown> => {
      return this.ngZone.run(() => {
        return lastValueFrom(
          this.opfQuickBuyTransactionService
            .setBillingAddress(address)
            .pipe(switchMap(() => this.reloadCartAndWaitForStable()))
        );
      });
    };
  }

  protected reloadCartAndWaitForStable(): Observable<boolean> {
    this.activeCartFacade.reloadActiveCart();
    return this.activeCartFacade.isStable().pipe(
      skip(1), // Skip the initial stable state before reload
      filter((isStable: boolean) => isStable),
      take(1)
    );
  }

  protected registerSetDeliveryAddress(domain: OpfGlobalFunctionsDomain): void {
    this.getGlobalFunctionContainer(domain).setDeliveryAddress = (
      address: Address
    ): Promise<string> => {
      return this.ngZone.run(() => {
        return lastValueFrom(
          this.opfQuickBuyTransactionService.setDeliveryAddress(address)
        );
      });
    };
  }

  protected registerGetBillingAddress(domain: OpfGlobalFunctionsDomain): void {
    this.getGlobalFunctionContainer(domain).getBillingAddress = (): Promise<
      Address | undefined
    > => {
      return this.ngZone.run(() => {
        return lastValueFrom(
          this.reloadCartAndWaitForStable().pipe(
            switchMap(() => this.activeCartFacade.takeActive()),
            map((cart: Cart | undefined) => cart?.sapBillingAddress),
            take(1)
          )
        );
      });
    };
  }

  protected registerGetDeliveryAddress(domain: OpfGlobalFunctionsDomain): void {
    this.getGlobalFunctionContainer(domain).getDeliveryAddress = (): Promise<
      Address | undefined
    > => {
      return this.ngZone.run(() => {
        return lastValueFrom(
          this.reloadCartAndWaitForStable().pipe(
            switchMap(() => this.activeCartFacade.takeActive()),
            map((cart: Cart | undefined) => cart?.deliveryAddress),
            take(1)
          )
        );
      });
    };
  }

  protected registerSetDeliveryMode(domain: OpfGlobalFunctionsDomain): void {
    this.getGlobalFunctionContainer(domain).setDeliveryMode = (
      mode: string
    ): Promise<DeliveryMode | undefined> => {
      return this.ngZone.run(() => {
        return lastValueFrom(
          this.opfQuickBuyTransactionService.setDeliveryMode(mode).pipe(take(1))
        );
      });
    };
  }

  protected registerGetDeliveryMode(domain: OpfGlobalFunctionsDomain): void {
    this.getGlobalFunctionContainer(domain).getDeliveryMode = (): Promise<
      DeliveryMode | undefined
    > => {
      return this.ngZone.run(() => {
        return lastValueFrom(
          this.reloadCartAndWaitForStable().pipe(
            switchMap(() => this.activeCartFacade.takeActive()),
            map((cart: Cart | undefined) => cart?.deliveryMode),
            take(1)
          )
        );
      });
    };
  }

  protected registerDeleteAddress(domain: OpfGlobalFunctionsDomain): void {
    this.getGlobalFunctionContainer(domain).deleteAddress = (
      addressId: string
    ): Promise<void> => {
      return this.ngZone.run(() => {
        return new Promise<void>((resolve) => {
          this.opfQuickBuyTransactionService.deleteUserAddresses([addressId]);
          resolve();
        });
      });
    };
  }

  protected registerReinitiatePaymentForm(
    domain: OpfGlobalFunctionsDomain
  ): void {
    this.getGlobalFunctionContainer(domain).reinitiatePaymentForm = (
      paymentOptionId?: number
    ): Promise<boolean> => {
      return this.ngZone.run(() => {
        // Emit the event using the payment events service
        this.opfPaymentEventsService.emitReinitiatePaymentEvent(
          paymentOptionId
        );

        return Promise.resolve(true);
      });
    };
  }

  protected getPaymentOptionId(providedId?: number): Observable<number> {
    if (providedId) {
      return of(providedId);
    }

    return this.opfMetadataStoreService.getOpfMetadataState().pipe(
      take(1),
      switchMap((metadata: OpfMetadataModel) => {
        const storedId =
          metadata.selectedPaymentOptionId ??
          metadata.defaultSelectedPaymentOptionId;

        return storedId
          ? of(storedId)
          : throwError(
              () => new Error('No payment option ID found in storage')
            );
      })
    );
  }

  protected registerHandle3DSRedirect(
    domain: OpfGlobalFunctionsDomain,
    paymentSessionId?: string,
    _vcr?: ViewContainerRef
  ): void {
    this.getGlobalFunctionContainer(domain).handle3DSRedirect = (
      threeDsURL: string
    ): Promise<void> => {
      return this.ngZone.run(() => {
        const finalPaymentSessionId =
          paymentSessionId ??
          this.opfMetadataStoreService.opfMetadataState.value
            ?.opfPaymentSessionId;

        if (!finalPaymentSessionId) {
          return Promise.reject(
            new Error(
              OpfGlobalFunctionsService.PAYMENT_SESSION_ID_REQUIRED_ERROR
            )
          );
        }

        if (!threeDsURL) {
          return Promise.reject(new Error('threeDsURL is required'));
        }

        const returnPath = this.routingService.getFullUrl({
          cxRoute: OpfPage.RESULT_PAGE,
        });

        this.opfMetadataStoreService.updateOpfMetadata({
          opfPaymentSessionId: finalPaymentSessionId,
          is3DSRedirect: true,
          opf3DSRedirectReturnPath: returnPath,
        });

        if (this.winRef.nativeWindow) {
          this.winRef.nativeWindow.location.href = threeDsURL;
        }
        return Promise.resolve();
      });
    };
  }
}
