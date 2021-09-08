import { Injectable } from '@angular/core';
import {
  getLastValueSync,
  Order,
  RoutingService,
  UnifiedInjector,
  UserOrderService,
} from '@spartacus/core';
import { Observable } from 'rxjs';
import {
  distinctUntilChanged,
  map,
  shareReplay,
  switchMap,
  tap,
} from 'rxjs/operators';
import { OrderDetailsServiceTransitionalToken } from '../order-transitional-tokens';

/**
 * @deprecated since 4.2 - use order lib instead
 */
@Injectable({
  providedIn: 'root',
})
export class OrderDetailsService {
  orderCode$: Observable<string>;
  orderLoad$: Observable<{}>;

  constructor(
    private userOrderService: UserOrderService,
    private routingService: RoutingService,
    private unifiedInjector?: UnifiedInjector
  ) {
    this.orderCode$ = this.routingService.getRouterState().pipe(
      map((routingData) => routingData.state.params.orderCode),
      distinctUntilChanged()
    );

    this.orderLoad$ = this.orderCode$.pipe(
      tap((orderCode) => {
        if (orderCode) {
          this.userOrderService.loadOrderDetails(orderCode);
        } else {
          this.userOrderService.clearOrderDetails();
        }
      }),
      shareReplay({ bufferSize: 1, refCount: true })
    );
  }

  getOrderDetails(): Observable<Order> {
    if (this.unifiedInjector) {
      const serivce = getLastValueSync(
        this.unifiedInjector.get(OrderDetailsServiceTransitionalToken)
      );
      if (serivce) {
        return serivce.getOrderDetails();
      }
    }

    return this.orderLoad$.pipe(
      switchMap(() => this.userOrderService.getOrderDetails())
    );
  }
}
