/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import {
  CmsConfig,
  provideDefaultConfig,
  provideDefaultConfigFactory,
} from '@spartacus/core';
import {
  SUBSCRIPTION_BILLING_CORE_FEATURE,
  SUBSCRIPTION_BILLING_FEATURE,
} from './feature-name';
import { defaultSubscriptionBillingRoutingConfig } from './config/default-subscription-billing-routing-config';
import { SubscriptionBillingEventModule } from './events';
import { OutletPosition, provideOutlet } from '@spartacus/storefront';
import { CartOutlets } from '@spartacus/cart/base/root';
import { SubscriptionCartPriceHeadingComponent } from './components/cart/price-heading/subscription-cart-price-heading.component';
import { SubscriptionCartPriceBodyComponent } from './components/cart/price-body/subscription-cart-price-body.component';

export function defaultSubscriptionBillingComponentsConfig(): CmsConfig {
  const config: CmsConfig = {
    featureModules: {
      [SUBSCRIPTION_BILLING_FEATURE]: {
        cmsComponents: [
          'SubscriptionHistoryComponent',
          'SubscriptionProductPriceComponent',
          'SubscriptionDetailsComponent',
          'SubscriptionBillsHistoryComponent',
          'SubscriptionBillDetailsComponent'
        ],
      },
      [SUBSCRIPTION_BILLING_CORE_FEATURE]: SUBSCRIPTION_BILLING_FEATURE,
    },
  };
  return config;
}

@NgModule({
  imports: [SubscriptionBillingEventModule],
  providers: [
    provideDefaultConfigFactory(defaultSubscriptionBillingComponentsConfig),
    provideDefaultConfig(defaultSubscriptionBillingRoutingConfig),
    provideOutlet({
      id: CartOutlets.SUBSCRIPTION_PRICE_HEADING,
      position: OutletPosition.AFTER,
      component: SubscriptionCartPriceHeadingComponent,
    }),
    provideOutlet({
      id: CartOutlets.SUBSCRIPTION_PRICE_BODY,
      position: OutletPosition.AFTER,
      component: SubscriptionCartPriceBodyComponent,
    }),
  ],
})
export class SubscriptionBillingRootModule {}
