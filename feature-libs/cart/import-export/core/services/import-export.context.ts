import { Observable } from 'rxjs';
import { OrderEntry } from '@spartacus/core';
import { CartTypes } from '../model/import-export.model';
import { ProductData, ProductImportInfo } from '../model/import-to-cart.model';

export interface ImportExportContext {
  readonly type: CartTypes;

  getEntries(): Observable<OrderEntry[]>;

  addEntries(
    products: ProductData[],
    savedCartInfo?: { name: string; description: string }
  ): Observable<ProductImportInfo>;
}
