import { Injectable } from '@angular/core';
import {
  Order,
  RoutingService,
  UserOrderService,
  CancellationRequestEntryInputList,
} from '@spartacus/core';
import { Observable } from 'rxjs';
import { map, shareReplay, switchMap, tap } from 'rxjs/operators';

@Injectable()
export class OrderDetailsService {
  orderCode$: Observable<string>;
  orderLoad$: Observable<{}>;

  constructor(
    private userOrderService: UserOrderService,
    private routingService: RoutingService
  ) {
    this.orderCode$ = this.routingService
      .getRouterState()
      .pipe(map(routingData => routingData.state.params.orderCode));

    this.orderLoad$ = this.orderCode$.pipe(
      tap(orderCode => {
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
    return this.orderLoad$.pipe(
      switchMap(() => this.userOrderService.getOrderDetails())
    );
  }

  cancelOrder(
    orderCode: string,
    cancelRequestInput: CancellationRequestEntryInputList
  ): void {
    this.userOrderService.cancelOrder(orderCode, cancelRequestInput);
  }
}
