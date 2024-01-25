/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { OrderEntry } from '@spartacus/cart/base/root';
import { Order, Consignment, ReplenishmentOrder } from '@spartacus/order/root';
import {
  completedValues,
  cancelledValues,
} from './order-detail-items/order-consigned-entries/order-consigned-entries.model';

@Injectable({
  providedIn: 'root',
})
export class MyAccountV2OrderConsignmentsService {
  getGroupedConsignments(
    order: Order,
    pickup: boolean
  ): Consignment[] | undefined {
    const consignments = pickup
      ? order.consignments?.filter(
          (consignment) => consignment.deliveryPointOfService !== undefined
        )
      : order.consignments?.filter(
          (consignment) => consignment.deliveryPointOfService === undefined
        );

    return this.groupConsignments(consignments);
  }

  getUnconsignedEntries(
    order: Order,
    pickup: boolean
  ): OrderEntry[] | undefined {
    if ((order as ReplenishmentOrder).replenishmentOrderCode) {
      return [];
    }
    return pickup
      ? order.unconsignedEntries?.filter(
          (entry) => entry.deliveryPointOfService !== undefined
        )
      : order.unconsignedEntries?.filter(
          (entry) => entry.deliveryPointOfService === undefined
        );
  }

  protected groupConsignments(
    consignments: Consignment[] | undefined
  ): Consignment[] | undefined {
    const grouped = consignments?.reduce((result, current) => {
      const key = this.getStatusGroupKey(current.status || '');
      result[key] = result[key] || [];
      result[key].push(current);
      return result;
    }, {} as { [key: string]: Consignment[] });

    return grouped
      ? [...(grouped[1] || []), ...(grouped[0] || []), ...(grouped[-1] || [])]
      : undefined;
  }

  /**
   * complete: 0
   * processing: 1
   * cancel: -1
   */
  protected getStatusGroupKey(status: string): number {
    if (completedValues.includes(status)) {
      return 0;
    }
    if (cancelledValues.includes(status)) {
      return -1;
    }
    return 1;
  }
}
