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
import { UserIdService, WindowRef } from '@spartacus/core';
import {
  ActiveCartFacade,
  CartAccessCodeFacade,
} from '@spartacus/cart/base/root';
import {
  OpfKeyValueMap,
  OpfMetadataStoreService,
} from '@spartacus/opf/base/root';
import { getBrowserInfo } from '@spartacus/opf/payment/core';
import {
  OpfPaymentChannel,
  OpfPaymentFacade,
  OpfPaymentMerchantCallback,
  OpfPaymentMethod,
  OpfPaymentSessionData,
  OpfPaymentUpdateConfig,
  OpfPaymentUpdatePayload,
} from '@spartacus/opf/payment/root';
import { LAUNCH_CALLER, LaunchDialogService } from '@spartacus/storefront';
import { Observable, combineLatest, lastValueFrom, throwError } from 'rxjs';
import {
  filter,
  finalize,
  last,
  map,
  retry,
  switchMap,
  take,
} from 'rxjs/operators';

export type OpfSharedPaymentSubmitOptions = {
  cartId?: string;
  additionalData: Array<OpfKeyValueMap>;
  submitSuccess: OpfPaymentMerchantCallback;
  submitPending: OpfPaymentMerchantCallback;
  submitFailure: OpfPaymentMerchantCallback;
  submitCancel?: OpfPaymentMerchantCallback;
  paymentMethod: OpfPaymentMethod;
  paymentSessionId?: string;
  savePaymentMethod?: boolean;
};

export type OpfSharedPaymentSubmitCompleteOptions = {
  cartId?: string;
  additionalData: Array<OpfKeyValueMap>;
  submitSuccess: OpfPaymentMerchantCallback;
  submitPending: OpfPaymentMerchantCallback;
  submitFailure: OpfPaymentMerchantCallback;
  submitCancel?: OpfPaymentMerchantCallback;
  paymentSessionId?: string;
};

@Injectable()
export class OpfGlobalFunctionsSharedService {
  static readonly PAYMENT_SESSION_ID_REQUIRED_ERROR =
    'paymentSessionId is required';
  static readonly UPDATE_PAYMENT_TRANSACTION_RETRY_COUNT = 2;
  static readonly UPDATE_PAYMENT_TRANSACTION_RETRY_DELAY = 300;

  protected winRef = inject(WindowRef);
  protected ngZone = inject(NgZone);
  protected opfPaymentFacade = inject(OpfPaymentFacade);
  protected launchDialogService = inject(LaunchDialogService);
  protected opfMetadataStoreService = inject(OpfMetadataStoreService);
  protected activeCartFacade = inject(ActiveCartFacade);
  protected userIdService = inject(UserIdService);
  protected cartAccessCodeFacade = inject(CartAccessCodeFacade);

  resolvePaymentSessionId(paymentSessionId?: string): string | undefined {
    return (
      paymentSessionId ??
      this.opfMetadataStoreService.opfMetadataState.value?.opfPaymentSessionId
    );
  }

  requirePaymentSessionId(paymentSessionId?: string): string {
    const finalPaymentSessionId =
      this.resolvePaymentSessionId(paymentSessionId);

    if (!finalPaymentSessionId) {
      throw new Error(
        OpfGlobalFunctionsSharedService.PAYMENT_SESSION_ID_REQUIRED_ERROR
      );
    }

    return finalPaymentSessionId;
  }

  submit(
    options: OpfSharedPaymentSubmitOptions,
    paymentSessionId?: string,
    vcr?: ViewContainerRef
  ): Promise<boolean> {
    return this.ngZone.run(() => {
      const finalPaymentSessionId = this.requirePaymentSessionId(
        options.paymentSessionId ?? paymentSessionId
      );

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
            last(() => true, true),
            finalize(() => {
              if (overlayedSpinner) {
                this.stopLoaderSpinner(overlayedSpinner);
              }
            })
          )
      );
    });
  }

  submitComplete(
    options: OpfSharedPaymentSubmitCompleteOptions,
    paymentSessionId?: string,
    vcr?: ViewContainerRef
  ): Promise<boolean> {
    return this.ngZone.run(() => {
      const finalPaymentSessionId = this.requirePaymentSessionId(
        options.paymentSessionId ?? paymentSessionId
      );

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
  }

  runSubmitComplete(
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
  ): Promise<boolean> {
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

  updatePaymentTransaction(
    updatePaymentConfig: OpfPaymentUpdateConfig
  ): Promise<OpfPaymentSessionData> {
    return this.ngZone.run(() => {
      return this.executeUpdatePaymentTransaction({
        ...updatePaymentConfig,
        paymentSessionId: updatePaymentConfig?.paymentSessionId ?? '',
      })
        .then((sessionData) => sessionData)
        .catch((error) => {
          throw this.createUpdatePaymentTransactionError(error);
        });
    });
  }

  startLoaderSpinner(
    vcr: ViewContainerRef
  ): void | Observable<ComponentRef<any> | undefined> {
    return this.launchDialogService.launch(
      LAUNCH_CALLER.PLACE_ORDER_SPINNER,
      vcr
    );
  }

  stopLoaderSpinner(
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
      filter(Boolean),
      switchMap((otpKey) =>
        this.buildAndUpdatePaymentConfig(updatePaymentConfig, otpKey as string)
      ),
      take(1)
    );
  }

  extractOtpKey(response: unknown): string | undefined {
    return typeof response === 'string'
      ? response
      : ((response as { accessCode?: string })?.accessCode ??
          (response as string | undefined));
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
            OpfGlobalFunctionsSharedService.UPDATE_PAYMENT_TRANSACTION_RETRY_COUNT,
          delay:
            OpfGlobalFunctionsSharedService.UPDATE_PAYMENT_TRANSACTION_RETRY_DELAY,
        })
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
    return errorObj?.details?.[0]?.message || errorObj?.message;
  }
}
