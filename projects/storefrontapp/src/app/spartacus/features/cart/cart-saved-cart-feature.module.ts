/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import {
  savedCartTranslationChunksConfig,
  savedCartTranslations,
} from '@commerce-storefront-toolset/cart/saved-cart/assets';
import {
  CART_SAVED_CART_FEATURE,
  SavedCartRootModule,
} from '@commerce-storefront-toolset/cart/saved-cart/root';
import { CmsConfig, I18nConfig, provideConfig } from '@commerce-storefront-toolset/core';

@NgModule({
  imports: [SavedCartRootModule],
  providers: [
    provideConfig(<CmsConfig>{
      featureModules: {
        [CART_SAVED_CART_FEATURE]: {
          module: () =>
            import('@commerce-storefront-toolset/cart/saved-cart').then((m) => m.SavedCartModule),
        },
      },
    }),
    provideConfig(<I18nConfig>{
      i18n: {
        resources: savedCartTranslations,
        chunks: savedCartTranslationChunksConfig,
        fallbackLang: 'en',
      },
    }),
  ],
})
export class SavedCartFeatureModule {}
