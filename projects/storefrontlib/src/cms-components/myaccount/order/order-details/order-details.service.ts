import { Injectable } from '@angular/core';
import {
  AuthService,
  Order,
  RoutingService,
  UserService,
} from '@spartacus/core';
import { Observable } from 'rxjs';
import { map, shareReplay, switchMap, tap } from 'rxjs/operators';

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

    this.orderLoad$ = this.orderCode$.pipe(
      tap(orderCode => {
        if (orderCode) {
          this.userService.loadOrderDetails(orderCode);
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
