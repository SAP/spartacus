import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Order, OrderEntry } from '@spartacus/core';
import { CheckoutFacade } from '@spartacus/checkout/root';
import { CartTypes } from '../model/import-export.model';
import { ExportContext } from './export.context';

@Injectable({
  providedIn: 'root',
})
export class OrderConfirmationExportContext implements ExportContext {
  readonly type = CartTypes.ORDER_CONFIRMATION;

  constructor(protected checkoutService: CheckoutFacade) {}

  getEntries(): Observable<OrderEntry[]> {
    return this.checkoutService
      .getOrderDetails()
      .pipe(map((order: Order) => order?.entries ?? []));
  }
}
