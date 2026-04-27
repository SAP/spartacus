/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
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

  getPaymentGatewayConfiguration(): Observable<
    OpfActiveConfiguration | OpfActiveConfiguration[]
  > {
    return this.opfBaseFacade
      .getActiveConfigurationsState()
      .pipe(
        map((config) =>
          (config?.data?.value || []).filter(
            (item) =>
              item?.providerType === OpfPaymentProviderType.PAYMENT_GATEWAY
          )
        )
      );
  }

  getQuickBuyProviderConfig(
    provider: OpfQuickBuyProviderType,
    activeConfiguration: OpfActiveConfiguration | OpfActiveConfiguration[]
  ): OpfQuickBuyDigitalWallet | undefined {
    const configs = this.normalizeConfigurations(activeConfiguration);
    return configs
      ?.flatMap((config) => config?.digitalWalletQuickBuy ?? [])
      .find((item) => item.provider === provider && item.enabled);
  }

  isQuickBuyProviderEnabled(
    provider: OpfQuickBuyProviderType,
    activeConfiguration: OpfActiveConfiguration | OpfActiveConfiguration[]
  ): boolean {
    return !!this.getQuickBuyProviderConfig(provider, activeConfiguration);
  }

  getActiveConfigurationForProvider(
    provider: OpfQuickBuyProviderType,
    activeConfiguration: OpfActiveConfiguration | OpfActiveConfiguration[]
  ): OpfActiveConfiguration | undefined {
    const configs = this.normalizeConfigurations(activeConfiguration);
    return configs?.find((config) =>
      config?.digitalWalletQuickBuy?.some(
        (item) => item.provider === provider && item.enabled
      )
    );
  }

  /**
   * Normalizes ActiveConfiguration to always return an array.
   * Returns empty array if configurations are null/undefined.
   */
  protected normalizeConfigurations(
    activeConfiguration: OpfActiveConfiguration | OpfActiveConfiguration[]
  ): OpfActiveConfiguration[] | undefined {
    if (!activeConfiguration) {
      return undefined;
    }
    return Array.isArray(activeConfiguration)
      ? activeConfiguration
      : [activeConfiguration];
  }
}
