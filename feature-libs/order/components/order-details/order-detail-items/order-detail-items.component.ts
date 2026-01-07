/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { AsyncPipe, CommonModule, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AbstractOrderContextDirective } from '@spartacus/cart/base/components';
import { AddToCartComponent } from '@spartacus/cart/base/components/add-to-cart';
import {
  AbstractOrderType,
  CartOutlets,
  OrderEntry,
  PromotionLocation,
} from '@spartacus/cart/base/root';
import { CmsOrderDetailItemsComponent, TranslatePipe } from '@spartacus/core';
import { Consignment, Order, OrderOutlets } from '@spartacus/order/root';
import {
  CmsComponentData,
  OutletDirective,
  PromotionsComponent,
} from '@spartacus/storefront';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { MyAccountV2OrderConsignmentsService } from '../my-account-v2-order-consignments.service';
import { OrderDetailsService } from '../order-details.service';
import { OrderConsignedEntriesComponent } from './order-consigned-entries/order-consigned-entries.component';

@Component({
  selector: 'cx-order-details-items',
  templateUrl: './order-detail-items.component.html',
  imports: [
    NgIf,
    PromotionsComponent,
    OrderConsignedEntriesComponent,
    OutletDirective,
    AbstractOrderContextDirective,
    AddToCartComponent,
    AsyncPipe,
    TranslatePipe,
    CommonModule,
  ],
})
export class OrderDetailItemsComponent {
  protected orderConsignmentsService = inject(
    MyAccountV2OrderConsignmentsService
  );
  readonly OrderOutlets = OrderOutlets;
  readonly CartOutlets = CartOutlets;
  readonly abstractOrderType = AbstractOrderType;

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
