import { NgModule } from '@angular/core';
import { CmsConfig, provideDefaultConfigFactory } from '@spartacus/core';
import { PRODUCT_VARIANTS_FEATURE } from './feature-name';

// TODO: Inline this factory when we start releasing Ivy compiled libraries
export function defaultProductVariantsComponentsConfig(): CmsConfig {
  const config: CmsConfig = {
    featureModules: {
      [PRODUCT_VARIANTS_FEATURE]: {
        cmsComponents: ['ProductVariantSelectorComponent'],
      },
    },
  };

  return config;
}

@NgModule({
  providers: [
    provideDefaultConfigFactory(defaultProductVariantsComponentsConfig),
  ],
})
export class ProductVariantsRootModule {}
