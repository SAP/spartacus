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
import { Consignment, Order, OrderOutlets } from '@spartacus/order/root';
import { CmsComponentData } from '@spartacus/storefront';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { OrderDetailsService } from '../order-details.service';

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
      this.pickupConsignments = this.orderDetailsService.getGroupedConsignments(
        order,
        true
      );
      this.deliveryConsignments =
        this.orderDetailsService.getGroupedConsignments(order, false);
      this.pickupUnconsignedEntries =
        this.orderDetailsService.getUnconsignedEntries(order, true);
      this.deliveryUnConsignedEntries =
        this.orderDetailsService.getUnconsignedEntries(order, false);
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
}
