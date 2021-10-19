import { NgModule } from '@angular/core';
import { CmsConfig, I18nConfig, provideConfig } from '@spartacus/core';
import {
  ProductImageZoomRootModule,
  PRODUCT_IMAGE_ZOOM_FEATURE,
} from 'feature-libs/product/image-zoom/root';
import {
  productImageZoomTranslationChunksConfig,
  productImageZoomTranslations,
} from '@spartacus/product/image-zoom/assets';

@NgModule({
  imports: [ProductImageZoomRootModule],
  providers: [
    provideConfig(<CmsConfig>{
      featureModules: {
        [PRODUCT_IMAGE_ZOOM_FEATURE]: {
          module: () =>
            import('@spartacus/product/image-zoom').then(
              (m) => m.ImageZoomModule
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
