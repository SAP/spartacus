import { Injectable } from '@angular/core';
import { combineLatest, Observable, ReplaySubject } from 'rxjs';
import { map, multicast, refCount, switchMap, tap } from 'rxjs/operators';

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
  orderLoad$: Observable<string[]>;

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
        }
      }),
      // TODO: Replace next two lines with shareReplay(1, undefined, true) when RxJS 6.4 will be in use
      multicast(() => new ReplaySubject(1)),
      refCount()
    );
  }

  getOrderDetails(): Observable<Order> {
    return this.orderLoad$.pipe(
      switchMap(() => this.userService.getOrderDetails())
    );
  }
}
