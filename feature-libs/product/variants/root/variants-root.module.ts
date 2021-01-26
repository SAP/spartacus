import { NgModule } from '@angular/core';
import { CmsConfig, provideDefaultConfig } from '@spartacus/core';
import { ProductVariantsComponent } from '@spartacus/product/variants/components';
import { ProductVariantsGuard } from '@spartacus/product/variants/core';

@NgModule({
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        ProductVariantSelectorComponent: {
          component: ProductVariantsComponent,
          guards: [ProductVariantsGuard],
        },
      },
    }),
  ],
})
export class VariantsRootModule {}
