import { Injectable } from '@angular/core';
import { combineLatest, Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import {
  AuthService,
  Order,
  RoutingService,
  UserService
} from '@spartacus/core';

@Injectable()
export class OrderDetailsService {
  userId$: Observable<string>;
  orderCode$: Observable<string>;
  subscription: Subscription;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private routingService: RoutingService
  ) {
    this.userId$ = this.authService
      .getUserToken()
      .pipe(map(userData => userData.userId));

    this.orderCode$ = this.routingService
      .getRouterState()
      .pipe(map(routingData => routingData.state.params.orderCode));

    combineLatest(this.userId$, this.orderCode$).subscribe(
      ([userId, orderCode]) => {
        if (userId && orderCode) {
          this.userService.loadOrderDetails(userId, orderCode);
        }
      }
    );
  }

  getOrderDetails(): Observable<Order> {
    return this.userService.getOrderDetails();
  }
}
