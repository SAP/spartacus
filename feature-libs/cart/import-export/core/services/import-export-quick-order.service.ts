import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { OrderEntry } from '@spartacus/core';
import { QuickOrderFacade } from '@spartacus/cart/quick-order/root';
import {
  ProductImportInfo,
  ProductsData,
} from '@spartacus/cart/import-export/core';
import { AbstractImportExportService } from './abstract-import-export.service';

@Injectable({
  providedIn: 'root',
})
export class ImportExportQuickOrderService extends AbstractImportExportService {
  constructor(protected quickOrderService: QuickOrderFacade) {
    super();
  }

  getEntries(): Observable<OrderEntry[]> {
    return this.quickOrderService.getEntries();
  }

  addEntries(_products: ProductsData): Observable<string> {
    return of('');
  }

  getResults(_cartId: string): Observable<ProductImportInfo> {
    return of({} as ProductImportInfo);
  }
}
