/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { CmsConfig, I18nConfig, provideConfig } from '@commerce-storefront-toolset/core';
import {
  productVariantsTranslationChunksConfig,
  productVariantsTranslations,
} from '@commerce-storefront-toolset/product/variants/assets';
import {
  ProductVariantsRootModule,
  PRODUCT_VARIANTS_FEATURE,
} from '@commerce-storefront-toolset/product/variants/root';

@NgModule({
  imports: [ProductVariantsRootModule],
  providers: [
    provideConfig(<CmsConfig>{
      featureModules: {
        [PRODUCT_VARIANTS_FEATURE]: {
          module: () =>
            import('@commerce-storefront-toolset/product/variants').then(
              (m) => m.ProductVariantsModule
            ),
        },
      },
    }),
    provideConfig(<I18nConfig>{
      i18n: {
        resources: productVariantsTranslations,
        chunks: productVariantsTranslationChunksConfig,
      },
    }),
  ],
})
export class VariantsFeatureModule {}
