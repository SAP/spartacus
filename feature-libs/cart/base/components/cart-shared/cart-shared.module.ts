/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CartOutlets } from '@spartacus/cart/base/root';
import { FeaturesConfigModule, I18nModule, UrlModule } from '@spartacus/core';
import {
  AtMessageModule,
  IconModule,
  ItemCounterModule,
  MediaModule,
  OutletModule,
  PromotionsModule,
  provideOutlet,
} from '@spartacus/storefront';
import { AddToCartModule } from '../add-to-cart/add-to-cart.module';
import { CartCouponModule } from '../cart-coupon/cart-coupon.module';
import { CartItemValidationWarningModule } from '../validation/cart-item-warning/cart-item-validation-warning.module';
import { CartItemListRowComponent } from './cart-item-list-row/cart-item-list-row.component';
import { CartItemListComponent } from './cart-item-list/cart-item-list.component';
import { CartItemComponent } from './cart-item/cart-item.component';
import { OrderSummaryComponent } from './order-summary/order-summary.component';

@NgModule({
  imports: [
    AtMessageModule,
    CartCouponModule,
    CartItemValidationWarningModule,
    CommonModule,
    I18nModule,
    IconModule,
    ItemCounterModule,
    MediaModule,
    OutletModule,
    PromotionsModule,
    ReactiveFormsModule,
    RouterModule,
    UrlModule,
    AddToCartModule,
    FeaturesConfigModule,
  ],
  providers: [
    provideOutlet({
      id: CartOutlets.ORDER_SUMMARY,
      component: OrderSummaryComponent,
    }),
    provideOutlet({
      id: CartOutlets.CART_ITEM_LIST,
      component: CartItemListComponent,
    }),
  ],
  declarations: [
    CartItemComponent,
    OrderSummaryComponent,
    CartItemListComponent,
    CartItemListRowComponent,
  ],
  exports: [
    CartItemComponent,
    CartItemListRowComponent,
    CartItemListComponent,
    OrderSummaryComponent,
  ],
})
export class CartSharedModule {}
