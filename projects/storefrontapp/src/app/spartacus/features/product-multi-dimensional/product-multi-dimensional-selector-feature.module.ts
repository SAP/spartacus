/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { provideConfig } from '@spartacus/core';
import {
  PRODUCT_MULTI_DIMENSIONAL_SELECTOR_FEATURE,
  ProductMultiDimensionalSelectorRootModule,
} from '@spartacus/product-multi-dimensional/selector/root';
import {
  multiDimensionalSelectorTranslationChunksConfig,
  multiDimensionalSelectorTranslationsEn,
  multiDimensionalSelectorTranslationsJa,
  multiDimensionalSelectorTranslationsDe,
  multiDimensionalSelectorTranslationsZh,
} from '@spartacus/product-multi-dimensional/selector/assets';

@NgModule({
  imports: [ProductMultiDimensionalSelectorRootModule],
  providers: [
    provideConfig({
      featureModules: {
        [PRODUCT_MULTI_DIMENSIONAL_SELECTOR_FEATURE]: {
          module: () =>
            import('@spartacus/product-multi-dimensional/selector').then(
              (m) => m.ProductMultiDimensionalSelectorModule
            ),
        },
      },
      i18n: {
        resources: {
          en: multiDimensionalSelectorTranslationsEn,
          ja: multiDimensionalSelectorTranslationsJa,
          de: multiDimensionalSelectorTranslationsDe,
          zh: multiDimensionalSelectorTranslationsZh,
        },
        chunks: multiDimensionalSelectorTranslationChunksConfig,
        fallbackLang: 'en',
      },
    }),
  ],
})
export class ProductMultiDimensionalSelectorFeatureModule {}
