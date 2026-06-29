import { NgModule } from '@angular/core';
import { CmsConfig, I18nConfig, provideConfig } from '@spartacus/core';
import {
  productVariantsTranslationChunksConfig,
  productVariantsTranslationsEn,
} from '@spartacus/product/variants/assets';
import {
  PRODUCT_VARIANTS_FEATURE,
  ProductVariantsRootModule,
} from '@spartacus/product/variants/root';

@NgModule({
  declarations: [],
  imports: [ProductVariantsRootModule],
  providers: [
    provideConfig(<CmsConfig>{
      featureModules: {
        [PRODUCT_VARIANTS_FEATURE]: {
          module: () => import('@spartacus/product/variants').then((m) => m.ProductVariantsModule),
        },
      },
    }),
    provideConfig(<I18nConfig>{
      i18n: {
        resources: { en: productVariantsTranslationsEn },
        chunks: productVariantsTranslationChunksConfig,
      },
    }),
  ],
})
export class ProductVariantsFeatureModule {}
