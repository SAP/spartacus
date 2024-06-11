/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, OnDestroy, inject } from '@angular/core';
import { CartItemContext } from '@spartacus/cart/base/root';
import { CartItemComponent } from '../cart-item/cart-item.component';
import { CartItemContextSource } from '../cart-item/model/cart-item-context-source.model';
import { Subscription } from 'rxjs';
import { CartItemListComponentService } from './cart-item-list-row.component.service';

@Component({
  selector: '[cx-cart-item-list-row], cx-cart-item-list-row',
  templateUrl: './cart-item-list-row.component.html',
  providers: [
    CartItemContextSource,
    { provide: CartItemContext, useExisting: CartItemContextSource },
  ],
})
export class CartItemListRowComponent
  extends CartItemComponent
  implements OnDestroy
{
  protected componentService = inject(CartItemListComponentService);
  isFlagquote = this.componentService.showBasePriceWithDiscount();
  private subscription: Subscription;
  constructor(cartItemContextSource: CartItemContextSource) {
    super(cartItemContextSource);
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
