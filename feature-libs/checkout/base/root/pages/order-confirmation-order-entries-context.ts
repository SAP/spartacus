import { Injectable } from '@angular/core';
import { OrderEntry } from '@spartacus/core';
import {
  GetOrderEntriesContext,
  OrderEntriesSource,
} from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
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
      .getOrder()
      .pipe(map((order) => order?.entries ?? []));
  }
}
