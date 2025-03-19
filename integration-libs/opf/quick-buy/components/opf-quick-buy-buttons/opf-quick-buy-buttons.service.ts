/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { inject, Injectable } from '@angular/core';
import {
  ActiveCartFacade,
  CartGuestUserFacade,
  MultiCartFacade,
} from '@spartacus/cart/base/root';
import { CheckoutConfig } from '@spartacus/checkout/base/root';
import { AuthService, UserIdService } from '@spartacus/core';
import {
  OpfActiveConfiguration,
  OpfBaseFacade,
  OpfPaymentProviderType,
} from '@spartacus/opf/base/root';
import {
  OpfQuickBuyDigitalWallet,
  OpfQuickBuyProviderType,
} from '@spartacus/opf/quick-buy/root';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class OpfQuickBuyButtonsService {
  protected opfBaseFacade = inject(OpfBaseFacade);
  protected checkoutConfig = inject(CheckoutConfig);
  protected authService = inject(AuthService);
  protected userIdService = inject(UserIdService);
  protected cartGuestUserFacade = inject(CartGuestUserFacade);
  protected activeCartFacade = inject(ActiveCartFacade);
  protected multiCartFacade = inject(MultiCartFacade);

  getPaymentGatewayConfiguration(): Observable<OpfActiveConfiguration> {
    return this.opfBaseFacade
      .getActiveConfigurationsState()
      .pipe(
        map(
          (config) =>
            (config?.data?.value || []).filter(
              (item) =>
                item?.providerType === OpfPaymentProviderType.PAYMENT_GATEWAY
            )[0]
        )
      );
  }

  getQuickBuyProviderConfig(
    provider: OpfQuickBuyProviderType,
    activeConfiguration: OpfActiveConfiguration
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
    provider: OpfQuickBuyProviderType,
    activeConfiguration: OpfActiveConfiguration
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
}
