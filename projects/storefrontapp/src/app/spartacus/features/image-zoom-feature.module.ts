import { NgModule } from '@angular/core';
import { CmsConfig, I18nConfig, provideConfig } from '@spartacus/core';
import {
  imageZoomTranslationChunksConfig,
  imageZoomTranslations,
} from '@spartacus/product/image-zoom/assets';
import {
  ImageZoomRootModule,
  IMAGE_ZOOM_FEATURE,
} from '@spartacus/product/image-zoom/root';

@NgModule({
  imports: [ImageZoomRootModule],
  providers: [
    provideConfig(<CmsConfig>{
      featureModules: {
        [IMAGE_ZOOM_FEATURE]: {
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
export class BulkPricingFeatureModule {}
