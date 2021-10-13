import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Order, OrderEntry } from '@spartacus/core';
import { OrderDetailsService } from '@spartacus/order/components';
import { CartTypes } from '../model/import-export.model';
import { ProductData, ProductImportInfo } from '../model/import-to-cart.model';
import { ImportExportContext } from './import-export.context';

@Injectable({
  providedIn: 'root',
})
export class OrderDetailsExportContextService implements ImportExportContext {
  readonly type = CartTypes.ORDER_DETAILS;

  constructor(protected orderDetailsService: OrderDetailsService) {}

  getEntries(): Observable<OrderEntry[]> {
    return this.orderDetailsService
      .getOrderDetails()
      .pipe(map((order: Order) => order?.entries ?? []));
  }

  addEntries(_products: ProductData[]): Observable<ProductImportInfo> {
    return of({} as ProductImportInfo);
  }
}
