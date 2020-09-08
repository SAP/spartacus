import { Component, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import {
  Order,
  OrderHistoryList,
  RoutingService,
  TranslationService,
  UserOrderService,
  UserReplenishmentOrderService,
  ReplenishmentOrderList,
} from '@spartacus/core';
import { combineLatest, Observable } from 'rxjs';
import { map, tap, filter, take } from 'rxjs/operators';

@Component({
  selector: 'cx-order-history',
  templateUrl: './order-history.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderHistoryComponent implements OnDestroy {
  constructor(
    private routing: RoutingService,
    private userOrderService: UserOrderService,
    private userReplenishmentOrderService: UserReplenishmentOrderService,
    private translation: TranslationService
  ) {}

  private PAGE_SIZE = 5;
  sortType: string;

  orders$: Observable<
    OrderHistoryList
  > = this.userOrderService.getOrderHistoryList(this.PAGE_SIZE).pipe(
    tap((orders: OrderHistoryList) => {
      if (orders.pagination) {
        this.sortType = orders.pagination.sort;
      }
    })
  );

  replenishmentOrders$: Observable<
    ReplenishmentOrderList
  > = this.userReplenishmentOrderService
    .getReplenishmentOrderHistoryList(this.PAGE_SIZE)
    .pipe(
      tap((replenishmentOrders: ReplenishmentOrderList) => {
        if (replenishmentOrders.pagination) {
          this.sortType = replenishmentOrders.pagination.sort;
        }
      })
    );

  isLoaded$: Observable<
    boolean
  > = this.userOrderService.getOrderHistoryListLoaded();

  /**
   * When "Order Return" feature is enabled, this component becomes one tab in
   * TabParagraphContainerComponent. This can be read from TabParagraphContainer.
   */
  tabTitleParam$: Observable<number> = this.orders$.pipe(
    map((order) => order.pagination.totalResults),
    filter((totalResults) => totalResults !== undefined),
    take(1)
  );

  ngOnDestroy(): void {
    this.userOrderService.clearOrderList();
  }

  changeSortCode(sortCode: string): void {
    const event: { sortCode: string; currentPage: number } = {
      sortCode,
      currentPage: 0,
    };
    this.sortType = sortCode;
    this.fetchOrders(event);
    this.fetchReplenishmentOrders(event);
  }

  pageChange(page: number): void {
    const event: { sortCode: string; currentPage: number } = {
      sortCode: this.sortType,
      currentPage: page,
    };
    this.fetchOrders(event);
    this.fetchReplenishmentOrders(event);
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
    this.userOrderService.loadOrderList(
      this.PAGE_SIZE,
      event.currentPage,
      event.sortCode
    );
  }

  private fetchReplenishmentOrders(event: {
    sortCode: string;
    currentPage: number;
  }): void {
    this.userReplenishmentOrderService.loadReplenishmentOrderList(
      this.PAGE_SIZE,
      event.currentPage,
      event.sortCode
    );
  }
}
