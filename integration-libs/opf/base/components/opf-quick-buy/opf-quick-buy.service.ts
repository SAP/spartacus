/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, inject } from '@angular/core';
import { CheckoutConfig } from '@spartacus/checkout/base/root';
import { AuthService, BaseSiteService, RoutingService } from '@spartacus/core';
import { OpfPickupInStoreHandlerService } from '@spartacus/opf/base/core';
import {
  ActiveConfiguration,
  DigitalWalletQuickBuy,
  OpfPaymentFacade,
  OpfPaymentProviderType,
  OpfProviderType,
  OpfQuickBuyDeliveryInfo,
  OpfQuickBuyLocation,
  defaultMerchantName,
} from '@spartacus/opf/base/root';
import { Observable, of } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class OpfQuickBuyService {
  protected opfPaymentFacade = inject(OpfPaymentFacade);
  protected checkoutConfig = inject(CheckoutConfig);
  protected baseSiteService = inject(BaseSiteService);
  protected authService = inject(AuthService);
  protected routingService = inject(RoutingService);
  protected opfPickupInStoreHandlerService = inject(
    OpfPickupInStoreHandlerService
  );

  getPaymentGatewayConfiguration(): Observable<ActiveConfiguration> {
    return this.opfPaymentFacade
      .getActiveConfigurationsState()
      .pipe(
        map(
          (config) =>
            (config?.data || []).filter(
              (item) =>
                item?.providerType === OpfPaymentProviderType.PAYMENT_GATEWAY
            )[0]
        )
      );
  }

  getQuickBuyProviderConfig(
    provider: OpfProviderType,
    activeConfiguration: ActiveConfiguration
  ): DigitalWalletQuickBuy | undefined {
    let config;
    if (activeConfiguration && activeConfiguration.digitalWalletQuickBuy) {
      config = activeConfiguration?.digitalWalletQuickBuy.find(
        (item) => item.provider === provider
      );
    }

    return config;
  }

  isQuickBuyProviderEnabled(
    provider: OpfProviderType,
    activeConfiguration: ActiveConfiguration
  ): boolean {
    let isEnabled = false;
    if (activeConfiguration && activeConfiguration.digitalWalletQuickBuy) {
      isEnabled = Boolean(
        activeConfiguration?.digitalWalletQuickBuy.find(
          (item) => item.provider === provider
        )?.enabled
      );
    }

    return isEnabled;
  }

  isUserGuestOrLoggedIn(): Observable<boolean> {
    return this.baseSiteService.get().pipe(
      take(1),
      map((baseSite) => baseSite?.baseStore?.paymentProvider),
      switchMap((paymentProviderName) => {
        return paymentProviderName &&
          this.checkoutConfig.checkout?.flows?.[paymentProviderName]?.guest
          ? of(true)
          : this.authService.isUserLoggedIn();
      })
    );
  }

  getQuickBuyLocationContext(): Observable<OpfQuickBuyLocation> {
    return this.routingService.getRouterState().pipe(
      take(1),
      map(
        (routerState) =>
          routerState?.state?.semanticRoute?.toLocaleUpperCase() as OpfQuickBuyLocation
      )
    );
  }

  getQuickBuyDeliveryInfo(
    context: OpfQuickBuyLocation
  ): Observable<OpfQuickBuyDeliveryInfo> {
    const deliveryTypeObservable =
      context === OpfQuickBuyLocation.CART
        ? this.opfPickupInStoreHandlerService.getActiveCartDeliveryType().pipe(
            map((deliveryType) => {
              return {
                type: deliveryType,
              } as OpfQuickBuyDeliveryInfo;
            })
          )
        : this.opfPickupInStoreHandlerService.getSingleProductDeliveryInfo();

    return deliveryTypeObservable.pipe(take(1));
  }

  getMerchantName(): Observable<string> {
    return this.baseSiteService.get().pipe(
      take(1),
      map((baseSite) => baseSite?.name ?? defaultMerchantName)
    );
  }
}
