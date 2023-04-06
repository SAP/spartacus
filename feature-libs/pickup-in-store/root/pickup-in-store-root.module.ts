/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { CmsConfig, provideDefaultConfigFactory } from '@spartacus/core';

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
  ],
})
export class PickupInStoreRootModule {}
