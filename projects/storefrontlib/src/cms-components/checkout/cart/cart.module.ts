import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CartModule } from '@spartacus/core';
import { AddToCartModule } from './add-to-cart/add-to-cart.module';
import { CartDetailsModule } from './cart-details/cart-details.module';
import { CartNotEmptyGuard } from './cart-not-empty.guard';
import { CartSharedModule } from './cart-shared/cart-shared.module';
import { CartTotalsModule } from './cart-totals/cart-totals.module';
import { MiniCartModule } from './mini-cart/mini-cart.module';

@NgModule({
  imports: [
    CartModule,
    NgbModule,
    CartDetailsModule,
    CartTotalsModule,
    CartSharedModule,
  ],
  exports: [
    CartDetailsModule,
    CartTotalsModule,
    CartSharedModule,
    AddToCartModule,
    MiniCartModule,
  ],
  providers: [CartNotEmptyGuard],
})
export class CartComponentModule {}
