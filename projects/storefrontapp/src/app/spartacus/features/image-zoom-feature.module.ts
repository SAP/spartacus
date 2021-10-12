import { NgModule } from '@angular/core';
import { CmsConfig, I18nConfig, provideConfig } from '@spartacus/core';
import {
  ImageZoomRootModule,
  PRODUCT_IMAGE_ZOOM_FEATURE,
} from 'feature-libs/product/image-zoom/root';
import {
  imageZoomTranslationChunksConfig,
  imageZoomTranslations,
} from '@spartacus/product/image-zoom/assets';

@NgModule({
  imports: [ImageZoomRootModule],
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
        resources: imageZoomTranslations,
        chunks: imageZoomTranslationChunksConfig,
      },
    }),
  ],
})
export class ImageZoomFeatureModule {}
