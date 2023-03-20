/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { CART_BASE_FEATURE } from '@spartacus/cart/base/root';
import { CmsConfig, provideDefaultConfigFactory } from '@spartacus/core';
import { ORDER_FEATURE } from '@spartacus/order/root';
import { STORE_FINDER_FEATURE } from '@spartacus/storefinder/root';
import { USER_PROFILE_FEATURE } from '@spartacus/user/profile/root';
import {
  CartPickupOptionsContainerModule,
  OrderConsignmentContainerModule,
  PdpPickupOptionsContainerModule,
} from './components/index';

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
        dependencies: [
          STORE_FINDER_FEATURE,
          CART_BASE_FEATURE,
          ORDER_FEATURE,
          USER_PROFILE_FEATURE,
        ],
      },
      [PICKUP_IN_STORE_CORE_FEATURE]: PICKUP_IN_STORE_FEATURE,
    },
  };
}

@NgModule({
  imports: [
    CartPickupOptionsContainerModule,
    PdpPickupOptionsContainerModule,
    OrderConsignmentContainerModule,
  ],
  providers: [
    provideDefaultConfigFactory(defaultPickupInStoreComponentsConfig),
  ],
})
export class PickupInStoreRootModule {}
