import { NgModule } from '@angular/core';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CartModule } from '@spartacus/core';
import { AddToCartModule } from './add-to-cart/add-to-cart.module';
import { CartDetailsModule } from './cart-details/cart-details.module';
import { CartSharedModule } from './cart-shared/cart-shared.module';
import { CartNotEmptyGuard } from './guards/cart-not-empty.guard';
@NgModule({
  imports: [
    AddToCartModule,
    CartDetailsModule,
    CartSharedModule,
    NgbModule,
    CartModule
  ],
  exports: [AddToCartModule, CartDetailsModule, CartSharedModule],
  providers: [CartNotEmptyGuard]
})
export class CartComponentModule {}
