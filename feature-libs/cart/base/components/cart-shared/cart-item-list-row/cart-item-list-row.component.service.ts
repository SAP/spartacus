/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { OrderEntry } from '@spartacus/cart/base/root';

@Injectable({
  providedIn: 'root',
})
export class CartItemListComponentService {
  showBasePriceWithDiscount() {
    return true;
  }

  displayItemPriceColumn(items: OrderEntry[]): boolean {
    return items.some((item) => item.product?.productTypes === 'SUBSCRIPTION');
  }
}
