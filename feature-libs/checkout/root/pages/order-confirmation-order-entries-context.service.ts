import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Order, OrderEntry } from '@spartacus/core';
import {
  OrderEntriesSource,
  GetOrderEntriesContext,
} from '@spartacus/storefront';
import { CheckoutFacade } from '../facade/checkout.facade';

@Injectable({
  providedIn: 'root',
})
export class OrderConfirmationOrderEntriesContext
  implements GetOrderEntriesContext
{
  readonly type = OrderEntriesSource.ORDER_CONFIRMATION;

  constructor(protected checkoutService: CheckoutFacade) {}

  getEntries(): Observable<OrderEntry[]> {
    return this.checkoutService
      .getOrderDetails()
      .pipe(map((order: Order) => order?.entries ?? []));
  }
}
