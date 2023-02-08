/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { provideConfig } from '@spartacus/core';
import { PickupInStoreBaseModule } from '@spartacus/pickup-in-store/base';

import {
  pickupInStoreTranslationChunksConfig,
  pickupInStoreTranslations,
} from '@spartacus/pickup-in-store/base/assets';
import { PICKUP_IN_STORE_FEATURE } from 'feature-libs/pickup-in-store/base/root/feature-name';

@NgModule({
  imports: [PickupInStoreBaseModule],
  providers: [
    provideConfig({
      featureModules: {
        [PICKUP_IN_STORE_FEATURE]: {
          module: () => {
            console.log('############## Lazy Load the feature module');
            return import('@spartacus/pickup-in-store/feature').then(
              (m) => m.PickupInStoreFeatureModule
            );
          },
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
export class PickupInStoreFeatureModule {
  constructor() {
    console.log('+++++++ Store Front Module');
  }
}
