import { Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { OccOrderService } from './../../../occ/order/order.service';
import { Component, OnInit } from '@angular/core';
import * as fromUserStore from '../../../user/store';
import { Store } from '@ngrx/store';

@Component({
  selector: 'y-order-history-page',
  templateUrl: './order-history-page.component.html',
  styleUrls: ['./order-history-page.component.scss']
})
export class OrderHistoryPageComponent implements OnInit {
  constructor(
    private service: OccOrderService,
    private usersStore: Store<fromUserStore.UserState>
  ) {}

  orders$ = new Subject<any>();
  private ORDER_PER_PAGE = 5;
  private user_id: string;

  ngOnInit() {
    this.usersStore
      .select(fromUserStore.getUserToken)
      .pipe(
        tap(userData => {
          this.user_id = userData.userId;
          this.service
            .getUserOrders(this.user_id, this.ORDER_PER_PAGE)
            .subscribe(orders => {
              this.orders$.next(orders);
            });
        })
      )
      .subscribe();
  }

  viewPage(event: { sortCode: string; currentPage: number }) {
    this.fetchOrders(event);
  }

  sortOrder(event: { sortCode: string; currentPage: number }) {
    this.fetchOrders(event);
  }

  private fetchOrders(event: { sortCode: string; currentPage: number }) {
    this.service
      .getUserOrders(
        this.user_id,
        this.ORDER_PER_PAGE,
        event.currentPage,
        event.sortCode
      )
      .subscribe(orders => this.orders$.next(orders));
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
