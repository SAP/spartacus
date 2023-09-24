/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { OrderEntry } from '@spartacus/cart/base/root';
import { Consignment, OrderHistory } from '../../../../root/model';

@Component({
  selector: 'cx-order-consolidated-information',
  templateUrl: './order-consolidated-information.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderConsolidatedInformationComponent {
  @Input()
  order?: OrderHistory;
  imageCount = 4; //showing fixed no.of images, without using carousel

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

  isStatusCritical(status: string): boolean {
    let criticalStatus = ['cancelled', 'rejected'];
    if (criticalStatus.includes(status)) {
      return true;
    } else {
      return false;
    }
  }
}
