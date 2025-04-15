/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, computed, inject, Signal } from '@angular/core';
import { ActiveCartFacade, Cart, CartItemContext } from '@spartacus/cart/base/root';
import { useFeatureStyles } from '@spartacus/core';
import { CartItemComponent } from '../cart-item/cart-item.component';
import { CartItemContextSource } from '../cart-item/model/cart-item-context-source.model';
import { CartItemListComponentService } from './cart-item-list-row.component.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: '[cx-cart-item-list-row], cx-cart-item-list-row',
  templateUrl: './cart-item-list-row.component.html',
  providers: [
    CartItemContextSource,
    { provide: CartItemContext, useExisting: CartItemContextSource },
  ],
  standalone: false,
})
export class CartItemListRowComponent extends CartItemComponent {
  protected componentService = inject(CartItemListComponentService);
  protected activeCart = inject(ActiveCartFacade);
  isFlagQuote = this.componentService.showBasePriceWithDiscount();
  constructor(cartItemContextSource: CartItemContextSource) {
    super(cartItemContextSource);
    useFeatureStyles('a11yQTY2Quantity');
  }
  cart  = toSignal<Cart>(this.activeCart.getActive());
  containsSubscriptions: Signal<boolean> = computed(() => {
    return this.cart()?.entries?.some((entry) => {
      return entry.product?.productTypes === 'SUBSCRIPTION';
    }
    ) ?? false;
  });
}
