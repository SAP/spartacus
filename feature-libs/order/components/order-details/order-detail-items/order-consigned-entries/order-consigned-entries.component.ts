/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, Input } from '@angular/core';
import {
  CartOutlets,
  OrderEntry,
  PromotionLocation,
} from '@spartacus/cart/base/root';
import { Consignment, Order } from '@spartacus/order/root';

@Component({
  selector: 'cx-order-consigned-entries',
  templateUrl: './order-consigned-entries.component.html',
})
export class OrderConsignedEntriesComponent {
  @Input() consignments: Consignment[];
  @Input() order: Order;
  @Input() enableAddToCart: boolean | undefined;
  @Input() buyItAgainTranslation: string;

  promotionLocation: PromotionLocation = PromotionLocation.Order;

  readonly CartOutlets = CartOutlets;

  getConsignmentProducts(consignment: Consignment): OrderEntry[] {
    const products: OrderEntry[] = [];
    consignment.entries?.forEach((element) => {
      if (element.orderEntry) {
        products.push(element.orderEntry);
      }
    });

    return products;
  }
}
