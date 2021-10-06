import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { OrderEntry } from '@spartacus/core';
import { QuickOrderFacade } from '@spartacus/cart/quick-order/root';
import { CartTypes } from '../model/import-export.model';
import { ProductImportInfo, ProductsData } from '../model/import-to-cart.model';
import { ImportExportContext } from './import-export.context';

@Injectable({
  providedIn: 'root',
})
export class QuickOrderImportExportContext implements ImportExportContext {
  readonly type = CartTypes.QUICK_ORDER;

  constructor(protected quickOrderService: QuickOrderFacade) {}

  getEntries(): Observable<OrderEntry[]> {
    return this.quickOrderService.getEntries();
  }

  addEntries(_products: ProductsData): Observable<ProductImportInfo> {
    return of({} as ProductImportInfo);
  }
}
