/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, inject } from '@angular/core';
import { CartItemContext } from '@spartacus/cart/base/root';
import { useFeatureStyles } from '@spartacus/core';
import { CartItemComponent } from '../cart-item/cart-item.component';
import { CartItemContextSource } from '../cart-item/model/cart-item-context-source.model';
import { CartItemListComponentService } from './cart-item-list-row.component.service';

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
  isFlagQuote = this.componentService.showBasePriceWithDiscount();
  constructor(cartItemContextSource: CartItemContextSource) {
    super(cartItemContextSource);
    useFeatureStyles('a11yQTY2Quantity');
  }
}
