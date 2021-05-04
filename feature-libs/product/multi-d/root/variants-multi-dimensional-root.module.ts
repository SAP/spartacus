import { NgModule } from '@angular/core';
import { provideDefaultConfigFactory } from '@spartacus/core';

export function defaultProductMultiDimensionalComponentsConfig() {
  const config = {
    featureModules: {
      variantsMultidimensional: {
        cmsComponents: [
          'ProductVariantMultiDimensionalSelectorComponent',
          'ProductOrderGridTabComponent',
        ],
      },
    },
  };
  return config;
}

@NgModule({
  providers: [
    provideDefaultConfigFactory(defaultProductMultiDimensionalComponentsConfig),
  ],
})
export class VariantsMultiDimensionalRootModule {}
