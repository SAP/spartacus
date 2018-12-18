import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CmsModule } from '../../../cms/cms.module';
import { CartComponentModule } from '../../../cart/cart.module';
import { CartPageLayoutComponent } from './cart-page-layout.component';
import { CartDetailsModule } from '../../../cart/cart-details/cart-details.module';

@NgModule({
  imports: [CommonModule, CmsModule, CartComponentModule, CartDetailsModule],
  declarations: [CartPageLayoutComponent],
  exports: [CartPageLayoutComponent]
})
export class CartPageLayoutModule {}
