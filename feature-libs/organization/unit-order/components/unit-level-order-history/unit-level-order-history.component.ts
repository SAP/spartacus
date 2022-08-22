import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { RoutingService, TranslationService } from '@spartacus/core';
import { Order, OrderHistoryList } from '@spartacus/order/root';
import { combineLatest, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { UnitOrderFacade } from '../../root/facade/unit-order.facade';

@Component({
  selector: 'cx-unit-level-order-history',
  templateUrl: './unit-level-order-history.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UnitLevelOrderHistoryComponent implements OnDestroy {
  private PAGE_SIZE = 5;
  sortType: string;

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
        }
      })
    );

  isLoaded$: Observable<boolean> =
    this.unitOrdersFacade.getOrderHistoryListLoaded();

  ngOnDestroy(): void {
    this.unitOrdersFacade.clearOrderList();
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
    this.unitOrdersFacade.loadOrderList(
      this.PAGE_SIZE,
      event.currentPage,
      event.sortCode
    );
  }
}
