import { NgModule } from '@angular/core';
import { provideDefaultConfig } from '@spartacus/core';

@NgModule({
  providers: [
    provideDefaultConfig({
      featureModules: {
        productVariants: {
          cmsComponents: ['ProductVariantSelectorComponent'],
        },
      },
    }),
  ],
})
export class ProductVariantsRootModule {}
