/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, OnInit } from '@angular/core';
import { CartOutlets, PromotionLocation } from '@spartacus/cart/base/root';
import { CmsOrderDetailItemsComponent } from '@spartacus/core';
import { Consignment, Order } from '@spartacus/order/root';
import { CmsComponentData } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { OrderDetailsService } from '../order-details.service';
import {
  cancelledValues,
  completedValues,
} from './order-consigned-entries/order-consigned-entries.model';

@Component({
  selector: 'cx-order-details-items',
  templateUrl: './order-detail-items.component.html',
})
export class OrderDetailItemsComponent implements OnInit {
  constructor(
    protected orderDetailsService: OrderDetailsService,
    protected component: CmsComponentData<CmsOrderDetailItemsComponent>
  ) {}

  readonly CartOutlets = CartOutlets;

  promotionLocation: PromotionLocation = PromotionLocation.Order;
  order$: Observable<Order> = this.orderDetailsService.getOrderDetails();
  consignments$: Observable<Consignment[] | undefined>;

  enableAddToCart$: Observable<boolean | undefined> = this.component.data$.pipe(
    map((data) => data.enableAddToCart)
  );

  ngOnInit() {
    this.consignments$ = this.order$.pipe(
      map((order) => {
        const grouped = order.consignments?.reduce((result, current) => {
          const key = this.getStatusGroupKey(current.status || '');
          result[key] = result[key] || [];
          result[key].push(current);
          return result;
        }, {} as { [key: string]: Consignment[] });

        return grouped
          ? [
              ...(grouped[1] || []),
              ...(grouped[0] || []),
              ...(grouped[-1] || []),
            ]
          : undefined;
      })
    );
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
