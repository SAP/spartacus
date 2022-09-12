/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { CmsConfig, I18nConfig, provideConfig } from '@commerce-storefront-toolset/core';
import {
  storeFinderTranslationChunksConfig,
  storeFinderTranslations,
} from '@commerce-storefront-toolset/storefinder/assets';
import {
  StoreFinderRootModule,
  STORE_FINDER_FEATURE,
} from '@commerce-storefront-toolset/storefinder/root';

@NgModule({
  imports: [StoreFinderRootModule],
  providers: [
    provideConfig(<CmsConfig>{
      featureModules: {
        [STORE_FINDER_FEATURE]: {
          module: () =>
            import('@commerce-storefront-toolset/storefinder').then((m) => m.StoreFinderModule),
        },
      },
    }),
    provideConfig(<I18nConfig>{
      i18n: {
        resources: storeFinderTranslations,
        chunks: storeFinderTranslationChunksConfig,
      },
    }),
  ],
})
export class StorefinderFeatureModule {}
