/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CART_BASE_FEATURE } from '@spartacus/cart/base/root';
import {
  CmsConfig,
  provideDefaultConfig,
  provideDefaultConfigFactory,
} from '@spartacus/core';
import { CmsPageGuard, PageLayoutComponent } from '@spartacus/storefront';
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
  imports: [
    CheckoutEventModule,

    // We need to add a new route.
    // Normally, I'd define a new ContentPage in CMS and not use `RouterModule.forChild()`.
    // But JUST FOR DEMONSTRATION PURPOSES, I took the shortcut here.
    // I've added a new route (from the Spartacus point of view), but under the hood I reuse
    // an existing CMS page content (so I don't need to define a new page in the CMS sample data now).
    // See the mapping below: `pageLabel: '/login'`
    // In other words, when entering the route `/checkout-require-auth`,
    // it will not trigger a regular `LoginGuard` (which would redirect to an EXTERNAL login page).
    // but instead it will show us a page content of the old login page.
    RouterModule.forChild([
      {
        // @ts-ignore
        path: null,
        canActivate: [CmsPageGuard],
        component: PageLayoutComponent,
        data: {
          cxRoute: 'checkoutRequireAuth',
          pageLabel: '/login',
        },
      },
    ]),
  ],
  providers: [
    provideDefaultConfig({
      routing: {
        routes: {
          checkoutRequireAuth: {
            paths: ['checkout-require-auth'],
            authFlow: true,
          },
        },
      },
    }),

    ...interceptors,
    provideDefaultConfig(defaultCheckoutRoutingConfig),
    provideDefaultConfig(defaultCheckoutConfig),
    provideDefaultConfigFactory(defaultCheckoutComponentsConfig),
  ],
})
export class CheckoutRootModule {}
