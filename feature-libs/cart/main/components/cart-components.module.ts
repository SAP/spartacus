import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {
  CmsPageGuard,
  OutletModule,
  PageLayoutComponent,
  PAGE_LAYOUT_HANDLER,
} from '@spartacus/storefront';
import { ActiveCartOrderEntriesContext } from './cart-page/active-cart-order-entries-context';
import { AddToCartModule } from './cart/add-to-cart/add-to-cart.module';
import { AddToWishListModule } from './cart/add-to-wishlist/add-to-wish-list.module';
import { CartDetailsModule } from './cart/cart-details/cart-details.module';
import { CartPageLayoutHandler } from './cart/cart-page-layout-handler';
import { CartSharedModule } from './cart/cart-shared/cart-shared.module';
import { CartTotalsModule } from './cart/cart-totals/cart-totals.module';
import { MiniCartModule } from './cart/mini-cart/mini-cart.module';
import { SaveForLaterModule } from './cart/save-for-later/save-for-later.module';
import { AddOrderEntriesContext } from './order-entries-context/add-order-entries.context';
import { GetOrderEntriesContext } from './order-entries-context/get-order-entries.context';
import { ORDER_ENTRIES_CONTEXT } from './order-entries-context/order-entires.context';
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
    RouterModule.forChild([
      {
        // @ts-ignore
        path: null,
        canActivate: [CmsPageGuard],
        component: PageLayoutComponent,
        data: {
          cxRoute: 'cart',
          cxContext: {
            [ORDER_ENTRIES_CONTEXT]: ActiveCartOrderEntriesContext,
          },
        },
      },
    ]),
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
  ],
})
export class CartComponentsModule {}
