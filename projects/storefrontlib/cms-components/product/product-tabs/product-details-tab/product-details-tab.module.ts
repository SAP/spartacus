import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CmsConfig, provideDefaultConfig } from '@spartacus/core';
import { OutletModule } from '../../../../cms-structure/outlet/outlet.module';
import { ProductDetailsTabComponent } from './product-details-tab.component';

@NgModule({
  imports: [CommonModule, OutletModule],
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
