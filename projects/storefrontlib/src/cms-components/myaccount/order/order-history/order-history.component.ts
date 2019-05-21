import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AuthService,
  Order,
  OrderHistoryList,
  RoutingService,
  UserService,
  TranslationService,
} from '@spartacus/core';
import { Observable, Subscription, combineLatest } from 'rxjs';
import { tap, map } from 'rxjs/operators';

@Component({
  selector: 'cx-order-history',
  templateUrl: './order-history.component.html',
})
export class OrderHistoryComponent implements OnInit, OnDestroy {
  constructor(
    private auth: AuthService,
    private routing: RoutingService,
    private userService: UserService,
    private translation: TranslationService
  ) {}

  orders$: Observable<OrderHistoryList>;
  isLoaded$: Observable<boolean>;
  subscription: Subscription;

  private user_id: string;
  private PAGE_SIZE = 5;

  sortType: string;

  ngOnInit(): void {
    this.subscription = this.auth.getUserToken().subscribe(userData => {
      if (userData && userData.userId) {
        this.user_id = userData.userId;
      }
    });

    this.orders$ = this.userService
      .getOrderHistoryList(this.user_id, this.PAGE_SIZE)
      .pipe(
        tap((orders: OrderHistoryList) => {
          if (orders.pagination) {
            this.sortType = orders.pagination.sort;
          }
        })
      );

    this.isLoaded$ = this.userService.getOrderHistoryListLoaded();
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
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
      this.user_id,
      this.PAGE_SIZE,
      event.currentPage,
      event.sortCode
    );
  }
}
