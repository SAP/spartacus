import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Order, OrderEntry } from '@spartacus/core';
import { CartTypes, ExportContext } from '@spartacus/storefront';
import { OrderFacade } from '../facade/order.facade';

@Injectable({
  providedIn: 'root',
})
export class OrderDetailsExportContextService implements ExportContext {
  readonly type = CartTypes.ORDER_DETAILS;

  constructor(protected orderDetailsService: OrderFacade) {}

  getEntries(): Observable<OrderEntry[]> {
    return this.orderDetailsService
      .getOrderDetails()
      .pipe(map((order: Order) => order?.entries ?? []));
  }
}
