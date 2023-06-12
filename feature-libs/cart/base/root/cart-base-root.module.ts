/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  LoggerService,
  provideDefaultConfig,
  provideDefaultConfigFactory,
} from '@spartacus/core';
import { CmsPageGuard, PageLayoutComponent } from '@spartacus/storefront';
import { defaultCartConfig } from './config/default-cart-config';
import { defaultCartRoutingConfig } from './config/default-cart-routing-config';
import { ORDER_ENTRIES_CONTEXT } from './context/order-entires.context';
import { CartBaseEventModule } from './events/cart-base-event.module';
import {
  ADD_TO_CART_FEATURE,
  CART_BASE_CORE_FEATURE,
  CART_BASE_FEATURE,
  MINI_CART_FEATURE,
} from './feature-name';
import { ActiveCartOrderEntriesContextToken } from './tokens/context';

export function defaultCartComponentsConfig() {
  const config = {
    featureModules: {
      [CART_BASE_FEATURE]: {
        cmsComponents: [
          'CartApplyCouponComponent',
          'CartComponent',
          'CartProceedToCheckoutComponent',
          'CartTotalsComponent',
          'SaveForLaterComponent',
          'ClearCartComponent',
        ],
      },
      [MINI_CART_FEATURE]: {
        cmsComponents: ['MiniCartComponent'],
      },
      [ADD_TO_CART_FEATURE]: {
        cmsComponents: ['ProductAddToCartComponent'],
      },
      // By default core is bundled together with components.
      // The cart lib should keep using this default.
      //
      // While the lazy loading configurations make it possible to
      // split the core part and the components part, it is required that
      // they stay together for the cart lib.  This compromise is required to
      // optimize performances by delaying the moment the cart lib is loaded and
      // making sure cart lib is loaded when needed.
      [CART_BASE_CORE_FEATURE]: CART_BASE_FEATURE,
    },
  };
  return config;
}

@NgModule({
  imports: [
    CartBaseEventModule,
    RouterModule.forChild([
      {
        // @ts-ignore
        path: null,
        canActivate: [CmsPageGuard],
        component: PageLayoutComponent,
        data: {
          cxRoute: 'cart',
          cxContext: {
            [ORDER_ENTRIES_CONTEXT]: ActiveCartOrderEntriesContextToken,
          },
        },
      },
    ]),
  ],
  providers: [
    provideDefaultConfigFactory(defaultCartComponentsConfig),
    provideDefaultConfig(defaultCartConfig),
    provideDefaultConfig(defaultCartRoutingConfig),
  ],
})
export class CartBaseRootModule {
  // TODO: This is for testing purpose - REMOVE BEFORE RELEASE
  constructor() {
    const logger = inject(LoggerService);
    logger.log('Hello World');
    setTimeout(() => {
      logger.warn(
        JSON.stringify({
          message: 'WARN Hello World',
          type: 'ERROR',
          context: {
            url: '/some/url',
          },
        })
      );
    }, 5000);
    setTimeout(() => {
      logger.error({
        message: 'ERROR Hello World',
        type: 'ERROR',
        context: {
          url: '/some/url',
        },
      });
    }, 10000);
    setTimeout(() => {
      throw new Error('THROWN ERROR Hello World');
    }, 15000);
    setTimeout(() => {
      logger.info('[INFO] %cHello World', 'background: blue; color: white');
    }, 20000);
    setTimeout(() => {
      logger.debug('[DEBUG] Hello World');
    }, 25000);
  }
}
