import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CartModule } from '@spartacus/core';
import { CmsPageGuard } from '../../cms-structure/guards/cms-page.guard';
import { PAGE_LAYOUT_HANDLER } from '../../cms-structure/page/page-layout/page-layout-handler';
import { PageLayoutComponent } from '../../cms-structure/page/page-layout/page-layout.component';
import { AddToCartModule } from './add-to-cart/add-to-cart.module';
import { AddToWishListModule } from './add-to-wishlist/add-to-wish-list.module';
import { CartDetailsModule } from './cart-details/cart-details.module';
import { CartPageLayoutHandler } from './cart-page-layout-handler';
import { ActiveCartOrderEntriesContext } from './cart-page/active-cart-order-entries-context';
import { CartSharedModule } from './cart-shared/cart-shared.module';
import { CartTotalsModule } from './cart-totals/cart-totals.module';
import { MiniCartModule } from './mini-cart/mini-cart.module';
import { AddOrderEntriesContext } from './order-entries-context/add-order-entries.context';
import { GetOrderEntriesContext } from './order-entries-context/get-order-entries.context';
import { ORDER_ENTRIES_CONTEXT } from './order-entries-context/order-entires.context';
import { SaveForLaterModule } from './save-for-later/save-for-later.module';

export type OrderEntriesContext = Partial<
  AddOrderEntriesContext & GetOrderEntriesContext
>;

@NgModule({
  imports: [
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
