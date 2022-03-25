import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CmsConfig, provideDefaultConfig } from '@spartacus/core';
import { ProductDetailsTabComponent } from './product-details-tab.component';

@NgModule({
  imports: [CommonModule],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        ProductDetailsTabComponent: {
          component: ProductDetailsTabComponent,
        },
      },
    }),
  ],
  declarations: [ProductDetailsTabComponent],
  exports: [ProductDetailsTabComponent],
})
export class ProductDetailsTabModule {}
