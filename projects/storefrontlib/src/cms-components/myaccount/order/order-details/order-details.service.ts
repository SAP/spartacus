import { Injectable } from '@angular/core';
import {
  Order,
  RoutingService,
  UserOrderService,
  CancellationReturnRequestEntryInput,
} from '@spartacus/core';
import { Observable } from 'rxjs';
import { map, shareReplay, switchMap, tap } from 'rxjs/operators';

@Injectable()
export class OrderDetailsService {
  orderCode$: Observable<string>;
  orderLoad$: Observable<{}>;

  private _cancellationReturnRequestInputs: CancellationReturnRequestEntryInput[];

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

  get cancellationReturnRequestInputs(): CancellationReturnRequestEntryInput[] {
    return this._cancellationReturnRequestInputs;
  }

  set cancellationReturnRequestInputs(
    values: CancellationReturnRequestEntryInput[]
  ) {
    this._cancellationReturnRequestInputs = values;
  }
}
