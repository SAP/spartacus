import { Injectable } from '@angular/core';
import { OrderEntriesSource, OrderEntry } from '@spartacus/cart/main/root';
import { Order } from '@spartacus/order/root';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CheckoutFacade } from '../facade/checkout.facade';

@Injectable({
  providedIn: 'root',
})
export class OrderConfirmationOrderEntriesContext {
  readonly type = OrderEntriesSource.ORDER_CONFIRMATION;

  constructor(protected checkoutService: CheckoutFacade) {}

  getEntries(): Observable<OrderEntry[]> {
    return this.checkoutService
      .getOrderDetails()
      .pipe(map((order: Order) => order?.entries ?? []));
  }
}
