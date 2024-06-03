/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ActiveCartOrderEntriesContextToken } from '@spartacus/cart/base/root';
import { OutletModule, PAGE_LAYOUT_HANDLER } from '@spartacus/storefront';
import { ClearCartModule } from './clear-cart/clear-cart-button/clear-cart.module';
import { AddedToCartDialogModule } from './added-to-cart-dialog/added-to-cart-dialog.module';
import { CartDetailsModule } from './cart-details/cart-details.module';
import { CartPageLayoutHandler } from './cart-page-layout-handler';
import { CartProceedToCheckoutModule } from './cart-proceed-to-checkout/cart-proceed-to-checkout.module';
import { CartSharedModule } from './cart-shared/cart-shared.module';
import { CartTotalsModule } from './cart-totals/cart-totals.module';
import { ActiveCartOrderEntriesContext } from './page-context/active-cart-order-entries.context';
import { SaveForLaterModule } from './save-for-later/save-for-later.module';

@NgModule({
  imports: [
    CommonModule,
    CartDetailsModule,
    CartProceedToCheckoutModule,
    CartTotalsModule,
    CartSharedModule,
    SaveForLaterModule,
    ClearCartModule,
    OutletModule.forChild(),
  ],
  exports: [
    CartDetailsModule,
    CartProceedToCheckoutModule,
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
export class CartBaseComponentsModule {}
