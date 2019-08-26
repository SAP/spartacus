import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfigModule, CmsConfig } from '@spartacus/core';
import { ProductDetailsTabComponent } from './product-details-tab.component';

@NgModule({
  imports: [
    CommonModule,
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        ProductDetailsTabComponent: {
          component: ProductDetailsTabComponent,
        },
      },
    }),
  ],
  declarations: [ProductDetailsTabComponent],
  entryComponents: [ProductDetailsTabComponent],
  exports: [ProductDetailsTabComponent],
})
export class ProductDetailsTabModule {}
