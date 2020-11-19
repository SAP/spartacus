import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CmsConfig, provideDefaultConfig, I18nModule } from '@spartacus/core';
import { ProductDetailsTabComponent } from './product-details-tab.component';

@NgModule({
  imports: [CommonModule, I18nModule],
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
  entryComponents: [ProductDetailsTabComponent],
  exports: [ProductDetailsTabComponent],
})
export class ProductDetailsTabModule {}
