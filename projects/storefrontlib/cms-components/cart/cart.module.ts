import { Injectable, NgModule } from '@angular/core';
import { Resolve, RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CartModule } from '@spartacus/core';
import { CmsPageGuard, PageLayoutComponent } from '@spartacus/storefront';
import { PAGE_LAYOUT_HANDLER } from '../../cms-structure/page/page-layout/page-layout-handler';
import { AddToCartModule } from './add-to-cart/add-to-cart.module';
import { AddToWishListModule } from './add-to-wishlist/add-to-wish-list.module';
import { CartDetailsModule } from './cart-details/cart-details.module';
import { CartPageLayoutHandler } from './cart-page-layout-handler';
import { ActiveCartImportExportContext } from './cart-page/active-cart-import-export-context.service';
import { CartSharedModule } from './cart-shared/cart-shared.module';
import { CartTotalsModule } from './cart-totals/cart-totals.module';
import { MiniCartModule } from './mini-cart/mini-cart.module';
import { ExportContext } from './order-entries-context/export.context';
import { ImportContext } from './order-entries-context/import.context';
import { SaveForLaterModule } from './save-for-later/save-for-later.module';

export interface OrderEntriesContext {
  orderEntries: Partial<ImportContext | ExportContext>;
}

@Injectable({ providedIn: 'root' })
export class ActiveCartPageContextResolver
  implements Resolve<OrderEntriesContext> {
  constructor(protected orderEntriesContext: ActiveCartImportExportContext) {}
  resolve = () => ({ orderEntries: this.orderEntriesContext });
}

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
        data: { cxRoute: 'cart' },
        resolve: { cxContext: ActiveCartPageContextResolver },
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
