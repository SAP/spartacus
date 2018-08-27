import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CmsModule } from '../../../cms/cms.module';
import { CartModule } from '../../../cart/cart.module';
import { CartPageLayoutComponent } from './cart-page-layout.component';

@NgModule({
  imports: [CommonModule, CmsModule, CartModule],
  declarations: [CartPageLayoutComponent],
  exports: [CartPageLayoutComponent]
})
export class CartPageLayoutModule {}
