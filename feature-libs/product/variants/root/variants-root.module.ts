import { NgModule } from '@angular/core';
import { provideDefaultConfig } from '@spartacus/core';
import { ProductVariantsComponent } from '@spartacus/product/variants/components';
import { ProductVariantsGuard } from '@spartacus/product/variants/core';

@NgModule({
  providers: [
    provideDefaultConfig({
      featureModules: {
        variants: {
          cmsComponents: {
            ProductVariantSelectorComponent: {
              component: ProductVariantsComponent,
              guards: [ProductVariantsGuard],
            },
          },
        },
      },
    }),
  ],
})
export class VariantsRootModule {}
