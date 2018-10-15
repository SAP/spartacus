import { Observable, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Component, OnInit, OnDestroy } from '@angular/core';
import * as fromUserStore from '../../../user/store';
import { Store, select } from '@ngrx/store';
import { AuthService } from '../../../auth/facade/auth.service';
import { RoutingService } from '../../../routing/facade/routing.service';

@Component({
  selector: 'y-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.scss']
})
export class OrderHistoryComponent implements OnInit, OnDestroy {
  constructor(
    private auth: AuthService,
    private routing: RoutingService,
    private store: Store<fromUserStore.UserState>
  ) {}

  orders$: Observable<any>;
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
    this.subscription = this.auth.userToken$.subscribe(userData => {
      if (userData && userData.userId) {
        this.user_id = userData.userId;
      }
    });

    this.orders$ = this.store.pipe(
      select(fromUserStore.getOrders),
      tap((orders: any) => {
        if (
          orders.orders &&
          Object.keys(orders.orders).length === 0 &&
          this.user_id
        ) {
          this.store.dispatch(
            new fromUserStore.LoadUserOrders({
              userId: this.user_id,
              pageSize: this.PAGE_SIZE
            })
          );
        }
        if (orders.pagination) {
          this.sortType = orders.pagination.sort;
        }
      })
    );

    this.isLoaded$ = this.store.pipe(select(fromUserStore.getOrdersLoaded));
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  changeSortCode(sortCode: string) {
    const event = {
      sortCode,
      currentPage: 0
    };
    this.sortType = sortCode;
    this.fetchOrders(event);
  }

  pageChange(page: number) {
    const event = {
      sortCode: this.sortType,
      currentPage: page
    };
    this.fetchOrders(event);
  }

  goToOrderDetail(order) {
    this.routing.go(['my-account/orders/', order.code]);
  }

  private fetchOrders(event: { sortCode: string; currentPage: number }) {
    this.store.dispatch(
      new fromUserStore.LoadUserOrders({
        userId: this.user_id,
        pageSize: this.PAGE_SIZE,
        currentPage: event.currentPage,
        sort: event.sortCode
      })
    );
  }
}
