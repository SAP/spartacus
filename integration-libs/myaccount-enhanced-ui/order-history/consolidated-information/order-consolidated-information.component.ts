/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { OrderEntry } from '@spartacus/cart/base/root';
import { Consignment, OrderHistory } from '@spartacus/order/root';

@Component({
  selector: 'cx-order-consolidated-information',
  templateUrl: './order-consolidated-information.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderConsolidatedInformationComponent {
  @Input()
  order?: OrderHistory;
  constructor() {}
  consignmentsCount(consignments: Consignment[] | undefined): number {
    var count = 0;
    if (consignments) {
      for (let consignment of consignments) {
        if (consignment.entries) {
          count = count + consignment.entries.length;
        }
      }
    }
    return count;
  }
  orderEntriesCount(orderEntries: OrderEntry[] | undefined): number {
    var count = 0;
    if (orderEntries) {
      return orderEntries.length;
    }
    return count;
  }
}
