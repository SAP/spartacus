import { NgModule } from '@angular/core';
import { CmsConfig, I18nConfig, provideConfig } from '@spartacus/core';
import {
  productImageZoomTranslationChunksConfig,
  productImageZoomTranslations,
} from '@spartacus/product/image-zoom/assets';
import {
  ProductImageZoomRootModule,
  PRODUCT_IMAGE_ZOOM_FEATURE,
} from '@spartacus/product/image-zoom/root';

@NgModule({
  imports: [ProductImageZoomRootModule],
  providers: [
    provideConfig(<CmsConfig>{
      featureModules: {
        [PRODUCT_IMAGE_ZOOM_FEATURE]: {
          module: () =>
            import('@spartacus/product/image-zoom').then(
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
