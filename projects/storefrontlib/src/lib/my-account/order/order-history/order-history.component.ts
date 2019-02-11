import { Component, OnInit, OnDestroy } from '@angular/core';

import {
  AuthService,
  RoutingService,
  UserService,
  OrderHistoryList,
  Order
} from '@spartacus/core';

import { Observable, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'cx-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.scss']
})
export class OrderHistoryComponent implements OnInit, OnDestroy {
  constructor(
    private auth: AuthService,
    private routing: RoutingService,
    private userService: UserService
  ) {}

  orders$: Observable<OrderHistoryList>;
  isLoaded$: Observable<boolean>;
  subscription: Subscription;

  private user_id: string;
  private PAGE_SIZE = 5;

  sortType: string;
  sortLabels = {
    byDate: 'Date',
    byOrderNumber: 'Order Number'
  };

  ngOnInit() {
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

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    this.userService.clearOrderList();
  }

  changeSortCode(sortCode: string): void {
    const event: { sortCode: string; currentPage: number } = {
      sortCode,
      currentPage: 0
    };
    this.sortType = sortCode;
    this.fetchOrders(event);
  }

  pageChange(page: number): void {
    const event: { sortCode: string; currentPage: number } = {
      sortCode: this.sortType,
      currentPage: page
    };
    this.fetchOrders(event);
  }

  goToOrderDetail(order: Order): void {
    this.routing.go({
      route: [{ name: 'orderDetails', params: order }]
    });
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
