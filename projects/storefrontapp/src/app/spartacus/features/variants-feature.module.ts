import { NgModule } from '@angular/core';
import { VariantsRootModule } from '@spartacus/product/variants/root';
import { provideConfig } from '@spartacus/core';
import {
  variantsTranslationChunksConfig,
  variantsTranslations,
} from '@spartacus/product/variants/assets';

@NgModule({
  imports: [VariantsRootModule],
  providers: [
    provideConfig({
      featureModules: {
        variants: {
          module: () =>
            import('@spartacus/product/variants').then((m) => m.VariantsModule),
        },
      },
      i18n: {
        resources: variantsTranslations,
        chunks: variantsTranslationChunksConfig,
      },
    }),
  ],
})
export class VariantsFeatureModule {}
