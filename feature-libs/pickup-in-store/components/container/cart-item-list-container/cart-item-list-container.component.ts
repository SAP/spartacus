/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Component, OnInit } from '@angular/core';
import { CartItemListComponent } from '@spartacus/cart/base/components';

@Component({
  selector: 'cx-item-list-container',
  templateUrl: 'cart-item-list-container.component.html',
})
export class CartItemListContainerComponent
  extends CartItemListComponent
  implements OnInit
{
  ngOnInit(): void {
    console.log('cart items', this.items);
  }
}
