/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component } from '@angular/core';
import {
  CartOutlets,
  OrderEntry,
  PromotionLocation,
} from '@spartacus/cart/base/root';
import { CmsOrderDetailItemsComponent } from '@spartacus/core';
import {
  Consignment,
  Order,
  OrderOutlets,
  ReplenishmentOrder,
} from '@spartacus/order/root';
import { CmsComponentData } from '@spartacus/storefront';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { OrderDetailsService } from '../order-details.service';
import {
  cancelledValues,
  completedValues,
} from './order-consigned-entries/order-consigned-entries.model';

@Component({
  selector: 'cx-order-details-items',
  templateUrl: './order-detail-items.component.html',
})
export class OrderDetailItemsComponent {
  readonly OrderOutlets = OrderOutlets;
  readonly CartOutlets = CartOutlets;

  promotionLocation: PromotionLocation = PromotionLocation.Order;

  pickupConsignments: Consignment[] | undefined;
  deliveryConsignments: Consignment[] | undefined;

  pickupUnconsignedEntries: OrderEntry[] | undefined;
  deliveryUnConsignedEntries: OrderEntry[] | undefined;

  order$: Observable<Order> = this.orderDetailsService.getOrderDetails().pipe(
    tap((order) => {
      this.pickupConsignments = this.getGroupedConsignments(order, true);
      this.deliveryConsignments = this.getGroupedConsignments(order, false);

      this.pickupUnconsignedEntries = this.getUnconsignedEntries(order, true);
      this.deliveryUnConsignedEntries = this.getUnconsignedEntries(
        order,
        false
      );
    })
  );

  enableAddToCart$: Observable<boolean | undefined> = this.component.data$.pipe(
    map((data) => data.enableAddToCart)
  );

  isOrderLoading$: Observable<boolean> =
    typeof this.orderDetailsService.isOrderDetailsLoading === 'function'
      ? this.orderDetailsService.isOrderDetailsLoading()
      : of(false);

  groupCartItems$: Observable<boolean | undefined> = this.component.data$.pipe(
    map((data) => data.groupCartItems)
  );

  constructor(
    protected orderDetailsService: OrderDetailsService,
    protected component: CmsComponentData<CmsOrderDetailItemsComponent>
  ) {}

  protected getGroupedConsignments(
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

  protected getUnconsignedEntries(
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
  private getStatusGroupKey(status: string): number {
    if (completedValues.includes(status)) {
      return 0;
    }
    if (cancelledValues.includes(status)) {
      return -1;
    }
    return 1;
  }
}
