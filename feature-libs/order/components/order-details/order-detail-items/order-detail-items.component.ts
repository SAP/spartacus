/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, inject } from '@angular/core';
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
import { MyAccountV2OrderConsignmentsService } from '../my-account-v2-order-consignments.service';
import { OrderDetailsService } from '../order-details.service';

@Component({
  selector: 'cx-order-details-items',
  templateUrl: './order-detail-items.component.html',
})
export class OrderDetailItemsComponent {
  protected orderConsignmentsService = inject(
    MyAccountV2OrderConsignmentsService
  );
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
    return this.orderConsignmentsService.getGroupedConsignments(order, pickup);
  }

  protected getUnconsignedEntries(
    order: Order,
    pickup: boolean
  ): OrderEntry[] | undefined {
    return this.orderConsignmentsService.getUnconsignedEntries(order, pickup);
  }
}
