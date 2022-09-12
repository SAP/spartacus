/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { CmsConfig, I18nConfig, provideConfig } from '@commerce-storefront-toolset/core';
import {
  productImageZoomTranslationChunksConfig,
  productImageZoomTranslations,
} from '@commerce-storefront-toolset/product/image-zoom/assets';
import {
  ProductImageZoomRootModule,
  PRODUCT_IMAGE_ZOOM_FEATURE,
} from '@commerce-storefront-toolset/product/image-zoom/root';

@NgModule({
  imports: [ProductImageZoomRootModule],
  providers: [
    provideConfig(<CmsConfig>{
      featureModules: {
        [PRODUCT_IMAGE_ZOOM_FEATURE]: {
          module: () =>
            import('@commerce-storefront-toolset/product/image-zoom').then(
              (m) => m.ProductImageZoomModule
            ),
        },
      },
    }),
    provideConfig(<I18nConfig>{
      i18n: {
        resources: productImageZoomTranslations,
        chunks: productImageZoomTranslationChunksConfig,
      },
    }),
  ],
})
export class ImageZoomFeatureModule {}
