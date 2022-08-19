/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CartOutlets } from '@spartacus/cart/base/root';
import { OutletPosition, provideOutlet } from '@spartacus/storefront';
import { CartItemListContainerComponent } from './cart-item-list-container.component';

@NgModule({
  imports: [CommonModule],
  exports: [CartItemListContainerComponent],
  declarations: [CartItemListContainerComponent],
  providers: [
    provideOutlet({
      id: CartOutlets.CART_ITEM_LIST,
      position: OutletPosition.REPLACE,
      component: CartItemListContainerComponent,
    }),
  ],
})
export class CartItemListContainerModule {}
