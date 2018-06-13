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

  ngOnInit() {
    this.usersStore
      .select(fromUserStore.getUserToken)
      .pipe(
        tap(data => {
          this.orders$ = this.service.getListOfOrders(data.userId);
        })
      )
      .subscribe();

    this.orders$.subscribe(data => console.log(data));
  }
}
