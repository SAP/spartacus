import { NgModule } from '@angular/core';
import { ProductVariantsRootModule } from '@spartacus/product/variants/root';
import { provideConfig } from '@spartacus/core';
import {
  productVariantsTranslationChunksConfig,
  productVariantsTranslations,
} from '@spartacus/product/variants/assets';

@NgModule({
  imports: [ProductVariantsRootModule],
  providers: [
    provideConfig({
      featureModules: {
        productVariants: {
          module: () =>
            import('@spartacus/product/variants').then((m) => m.ProductVariantsModule),
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
