/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { CART_BASE_FEATURE } from '@spartacus/cart/base/root';
import {
  CmsConfig,
  provideDefaultConfig,
  provideDefaultConfigFactory,
} from '@spartacus/core';
import { defaultCheckoutConfig } from './config/default-checkout-config';
import { defaultCheckoutRoutingConfig } from './config/default-checkout-routing-config';
import { CheckoutEventModule } from './events/checkout-event.module';
import { CHECKOUT_CORE_FEATURE, CHECKOUT_FEATURE } from './feature-name';
import { interceptors } from './http-interceptors/index';

export const CHECKOUT_BASE_CMS_COMPONENTS: string[] = [
  'CheckoutOrchestrator',
  'CheckoutOrderSummary',
  'CheckoutProgress',
  'CheckoutProgressMobileBottom',
  'CheckoutProgressMobileTop',
  'CheckoutDeliveryMode',
  'CheckoutPaymentDetails',
  'CheckoutPlaceOrder',
  'CheckoutReviewOrder',
  'CheckoutReviewPayment',
  'CheckoutReviewShipping',
  'CheckoutReviewOverview',
  'CheckoutDeliveryAddress',
  'GuestCheckoutLoginComponent',
];

export function defaultCheckoutComponentsConfig() {
  const config: CmsConfig = {
    featureModules: {
      [CHECKOUT_FEATURE]: {
        cmsComponents: CHECKOUT_BASE_CMS_COMPONENTS,
        dependencies: [CART_BASE_FEATURE],
      },
      // by default core is bundled together with components
      [CHECKOUT_CORE_FEATURE]: CHECKOUT_FEATURE,
    },
  };
  return config;
}

@NgModule({
  imports: [CheckoutEventModule],
  providers: [
    ...interceptors,
    provideDefaultConfig(defaultCheckoutRoutingConfig),
    provideDefaultConfig(defaultCheckoutConfig),
    provideDefaultConfigFactory(defaultCheckoutComponentsConfig),
  ],
})
export class CheckoutRootModule {}
