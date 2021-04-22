import { NgModule } from '@angular/core';
import { CmsConfig, provideConfig } from '@spartacus/core';
import {
  productVariantsTranslationChunksConfig,
  productVariantsTranslations,
} from '@spartacus/product/variants/assets';
import { ProductVariantsRootModule } from '@spartacus/product/variants/root';

@NgModule({
  imports: [ProductVariantsRootModule],
  providers: [
    provideConfig(<CmsConfig>{
      featureModules: {
        productVariants: {
          module: () =>
            import('@spartacus/product/variants').then(
              (m) => m.ProductVariantsModule
            ),
        },
      },
      i18n: {
        resources: productVariantsTranslations,
        chunks: productVariantsTranslationChunksConfig,
      },
    }),
  ],
})
export class VariantsFeatureModule {}
