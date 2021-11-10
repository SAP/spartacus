import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ActiveCartOrderEntriesContextToken } from '@spartacus/cart/main/root';
import { OutletModule, PAGE_LAYOUT_HANDLER } from '@spartacus/storefront';
import { AddToCartModule } from './cart/add-to-cart/add-to-cart.module';
import { AddToWishListModule } from './cart/add-to-wishlist/add-to-wish-list.module';
import { CartDetailsModule } from './cart/cart-details/cart-details.module';
import { CartPageLayoutHandler } from './cart/cart-page-layout-handler';
import { ActiveCartOrderEntriesContext } from './cart/cart-page/active-cart-order-entries-context';
import { CartSharedModule } from './cart/cart-shared/cart-shared.module';
import { CartTotalsModule } from './cart/cart-totals/cart-totals.module';
import { MiniCartModule } from './cart/mini-cart/mini-cart.module';
import { AddOrderEntriesContext } from './cart/order-entries-context/add-order-entries.context';
import { GetOrderEntriesContext } from './cart/order-entries-context/get-order-entries.context';
import { SaveForLaterModule } from './cart/save-for-later/save-for-later.module';
import { WishListModule } from './wish-list/wish-list.module';

export type OrderEntriesContext = Partial<
  AddOrderEntriesContext & GetOrderEntriesContext
>;

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    CartDetailsModule,
    CartTotalsModule,
    CartSharedModule,
    SaveForLaterModule,
    WishListModule,
    OutletModule.forChild(),
  ],
  exports: [
    AddToWishListModule,
    CartDetailsModule,
    CartTotalsModule,
    CartSharedModule,
    AddToCartModule,
    MiniCartModule,
    SaveForLaterModule,
  ],
  providers: [
    {
      provide: PAGE_LAYOUT_HANDLER,
      useExisting: CartPageLayoutHandler,
      multi: true,
    },
    {
      provide: ActiveCartOrderEntriesContextToken,
      useExisting: ActiveCartOrderEntriesContext,
    },
  ],
})
export class CartComponentsModule {}
