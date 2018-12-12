import { Component, OnInit, OnDestroy } from '@angular/core';

import {
  RoutingService,
  Order,
  OrderHistoryList,
  AuthService
} from '@spartacus/core';

import { Observable, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';

import { UserService } from '../../../user/facade/user.service';

@Component({
  selector: 'cx-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.scss']
})
export class OrderHistoryComponent implements OnInit, OnDestroy {
  constructor(
    private auth: AuthService,
    private routing: RoutingService,
    private userSerivce: UserService
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

    this.orders$ = this.userSerivce.getOrderHistoryList().pipe(
      tap((orders: any) => {
        if (
          orders.orders &&
          Object.keys(orders.orders).length === 0 &&
          this.user_id
        ) {
          this.userSerivce.loadOrderList(this.user_id, this.PAGE_SIZE);
        }
        if (orders.pagination) {
          this.sortType = orders.pagination.sort;
        }
      })
    );

    this.isLoaded$ = this.userSerivce.getOrderHistoryListLoaded();
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
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
    this.userSerivce.loadOrderList(
      this.user_id,
      this.PAGE_SIZE,
      event.currentPage,
      event.sortCode
    );
  }
}
