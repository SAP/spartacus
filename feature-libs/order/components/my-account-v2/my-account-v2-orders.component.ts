/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, inject, OnDestroy } from '@angular/core';
import { Product } from '@spartacus/core';
import { MyAccountV2OrderHistoryService } from '@spartacus/order/core';
import { Order, OrderHistoryListView } from '@spartacus/order/root';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'cx-my-account-v2-orders',
  templateUrl: './my-account-v2-orders.component.html',
})
export class MyAccountV2OrdersComponent implements OnDestroy {
  protected service = inject(MyAccountV2OrderHistoryService);
  protected PAGE_SIZE = 3;
  orders$: Observable<OrderHistoryListView | undefined> = this.service
    .getOrderHistoryList(this.PAGE_SIZE)
    .pipe(tap(() => this.isLoaded$.next(true)));
  isLoaded$ = new BehaviorSubject<boolean>(false);
  getProduct(order: Order): Product | undefined {
    if (order.entries) {
      for (const entry of order.entries) {
        if (entry.product && entry.product.name && entry.product.images) {
          return entry.product;
        }
      }
      return order.entries[0].product;
    }
  }
  ngOnDestroy(): void {
    this.isLoaded$.next(false);
    this.service.clearOrderList();
  }
}
