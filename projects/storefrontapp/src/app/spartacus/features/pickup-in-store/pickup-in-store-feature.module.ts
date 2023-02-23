/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { provideConfig } from '@spartacus/core';
import { PickupInStoreRootModule } from '@spartacus/pickup-in-store/root';

import {
  pickupInStoreTranslationChunksConfig,
  pickupInStoreTranslations,
} from 'feature-libs/pickup-in-store/assets/public_api';
import { PICKUP_IN_STORE_FEATURE } from 'feature-libs/pickup-in-store/root/feature-name';

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
      i18n: {
        resources: pickupInStoreTranslations,
        chunks: pickupInStoreTranslationChunksConfig,
        fallbackLang: 'en',
      },
    }),
  ],
})
export class PickupInStoreFeatureModule {}
