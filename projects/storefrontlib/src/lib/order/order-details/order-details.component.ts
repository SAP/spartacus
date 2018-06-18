import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import * as fromUserStore from '../../user/store';
import { OccOrderService } from './../../occ/order/order.service';

@Component({
  selector: 'y-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {
  constructor(
    private service: OccOrderService,
    private usersStore: Store<fromUserStore.UserState>,
    private route: ActivatedRoute
  ) {}

  order$: Observable<any>;

  ngOnInit() {
    this.usersStore
      .select(fromUserStore.getUserToken)
      .pipe(
        tap(userData => {
          this.order$ = this.service.getOrder(
            userData.userId,
            this.route.snapshot.params['orderCode']
          );
        })
      )
      .subscribe();
  }
}
