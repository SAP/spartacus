import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Order, OrderEntry } from '@spartacus/core';
import { OrderDetailsService } from '@spartacus/order/components';
import { CartTypes } from '../model/import-export.model';
import { ExportContext } from './export.context';

@Injectable({
  providedIn: 'root',
})
export class OrderDetailsExportContextService implements ExportContext {
  readonly type = CartTypes.ORDER_DETAILS;

  constructor(protected orderDetailsService: OrderDetailsService) {}

  getEntries(): Observable<OrderEntry[]> {
    return this.orderDetailsService
      .getOrderDetails()
      .pipe(map((order: Order) => order?.entries ?? []));
  }
}
