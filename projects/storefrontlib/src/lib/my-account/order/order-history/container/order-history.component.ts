import { Observable, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Component, OnInit, OnDestroy } from '@angular/core';
import * as fromUserStore from '../../../../user/store';
import { Store } from '@ngrx/store';

@Component({
  selector: 'y-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.scss']
})
export class OrderHistoryComponent implements OnInit, OnDestroy {
  constructor(private userStore: Store<fromUserStore.UserState>) {}

  orders$: Observable<any>;
  isLoaded$: Observable<boolean>;
  userDataSubscription: Subscription;
  private PAGE_SIZE = 5;
  private user_id: string;

  ngOnInit() {
    this.userDataSubscription = this.userStore
      .select(fromUserStore.getUserToken)
      .pipe(
        tap(userData => {
          this.user_id = userData.userId;

          this.userStore.dispatch(
            new fromUserStore.LoadUserOrders({
              userId: this.user_id,
              pageSize: this.PAGE_SIZE
            })
          );
        })
      )
      .subscribe();

    this.orders$ = this.userStore.select(fromUserStore.getOrders).pipe(
      tap(orders => {
        if (Object.keys(orders.orders).length === 0) {
          this.userStore.dispatch(
            new fromUserStore.LoadUserOrders({
              userId: this.user_id,
              pageSize: this.PAGE_SIZE
            })
          );
        }
      })
    );

    this.isLoaded$ = this.userStore.select(fromUserStore.getOrdersLoaded);
  }

  ngOnDestroy() {
    if (this.userDataSubscription) {
      this.userDataSubscription.unsubscribe();
    }
  }

  viewPage(event: { sortCode: string; currentPage: number }) {
    this.fetchOrders(event);
  }

  private fetchOrders(event: { sortCode: string; currentPage: number }) {
    this.userStore.dispatch(
      new fromUserStore.LoadUserOrders({
        userId: this.user_id,
        pageSize: this.PAGE_SIZE,
        currentPage: event.currentPage,
        sort: event.sortCode
      })
    );
  }
  createDateString(date: string) {
    const dateObj = new Date(date);
    const local = 'en-US';
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
    return dateObj.toLocaleDateString(local, options);
  }
}
