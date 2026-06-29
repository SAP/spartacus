import { NgModule } from '@angular/core';
import { CmsConfig, I18nConfig, provideConfig } from '@spartacus/core';
import {
  productImageZoomTranslationChunksConfig,
  productImageZoomTranslationsEn,
} from '@spartacus/product/image-zoom/assets';
import {
  PRODUCT_IMAGE_ZOOM_FEATURE,
  ProductImageZoomRootModule,
} from '@spartacus/product/image-zoom/root';

@NgModule({
  declarations: [],
  imports: [ProductImageZoomRootModule],
  providers: [
    provideConfig(<CmsConfig>{
      featureModules: {
        [PRODUCT_IMAGE_ZOOM_FEATURE]: {
          module: () =>
            import('@spartacus/product/image-zoom').then((m) => m.ProductImageZoomModule),
        },
      },
    }),
    provideConfig(<I18nConfig>{
      i18n: {
        resources: { en: productImageZoomTranslationsEn },
        chunks: productImageZoomTranslationChunksConfig,
      },
    }),
  ],
})
export class ProductImageZoomFeatureModule {}
