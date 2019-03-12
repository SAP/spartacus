import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  RoutingService,
  Order,
  AuthService,
  UserService
} from '@spartacus/core';

import { Observable, Subscription, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'cx-order-details-totals',
  templateUrl: './order-detail-totals.component.html',
  styleUrls: ['./order-detail-totals.component.scss']
})
export class OrderDetailTotalsComponent implements OnInit, OnDestroy {
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private routingService: RoutingService
  ) {}

  order$: Observable<Order>;
  subscription: Subscription;

  ngOnInit() {
    const userId$: Observable<string> = this.authService
      .getUserToken()
      .pipe(map(userData => userData.userId));

    const orderCode$: Observable<
      string
    > = this.routingService
      .getRouterState()
      .pipe(map(routingData => routingData.state.params.orderCode));

    this.subscription = combineLatest(userId$, orderCode$).subscribe(
      ([userId, orderCode]) => {
        if (userId && orderCode) {
          this.userService.loadOrderDetails(userId, orderCode);
        }
      }
    );

    this.order$ = this.userService.getOrderDetails();
  }

  ngOnDestroy() {
    this.userService.clearOrderDetails();

    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
