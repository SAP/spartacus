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

@NgModule({
  imports: [PickupInStoreBaseModule],
  providers: [
    provideConfig({
      featureModules: {
        PICK_UP_IN_STORE_FEATURE: {
          module: () =>
            import('@spartacus/pickup-in-store/feature').then(
              (m) => m.PickupInStoreFeatureModule
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
