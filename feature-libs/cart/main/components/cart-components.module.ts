import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ActiveCartOrderEntriesContextToken } from '@spartacus/cart/main/root';
import { OutletModule, PAGE_LAYOUT_HANDLER } from '@spartacus/storefront';
import { AddedToCartDialogModule } from './cart/added-to-cart-dialog/added-to-cart-dialog.module';
import { CartDetailsModule } from './cart/cart-details/cart-details.module';
import { CartPageLayoutHandler } from './cart/cart-page-layout-handler';
import { CartSharedModule } from './cart/cart-shared/cart-shared.module';
import { CartTotalsModule } from './cart/cart-totals/cart-totals.module';
import { ActiveCartOrderEntriesContext } from './cart/page-context/active-cart-order-entries.context';
import { SaveForLaterModule } from './cart/save-for-later/save-for-later.module';
import { ClearCartModule } from './cart/clear-cart/clear-cart.module';

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    CartDetailsModule,
    CartTotalsModule,
    CartSharedModule,
    SaveForLaterModule,
    ClearCartModule,
    OutletModule.forChild(),
  ],
  exports: [
    CartDetailsModule,
    CartTotalsModule,
    CartSharedModule,
    ClearCartModule,
    AddedToCartDialogModule,
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
