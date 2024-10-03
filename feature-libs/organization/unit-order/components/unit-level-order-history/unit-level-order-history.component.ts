/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { RoutingService, TranslationService } from '@spartacus/core';
import { Order, OrderHistoryList } from '@spartacus/order/root';
import { OrderHistoryQueryParams } from '@spartacus/organization/unit-order/core';
import { combineLatest, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { UnitOrderFacade } from '@spartacus/organization/unit-order/root';

@Component({
  selector: 'cx-unit-level-order-history',
  templateUrl: './unit-level-order-history.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UnitLevelOrderHistoryComponent implements OnDestroy {
  private PAGE_SIZE = 5;
  sortType: string;

  // Contains the initial query parameters and will be updated with current state of filters
  queryParams: OrderHistoryQueryParams = {
    currentPage: 0,
    sortCode: '',
    filters: '',
  };

  constructor(
    protected routing: RoutingService,
    protected unitOrdersFacade: UnitOrderFacade,
    protected translation: TranslationService
  ) {}

  orders$: Observable<OrderHistoryList | undefined> = this.unitOrdersFacade
    .getOrderHistoryList(this.PAGE_SIZE)
    .pipe(
      tap((orders: OrderHistoryList | undefined) => {
        if (orders?.pagination?.sort) {
          this.sortType = orders.pagination.sort;
          this.queryParams.sortCode = this.sortType;
        }
      })
    );

  isLoaded$: Observable<boolean> =
    this.unitOrdersFacade.getOrderHistoryListLoaded();

  ngOnDestroy(): void {
    this.unitOrdersFacade.clearOrderList();
  }

  filterChange(newFilters: OrderHistoryQueryParams): void {
    this.updateQueryParams({
      ...newFilters,
      currentPage: 0,
    });
    this.fetchOrders(this.queryParams);
  }

  private updateQueryParams(partialParams: OrderHistoryQueryParams) {
    // Overwrite each value present in partialParams to _queryParams
    Object.entries(partialParams).forEach(
      (param) => ((this.queryParams as any)[param[0]] = param[1])
    );
  }

  changeSortCode(sortCode: string): void {
    this.updateQueryParams({
      sortCode: sortCode,
      currentPage: 0,
    });
    this.sortType = sortCode;
    this.fetchOrders(this.queryParams);
  }

  pageChange(page: number): void {
    this.updateQueryParams({
      currentPage: page,
    });
    this.fetchOrders(this.queryParams);
  }

  goToOrderDetail(order: Order): void {
    this.routing.go({
      cxRoute: 'unitLevelOrderDetail',
      params: order,
    });
  }

  getSortLabels(): Observable<{ byDate: string; byOrderNumber: string }> {
    return combineLatest([
      this.translation.translate('sorting.date'),
      this.translation.translate('sorting.orderNumber'),
      this.translation.translate('unitLevelOrderHistorySorting.orgUnit'),
      this.translation.translate('unitLevelOrderHistorySorting.buyer'),
      this.translation.translate('unitLevelOrderHistorySorting.orgUnitDesc'),
      this.translation.translate('unitLevelOrderHistorySorting.buyerDesc'),
    ]).pipe(
      map(
        ([
          textByDate,
          textByOrderNumber,
          textByOrgUnit,
          textByBuyer,
          textByOrgUnitDesc,
          textByBuyerDesc,
        ]) => {
          return {
            byDate: textByDate,
            byOrderNumber: textByOrderNumber,
            byOrgUnit: textByOrgUnit,
            byBuyer: textByBuyer,
            byOrgUnitDesc: textByOrgUnitDesc,
            byBuyerDesc: textByBuyerDesc,
          };
        }
      )
    );
  }

  private fetchOrders(queryParam: OrderHistoryQueryParams): void {
    this.unitOrdersFacade.loadOrderList(
      this.PAGE_SIZE,
      queryParam.currentPage,
      queryParam.filters,
      queryParam.sortCode
    );
  }
}
