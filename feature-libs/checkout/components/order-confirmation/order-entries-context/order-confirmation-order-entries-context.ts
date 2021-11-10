import { Injectable } from '@angular/core';
import { GetOrderEntriesContext } from '@spartacus/cart/main/components';
import { OrderEntriesSource, OrderEntry } from '@spartacus/cart/main/root';
import { CheckoutFacade } from '@spartacus/checkout/root';
import { Order } from '@spartacus/order/root';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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
