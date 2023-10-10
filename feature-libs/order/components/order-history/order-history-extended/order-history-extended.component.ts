/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, inject } from '@angular/core';
import { OrderHistoryExtendedViewService } from '@spartacus/order/core';
import { OrderHistoryListView } from '@spartacus/order/root';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { OrderHistoryComponent } from '../order-history.component';

@Component({
  selector: 'cx-order-history-extended',
  templateUrl: './order-history-extended.component.html',
})
export class OrderHistoryExtendedComponent extends OrderHistoryComponent {
  protected service = inject(OrderHistoryExtendedViewService);
  protected ITEMS_PER_PAGE = 5;
  isLoaded$ = new BehaviorSubject<boolean>(false);
  orders$: Observable<OrderHistoryListView | undefined> = this.service
    .getOrderHistoryList(this.ITEMS_PER_PAGE)
    .pipe(
      tap((orders: OrderHistoryListView | undefined) => {
        this.isLoaded$.next(true);
        if (orders?.pagination?.sort) {
          this.sortType = orders.pagination.sort;
        }
        this.hasPONumber =
          orders?.orders?.[0]?.purchaseOrderNumber !== undefined;
      })
    );
  pageChange(page: number): void {
    this.isLoaded$.next(false);
    this.service.clearOrderList();
    super.pageChange(page);
  }
}
