import { Injectable } from '@angular/core';
import {
  GetOrderEntriesContext,
  OrderEntriesSource,
  OrderEntry,
} from '@spartacus/cart/main/root';
import { CheckoutFacade } from '@spartacus/checkout/base/root';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class OrderConfirmationOrderEntriesContext
  implements GetOrderEntriesContext
{
  readonly type = OrderEntriesSource.ORDER_CONFIRMATION;

  constructor(protected checkoutFacade: CheckoutFacade) {}

  getEntries(): Observable<OrderEntry[]> {
    return this.checkoutFacade
      .getOrderDetails()
      .pipe(map((order) => order?.entries ?? []));
  }
}
