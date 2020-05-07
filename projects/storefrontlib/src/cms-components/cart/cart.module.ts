import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CartModule } from '@spartacus/core';
import { PAGE_LAYOUT_HANDLER } from '../../cms-structure/page/page-layout/page-layout-handler';
import { AddToCartModule } from './add-to-cart/add-to-cart.module';
import { CartDetailsModule } from './cart-details/cart-details.module';
import { CartPageLayoutHandler } from './cart-page-layout-handler';
import { CartSharedModule } from './cart-shared/cart-shared.module';
import { CartTotalsModule } from './cart-totals/cart-totals.module';
import { MiniCartModule } from './mini-cart/mini-cart.module';
import { AddToWishListModule } from './add-to-wishlist/add-to-wish-list.module';
import { SaveForLaterModule } from './save-for-later/save-for-later.module';
@NgModule({
  imports: [
    NgbModule,
    CartDetailsModule,
    CartTotalsModule,
    CartSharedModule,
    SaveForLaterModule,
  ],
  exports: [
    AddToWishListModule,
    CartDetailsModule,
    CartTotalsModule,
    CartSharedModule,
    AddToCartModule,
    MiniCartModule,
    CartModule,
    SaveForLaterModule,
  ],
  declarations: [],
  providers: [
    {
      provide: PAGE_LAYOUT_HANDLER,
      useExisting: CartPageLayoutHandler,
      multi: true,
    },
  ],
})
export class CartComponentModule {}
