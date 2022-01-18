import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import {
  isNotUndefined,
  Order,
  OrderHistoryList,
  RoutingService,
  TranslationService,
} from '@spartacus/core';
import { OrderFacade, ReplenishmentOrderFacade } from '@spartacus/order/root';
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
    protected userOrderService: OrderFacade,
    protected translation: TranslationService,
    protected userReplenishmentOrderService: ReplenishmentOrderFacade
  ) {}

  private PAGE_SIZE = 5;
  sortType: string;

  orders$: Observable<OrderHistoryList | undefined> = this.userOrderService
    .getOrderHistoryList(this.PAGE_SIZE)
    .pipe(
      tap((orders: OrderHistoryList | undefined) => {
        if (orders?.pagination?.sort) {
          this.sortType = orders.pagination.sort;
        }
      })
    );

  hasReplenishmentOrder$: Observable<boolean> =
    this.userReplenishmentOrderService
      .getReplenishmentOrderDetails()
      .pipe(map((order) => order && Object.keys(order).length !== 0));

  isLoaded$: Observable<boolean> =
    this.userOrderService.getOrderHistoryListLoaded();

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
    this.userOrderService.clearOrderList();
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
    this.userOrderService.loadOrderList(
      this.PAGE_SIZE,
      event.currentPage,
      event.sortCode
    );
  }
}
