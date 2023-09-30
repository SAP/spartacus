/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  Component,
  ChangeDetectionStrategy,
  Input,
  inject,
} from '@angular/core';
import { OrderEntry } from '@spartacus/cart/base/root';
import { Images } from '@spartacus/core';
import { Consignment, Order, OrderHistory } from '@spartacus/order/root';
import { OrderDetailsService } from '../../../order-details';

@Component({
  selector: 'cx-order-consolidated-information',
  templateUrl: './order-consolidated-information.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderConsolidatedInformationComponent {
  protected orderDetailsService = inject(OrderDetailsService);
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
    let criticalStatus = ['cancelled', 'error', 'Error', 'rejected'];
    if (criticalStatus.includes(status)) {
      return true;
    } else {
      return false;
    }
  }
  getPickupConsignments(consignments: Consignment[]): Consignment[] {
    let orderDetail: Order = {};
    orderDetail.consignments = consignments;
    return (
      this.orderDetailsService.getGroupedConsignments(orderDetail, true) ?? []
    );
  }
  getDeliveryConsignments(consignments: Consignment[]): Consignment[] {
    let orderDetail: Order = {};
    orderDetail.consignments = consignments;
    return (
      this.orderDetailsService.getGroupedConsignments(orderDetail, false) ?? []
    );
  }
  getDeliveryUnconsignedEntries(
    unconsignedEntries: OrderEntry[]
  ): OrderEntry[] {
    let orderDetail: Order = {};
    orderDetail.unconsignedEntries = unconsignedEntries;
    return (
      this.orderDetailsService.getUnconsignedEntries(orderDetail, false) ?? []
    );
  }
  getPickupUnconsignedEntries(unconsignedEntries: OrderEntry[]): OrderEntry[] {
    let orderDetail: Order = {};
    orderDetail.unconsignedEntries = unconsignedEntries;
    return (
      this.orderDetailsService.getUnconsignedEntries(orderDetail, true) ?? []
    );
  }
  getProductImages(entries: OrderEntry[]): Images[] {
    let images: Images[] = [];
    let index = 0;
    for (let item of entries) {
      if (item.product?.images) {
        if (index >= this.imageCount) {
          break;
        }
        index++;
        images.push(item.product?.images);
      }
    }
    return images;
  }
}
