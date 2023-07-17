/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { provideConfig } from '@spartacus/core';
import {
  PickupInStoreRootModule,
  PICKUP_IN_STORE_FEATURE,
} from '@spartacus/pickup-in-store/root';

import {
  ADD_TO_CART_FEATURE,
  CART_BASE_FEATURE,
} from '@spartacus/cart/base/root';
import {
  pickupInStoreTranslationChunksConfig,
  pickupInStoreTranslations,
} from '@spartacus/pickup-in-store/assets';

@NgModule({
  imports: [PickupInStoreRootModule],
  providers: [
    provideConfig({
      featureModules: {
        [PICKUP_IN_STORE_FEATURE]: {
          module: () =>
            import('@spartacus/pickup-in-store').then(
              (m) => m.PickupInStoreModule
            ),
        },
      },
    }),
    provideConfig({
      featureModules: {
        [ADD_TO_CART_FEATURE]: {
          dependencies: [PICKUP_IN_STORE_FEATURE],
        },
      },
    }),
    provideConfig({
      featureModules: {
        [CART_BASE_FEATURE]: {
          dependencies: [PICKUP_IN_STORE_FEATURE],
        },
      },
    }),
    provideConfig({
      i18n: {
        resources: pickupInStoreTranslations,
        chunks: pickupInStoreTranslationChunksConfig,
        fallbackLang: 'en',
      },
    }),
  ],
})
export class PickupInStoreFeatureModule {}
