import { NgModule } from '@angular/core';
import { CmsConfig, provideDefaultConfig } from '@spartacus/core';
import { ProductVariantsComponent } from '../components';
import { ProductVariantGuard } from '@spartacus/product/variants/core';

@NgModule({
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        ProductVariantSelectorComponent: {
          component: ProductVariantsComponent,
          guards: [ProductVariantGuard],
        },
      },
    }),
  ],
})
export class VariantsRootModule {}
