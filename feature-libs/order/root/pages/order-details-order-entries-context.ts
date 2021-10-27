import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Order, OrderEntry } from '@spartacus/core';
import {
  OrderEntriesSource,
  GetOrderEntriesContext,
} from '@spartacus/storefront';
import { OrderFacade } from '../facade/order.facade';

@Injectable({
  providedIn: 'root',
})
export class OrderDetailsOrderEntriesContext implements GetOrderEntriesContext {
  readonly type = OrderEntriesSource.ORDER_DETAILS;

  constructor(protected userOrderService: OrderFacade) {}

  getEntries(): Observable<OrderEntry[]> {
    return this.userOrderService
      .getOrderDetails()
      .pipe(map((order: Order) => order?.entries ?? []));
  }
}
