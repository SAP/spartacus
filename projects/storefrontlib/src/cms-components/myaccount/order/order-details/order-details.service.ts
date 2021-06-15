import { Injectable } from '@angular/core';
import { Order, RoutingService, UserOrderService } from '@spartacus/core';
import { LoaderState } from 'projects/core/src/state/utils/loader/loader-state';
import { Observable } from 'rxjs';
import {
  distinctUntilChanged,
  map,
  shareReplay,
  switchMap,
  tap,
} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class OrderDetailsService {
  orderCode$: Observable<string>;
  orderLoad$: Observable<{}>;

  constructor(
    private userOrderService: UserOrderService,
    private routingService: RoutingService
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

  getOrderDetailsState(): Observable<LoaderState<Order>> {
    return this.orderLoad$.pipe(
      switchMap(() => this.userOrderService.getOrderDetailsState())
    );
  }

  getOrderDetails(): Observable<Order> {
    return this.orderLoad$.pipe(
      switchMap(() => this.userOrderService.getOrderDetails())
    );
  }
}
