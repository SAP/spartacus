import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Order, OrderEntry } from '@spartacus/core';
import { CheckoutFacade } from '@spartacus/checkout/root';
import { CartTypes } from '../model/import-export.model';
import { ProductData, ProductImportInfo } from '../model/import-to-cart.model';
import { ImportExportContext } from './import-export.context';

@Injectable({
  providedIn: 'root',
})
export class OrderConfirmationExportContext implements ImportExportContext {
  readonly type = CartTypes.ORDER_CONFIRMATION;

  constructor(protected checkoutService: CheckoutFacade) {}

  getEntries(): Observable<OrderEntry[]> {
    return this.checkoutService
      .getOrderDetails()
      .pipe(map((order: Order) => order?.entries ?? []));
  }

  addEntries(_products: ProductData[]): Observable<ProductImportInfo> {
    return of({} as ProductImportInfo);
  }
}
