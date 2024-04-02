/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import {
  isNotUndefined,
  RoutingService,
  TranslationService,
} from '@spartacus/core';
import {
  Order,
  OrderHistoryFacade,
  OrderHistoryList,
  ReplenishmentOrderHistoryFacade,
} from '@spartacus/order/root';
import { combineLatest, Observable } from 'rxjs';
import { filter, map, take, tap } from 'rxjs/operators';

@Component({
  selector: 'cx-order-history',
  templateUrl: './order-history.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderHistoryComponent implements OnDestroy {
  constructor(
    protected routing: RoutingService,
    protected orderHistoryFacade: OrderHistoryFacade,
    protected translation: TranslationService,
    protected replenishmentOrderHistoryFacade: ReplenishmentOrderHistoryFacade
  ) {}

  private PAGE_SIZE = 5;
  sortType: string;
  hasPONumber: boolean | undefined;

  orders$: Observable<OrderHistoryList | undefined> = this.orderHistoryFacade
    .getOrderHistoryList(this.PAGE_SIZE)
    .pipe(
      tap((orders: OrderHistoryList | undefined) => {
        this.setOrderHistoryParams(orders);
      })
    );

  setOrderHistoryParams(orders: OrderHistoryList | undefined) {
    if (orders?.pagination?.sort) {
      this.sortType = orders.pagination.sort;
    }
    this.hasPONumber = orders?.orders?.[0]?.purchaseOrderNumber !== undefined;
  }

  hasReplenishmentOrder$: Observable<boolean> =
    this.replenishmentOrderHistoryFacade
      .getReplenishmentOrderDetails()
      .pipe(map((order) => order && Object.keys(order).length !== 0));

  isLoaded$: Observable<boolean> =
    this.orderHistoryFacade.getOrderHistoryListLoaded();

  /**
   * When "Order Return" feature is enabled, this component becomes one tab in
   * TabParagraphContainerComponent. This can be read from TabParagraphContainer.
   */
  tabTitleParam$: Observable<number> = this.orders$.pipe(
    map((order) => order?.pagination?.totalResults),
    filter(isNotUndefined),
    take(1)
  );

  ngOnDestroy(): void {
    this.orderHistoryFacade.clearOrderList();
  }

  changeSortCode(sortCode: string): void {
    const event: { sortCode: string; currentPage: number } = {
      sortCode,
      currentPage: 0,
    };
    this.sortType = sortCode;
    this.fetchOrders(event);
  }

  pageChange(page: number): void {
    const event: { sortCode: string; currentPage: number } = {
      sortCode: this.sortType,
      currentPage: page,
    };
    this.fetchOrders(event);
  }

  goToOrderDetail(order: Order): void {
    this.routing.go({
      cxRoute: 'orderDetails',
      params: order,
    });
  }

  getSortLabels(): Observable<{ byDate: string; byOrderNumber: string }> {
    return combineLatest([
      this.translation.translate('sorting.date'),
      this.translation.translate('sorting.orderNumber'),
    ]).pipe(
      map(([textByDate, textByOrderNumber]) => {
        return {
          byDate: textByDate,
          byOrderNumber: textByOrderNumber,
        };
      })
    );
  }

  private fetchOrders(event: { sortCode: string; currentPage: number }): void {
    this.orderHistoryFacade.loadOrderList(
      this.PAGE_SIZE,
      event.currentPage,
      event.sortCode
    );
  }
}
