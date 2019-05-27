import { Injectable } from '@angular/core';
import { Order, RoutingService, UserService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { map, shareReplay, switchMap, tap } from 'rxjs/operators';

@Injectable()
export class OrderDetailsService {
  orderCode$: Observable<string>;
  orderLoad$: Observable<{}>;

  constructor(
    private userService: UserService,
    private routingService: RoutingService
  ) {
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
