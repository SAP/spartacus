import { NgModule } from '@angular/core';
import { provideDefaultConfig } from '@spartacus/core';

@NgModule({
  providers: [
    provideDefaultConfig({
      featureModules: {
        variantsMultidimensional: {
          cmsComponents: ['ProductVariantMultiDimensionalSelectorComponent'],
        },
      },
    }),
  ],
})
export class VariantsMultiDimensionalRootModule {}
