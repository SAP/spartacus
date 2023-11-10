/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import {
  ADD_TO_CART_FEATURE,
  CART_BASE_FEATURE,
} from '@spartacus/cart/base/root';
import {
  CmsConfig,
  provideDefaultConfig,
  provideDefaultConfigFactory,
} from '@spartacus/core';

import {
  PICKUP_IN_STORE_CORE_FEATURE,
  PICKUP_IN_STORE_FEATURE,
} from './feature-name';

export function defaultPickupInStoreComponentsConfig(): CmsConfig {
  return {
    featureModules: {
      [PICKUP_IN_STORE_FEATURE]: {
        cmsComponents: [
          'CheckoutReviewPickup',
          'MyPreferredStoreComponent',
          'OrderConfirmationPickUpComponent',
          'PickupInStoreDeliveryModeComponent',
        ],
      },
      [PICKUP_IN_STORE_CORE_FEATURE]: PICKUP_IN_STORE_FEATURE,
    },
  };
}

@NgModule({
  providers: [
    provideDefaultConfigFactory(defaultPickupInStoreComponentsConfig),
    // make pickup lib loaded before add-to-cart
    provideDefaultConfig({
      featureModules: {
        [ADD_TO_CART_FEATURE]: {
          dependencies: [PICKUP_IN_STORE_FEATURE],
        },
      },
    }),
    // make pickup lib loaded before cart base
    provideDefaultConfig({
      featureModules: {
        [CART_BASE_FEATURE]: {
          dependencies: [PICKUP_IN_STORE_FEATURE],
        },
      },
    }),
  ],
})
export class PickupInStoreRootModule {}
