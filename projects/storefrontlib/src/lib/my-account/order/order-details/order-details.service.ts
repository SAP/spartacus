import { Injectable } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { map, shareReplay, switchMap, tap } from 'rxjs/operators';

import {
  AuthService,
  Order,
  RoutingService,
  UserService,
} from '@spartacus/core';

@Injectable()
export class OrderDetailsService {
  userId$: Observable<string>;
  orderCode$: Observable<string>;
  orderLoad$: Observable<{}>;

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

    this.orderLoad$ = combineLatest(this.userId$, this.orderCode$).pipe(
      tap(([userId, orderCode]) => {
        if (userId && orderCode) {
          this.userService.loadOrderDetails(userId, orderCode);
        } else {
          this.userService.clearOrderDetails();
        }
      }),
      shareReplay({ bufferSize: 1, refCount: true })
    );
  }

  getOrderDetails(): Observable<Order> {
    return this.orderLoad$.pipe(
      switchMap(() => this.userService.getOrderDetails())
    );
  }
}
