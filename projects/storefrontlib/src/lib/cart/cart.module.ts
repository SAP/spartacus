import { NgModule } from '@angular/core';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AddToCartModule } from './components/add-to-cart/add-to-cart.module';
import { CartDetailsModule } from './components/cart-details/cart-details.module';
import { CartSharedModule } from './components/cart-shared/cart-shared.module';

@NgModule({
  imports: [AddToCartModule, CartDetailsModule, CartSharedModule, NgbModule],
  exports: [AddToCartModule, CartDetailsModule, CartSharedModule]
})
export class CartModule {}
