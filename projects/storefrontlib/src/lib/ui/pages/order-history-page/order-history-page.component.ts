import { Observable } from 'rxjs';
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

  orders$: Observable<any>;
  private ORDER_PER_PAGE = 1;
  private user_id: string;

  ngOnInit() {
    this.usersStore
      .select(fromUserStore.getUserToken)
      .pipe(
        tap(data => {
          this.user_id = data.userId;
          this.orders$ = this.service.getUserOrders(
            this.user_id,
            this.ORDER_PER_PAGE
          );
        })
      )
      .subscribe();

    this.orders$.subscribe(data => console.log(data));
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

  viewPage(pageNumber: number) {
    this.orders$ = this.service.getUserOrders(
      this.user_id,
      this.ORDER_PER_PAGE,
      pageNumber
    );
  }
}
