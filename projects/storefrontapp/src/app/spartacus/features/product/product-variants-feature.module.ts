import { NgModule } from '@angular/core';
import { CmsConfig, I18nConfig, provideConfig } from '@spartacus/core';
import {
  productVariantsTranslationChunksConfig,
  productVariantsTranslations,
} from '@spartacus/product/variants/assets';
import {
  ProductVariantsRootModule,
  PRODUCT_VARIANTS_FEATURE,
} from '@spartacus/product/variants/root';

@NgModule({
  imports: [ProductVariantsRootModule],
  providers: [
    provideConfig(<CmsConfig>{
      featureModules: {
        [PRODUCT_VARIANTS_FEATURE]: {
          module: () =>
            import('@spartacus/product/variants').then(
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
