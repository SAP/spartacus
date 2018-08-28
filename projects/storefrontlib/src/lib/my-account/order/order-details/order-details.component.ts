import { ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import * as fromUserStore from '../../../user/store';
import * as fromAuthStore from './../../../auth/store';
import { OccOrderService } from './../../../occ/order/order.service';

@Component({
  selector: 'y-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit, OnDestroy {
  private subscription: Subscription;

  constructor(
    private service: OccOrderService,
    private usersStore: Store<fromUserStore.UserState>,
    private route: ActivatedRoute
  ) {}

  order$: Observable<any>;

  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      if (params['orderCode']) {
        this.subscription = this.usersStore
          .select(fromAuthStore.getUserToken)
          .pipe(
            tap(userData => {
              this.order$ = this.service.getOrder(
                userData.userId,
                params['orderCode']
              );
            })
          )
          .subscribe();
        return;
      }
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
