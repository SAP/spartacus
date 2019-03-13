import { NgModule } from '@angular/core';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CartModule } from '@spartacus/core';
import { AddToCartModule } from './add-to-cart/add-to-cart.module';
import { CartDetailsModule } from './cart-details/cart-details.module';
import { CartSharedModule } from './cart-shared/cart-shared.module';
import { CartTotalsModule } from './cart-totals/cart-totals.module';

@NgModule({
  imports: [
    AddToCartModule,
    CartDetailsModule,
    CartTotalsModule,
    CartSharedModule,
    NgbModule,
    CartModule
  ],
  exports: [
    AddToCartModule,
    CartDetailsModule,
    CartTotalsModule,
    CartSharedModule
  ]
})
export class CartComponentModule {}
