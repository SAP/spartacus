import { Observable } from 'rxjs';
import { OrderEntry } from '@spartacus/core';
import { CartTypes } from '../model/import-export.model';
import { ProductImportInfo, ProductsData } from '../model/import-to-cart.model';

export interface ImportExportContext {
  type: CartTypes;

  getEntries(): Observable<OrderEntry[]>;

  addEntries(
    products: ProductsData,
    savedCartInfo?: { name: string; description: string }
  ): Observable<ProductImportInfo>;
}
