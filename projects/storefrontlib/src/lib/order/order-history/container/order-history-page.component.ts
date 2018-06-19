import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import * as fromUserStore from '../../../user/store';
import { Store } from '@ngrx/store';

@Component({
  selector: 'y-order-history-page',
  templateUrl: './order-history-page.component.html',
  styleUrls: ['./order-history-page.component.scss']
})
export class OrderHistoryPageComponent implements OnInit {
  constructor(private userStore: Store<fromUserStore.UserState>) {}

  orders$: Observable<any>;
  private ORDER_PER_PAGE = 5;
  private user_id: string;

  ngOnInit() {
    this.userStore
      .select(fromUserStore.getUserToken)
      .pipe(
        tap(userData => {
          this.user_id = userData.userId;
          this.userStore.dispatch(
            new fromUserStore.LoadUserOrders({
              userId: this.user_id,
              pageSize: this.ORDER_PER_PAGE
            })
          );
        })
      )
      .subscribe();

    this.orders$ = this.userStore.select(fromUserStore.getOrders);
  }

  viewPage(event: { sortCode: string; currentPage: number }) {
    this.fetchOrders(event);
  }

  sortOrder(event: { sortCode: string; currentPage: number }) {
    this.fetchOrders(event);
  }

  private fetchOrders(event: { sortCode: string; currentPage: number }) {
    this.userStore.dispatch(
      new fromUserStore.LoadUserOrders({
        userId: this.user_id,
        pageSize: this.ORDER_PER_PAGE,
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
