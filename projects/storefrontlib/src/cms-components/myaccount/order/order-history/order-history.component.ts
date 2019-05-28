import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  Order,
  OrderHistoryList,
  RoutingService,
  TranslationService,
  UserService,
} from '@spartacus/core';
import { combineLatest, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'cx-order-history',
  templateUrl: './order-history.component.html',
})
export class OrderHistoryComponent implements OnInit, OnDestroy {
  constructor(
    private routing: RoutingService,
    private userService: UserService,
    private translation: TranslationService
  ) {}

  orders$: Observable<OrderHistoryList>;
  isLoaded$: Observable<boolean>;

  private PAGE_SIZE = 5;

  sortType: string;

  ngOnInit(): void {
    this.orders$ = this.userService.getOrderHistoryList(this.PAGE_SIZE).pipe(
      tap((orders: OrderHistoryList) => {
        if (orders.pagination) {
          this.sortType = orders.pagination.sort;
        }
      })
    );

    this.isLoaded$ = this.userService.getOrderHistoryListLoaded();
  }

  ngOnDestroy(): void {
    this.userService.clearOrderList();
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
    this.userService.loadOrderList(
      this.PAGE_SIZE,
      event.currentPage,
      event.sortCode
    );
  }
}
