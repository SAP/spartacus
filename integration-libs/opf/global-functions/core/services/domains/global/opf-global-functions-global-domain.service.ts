/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ComponentRef, Injectable, NgZone, inject } from '@angular/core';
import {
  Address,
  RoutingService,
  UserIdService,
  WindowRef,
} from '@spartacus/core';
import {
  ActiveCartFacade,
  Cart,
  CartAccessCodeFacade,
  DeliveryMode,
  MultiCartFacade,
} from '@spartacus/cart/base/root';
import {
  OpfErrorDialogOptions,
  OpfMetadataStoreService,
  OpfPage,
  defaultOpfErrorDialogOptions,
} from '@spartacus/opf/base/root';
import { OpfCtaFacade } from '@spartacus/opf/cta/root';
import { getBrowserInfo } from '@spartacus/opf/payment/core';
import {
  OpfPaymentChannel,
  OpfPaymentConfig,
  OpfPaymentFacade,
  OpfPaymentInitiationConfig,
  OpfPaymentSessionData,
  OpfPaymentUpdateConfig,
  OpfPaymentVerificationPayload,
  OpfPaymentVerificationResponse,
} from '@spartacus/opf/payment/root';
import { OpfQuickBuyTransactionService } from '@spartacus/opf/quick-buy/core';
import { LAUNCH_CALLER, LaunchDialogService } from '@spartacus/storefront';
import { Observable, combineLatest, lastValueFrom, of, throwError } from 'rxjs';
import { filter, map, skip, switchMap, take } from 'rxjs/operators';
import { OpfGlobalFunctionsSharedService } from '../../opf-global-functions-shared.service';

@Injectable()
export class OpfGlobalFunctionsGlobalDomainService {
  protected winRef = inject(WindowRef);
  protected ngZone = inject(NgZone);
  protected opfPaymentFacade = inject(OpfPaymentFacade);
  protected launchDialogService = inject(LaunchDialogService);
  protected opfCtaFacade = inject(OpfCtaFacade);
  protected opfMetadataStoreService = inject(OpfMetadataStoreService);
  protected activeCartFacade = inject(ActiveCartFacade);
  protected multiCartFacade = inject(MultiCartFacade);
  protected userIdService = inject(UserIdService);
  protected cartAccessCodeFacade = inject(CartAccessCodeFacade);
  protected routingService = inject(RoutingService);
  protected opfQuickBuyTransactionService = inject(
    OpfQuickBuyTransactionService
  );
  protected sharedService = inject(OpfGlobalFunctionsSharedService);

  protected globalLoaderSpinnerCpntRef: void | Observable<
    ComponentRef<any> | undefined
  >;

  scriptReady(scriptIdentifier: string): void {
    this.ngZone.run(() => {
      this.opfCtaFacade.emitScriptReadyEvent(scriptIdentifier);
    });
  }

  getCart(cartId?: string): Promise<Cart | undefined> {
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
  }

  startLoadIndicatorGlobal(): void {
    this.ngZone.run(() => {
      if (this.globalLoaderSpinnerCpntRef) {
        this.sharedService.stopLoaderSpinner(this.globalLoaderSpinnerCpntRef);
      }
      const result = this.launchDialogService.launch(
        LAUNCH_CALLER.PLACE_ORDER_SPINNER
      );
      if (result) {
        this.globalLoaderSpinnerCpntRef = result;
      }
    });
  }

  stopLoadIndicatorGlobal(): void {
    this.ngZone.run(() => {
      this.sharedService.stopLoaderSpinner(this.globalLoaderSpinnerCpntRef);
      this.globalLoaderSpinnerCpntRef = undefined;
    });
  }

  throwPaymentErrorGlobal(
    opfErrorDialogOptions: OpfErrorDialogOptions = defaultOpfErrorDialogOptions
  ): void {
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
  }

  initiatePayment(
    configurationIdOrPaymentConfig: string | number | OpfPaymentConfig
  ): Promise<OpfPaymentSessionData> {
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
  }

  verifyPayment(
    paymentSessionId: string,
    paymentVerificationPayload: OpfPaymentVerificationPayload
  ): Promise<OpfPaymentVerificationResponse> {
    return this.ngZone.run(() => {
      return lastValueFrom(
        this.opfPaymentFacade
          .verifyPayment(paymentSessionId, paymentVerificationPayload)
          .pipe(take(1))
      );
    });
  }

  updatePaymentTransaction(
    updatePaymentConfig: OpfPaymentUpdateConfig
  ): Promise<OpfPaymentSessionData> {
    return this.sharedService.updatePaymentTransaction(updatePaymentConfig);
  }

  updateCartGuestUserEmail(email: string): Promise<boolean> {
    return this.ngZone.run(() => {
      return lastValueFrom(
        this.opfQuickBuyTransactionService
          .updateCartGuestUserEmail(email)
          .pipe(take(1))
      );
    });
  }

  createCartGuestUser(): Promise<boolean> {
    return this.ngZone.run(() => {
      return lastValueFrom(
        this.opfQuickBuyTransactionService.createCartGuestUser().pipe(take(1))
      );
    });
  }

  setBillingAddress(address: Address): Promise<unknown> {
    return this.ngZone.run(() => {
      return lastValueFrom(
        this.opfQuickBuyTransactionService
          .setBillingAddress(address)
          .pipe(switchMap(() => this.reloadCartAndWaitForStable()))
      );
    });
  }

  setDeliveryAddress(address: Address): Promise<string> {
    return this.ngZone.run(() => {
      return lastValueFrom(
        this.opfQuickBuyTransactionService.setDeliveryAddress(address)
      );
    });
  }

  getBillingAddress(): Promise<Address | undefined> {
    return this.ngZone.run(() => {
      return lastValueFrom(
        this.reloadCartAndWaitForStable().pipe(
          switchMap(() => this.activeCartFacade.takeActive()),
          map((cart: Cart | undefined) => cart?.sapBillingAddress),
          take(1)
        )
      );
    });
  }

  getDeliveryAddress(): Promise<Address | undefined> {
    return this.ngZone.run(() => {
      return lastValueFrom(
        this.reloadCartAndWaitForStable().pipe(
          switchMap(() => this.activeCartFacade.takeActive()),
          map((cart: Cart | undefined) => cart?.deliveryAddress),
          take(1)
        )
      );
    });
  }

  setDeliveryMode(mode: string): Promise<DeliveryMode | undefined> {
    return this.ngZone.run(() => {
      return lastValueFrom(
        this.opfQuickBuyTransactionService.setDeliveryMode(mode).pipe(take(1))
      );
    });
  }

  getDeliveryMode(): Promise<DeliveryMode | undefined> {
    return this.ngZone.run(() => {
      return lastValueFrom(
        this.reloadCartAndWaitForStable().pipe(
          switchMap(() => this.activeCartFacade.takeActive()),
          map((cart: Cart | undefined) => cart?.deliveryMode),
          take(1)
        )
      );
    });
  }

  deleteAddress(addressId: string): Promise<void> {
    return this.ngZone.run(() => {
      return new Promise<void>((resolve) => {
        this.opfQuickBuyTransactionService.deleteUserAddresses([addressId]);
        resolve();
      });
    });
  }

  protected normalizePaymentConfig(
    configurationIdOrPaymentConfig: string | number | OpfPaymentConfig
  ): OpfPaymentConfig {
    return typeof configurationIdOrPaymentConfig === 'string' ||
      typeof configurationIdOrPaymentConfig === 'number'
      ? { configurationId: String(configurationIdOrPaymentConfig) }
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
      map((response) => this.sharedService.extractOtpKey(response)),
      filter(Boolean),
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
        this.routingService.getFullUrl({ cxRoute: OpfPage.RESULT_PAGE }),
      cancelURL:
        paymentConfig.cancelURL ??
        this.routingService.getFullUrl({ cxRoute: OpfPage.CANCEL_PAGE }),
    };

    const fullConfig: OpfPaymentInitiationConfig = {
      otpKey,
      config: configWithDefaults,
    };
    return this.opfPaymentFacade.initiatePayment(fullConfig);
  }

  protected reloadCartAndWaitForStable(): Observable<boolean> {
    this.activeCartFacade.reloadActiveCart();
    return this.activeCartFacade.isStable().pipe(
      skip(1),
      filter((isStable: boolean) => isStable),
      take(1)
    );
  }
}
