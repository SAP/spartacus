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
import { forkJoin, Observable, of } from 'rxjs';
import { filter, map, switchMap, take } from 'rxjs/operators';

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
    return this.opfBaseFacade.getActiveConfigurationsState().pipe(
      switchMap((firstPageState) => {
        const firstPageItems = firstPageState?.data?.value ?? [];
        const totalPages = firstPageState?.data?.page?.totalPages ?? 1;

        if (totalPages <= 1) {
          return of(firstPageItems);
        }

        const remainingPageRequests$ = Array.from(
          { length: totalPages - 1 },
          (_, i) =>
            this.opfBaseFacade
              .getActiveConfigurationsState({ pageNumber: i + 2 })
              .pipe(
                filter((state) => !state.loading),
                take(1),
                map((state) => state?.data?.value ?? [])
              )
        );

        return forkJoin(remainingPageRequests$).pipe(
          map((remainingPages) => [...firstPageItems, ...remainingPages.flat()])
        );
      }),
      map((allItems) =>
        allItems.filter(
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
