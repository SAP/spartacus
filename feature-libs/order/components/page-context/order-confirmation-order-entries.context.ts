import { Injectable } from '@angular/core';
import {
  GetOrderEntriesContext,
  OrderEntriesSource,
  OrderEntry,
} from '@spartacus/cart/base/root';
import { UnnamedFacade } from '@spartacus/order/root';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class OrderConfirmationOrderEntriesContext
  implements GetOrderEntriesContext
{
  readonly type = OrderEntriesSource.ORDER_CONFIRMATION;

  constructor(protected checkoutFacade: UnnamedFacade) {}

  getEntries(): Observable<OrderEntry[]> {
    return this.checkoutFacade
      .getCurrentOrderDetails()
      .pipe(map((order) => order?.entries ?? []));
  }
}
