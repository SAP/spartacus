import { NgModule } from '@angular/core';
import { provideDefaultConfig } from '@spartacus/core';

@NgModule({
  providers: [
    provideDefaultConfig({
      featureModules: {
        variants: {
          cmsComponents: ['ProductVariantSelectorComponent'],
        },
      },
    }),
  ],
})
export class VariantsRootModule {}
