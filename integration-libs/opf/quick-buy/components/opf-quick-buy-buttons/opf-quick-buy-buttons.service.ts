/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, inject } from '@angular/core';
import { CheckoutConfig } from '@spartacus/checkout/base/root';
import { AuthService, BaseSiteService } from '@spartacus/core';
import {
  ActiveConfiguration,
  OpfBaseFacade,
  OpfPaymentProviderType,
} from '@spartacus/opf/base/root';
import {
  OpfProviderType,
  OpfQuickBuyDigitalWallet,
} from '@spartacus/opf/quick-buy/root';
import { Observable, of } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';

@Injectable()
export class OpfQuickBuyButtonsService {
  protected opfBaseFacade = inject(OpfBaseFacade);
  protected checkoutConfig = inject(CheckoutConfig);
  protected baseSiteService = inject(BaseSiteService);
  protected authService = inject(AuthService);

  getPaymentGatewayConfiguration(): Observable<ActiveConfiguration> {
    return this.opfBaseFacade
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
  ): OpfQuickBuyDigitalWallet | undefined {
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
}
