import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  RoutingService,
  AuthService,
  UserService
} from '@spartacus/core';

import { Observable, Subscription, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  templateUrl: './order-details-page.component.html',
  providers: [UserService]
})
export class OrderDetailsPageComponent implements OnInit, OnDestroy {
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private routingService: RoutingService
  ) {}

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
  }

  ngOnDestroy() {
    this.userService.clearOrderDetails();

    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
