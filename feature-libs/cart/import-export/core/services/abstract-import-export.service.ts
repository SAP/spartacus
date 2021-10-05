import { Observable } from 'rxjs';
import { OrderEntry } from '@spartacus/core';
import {
  ProductImportInfo,
  ProductsData,
} from '@spartacus/cart/import-export/core';

export abstract class AbstractImportExportService {
  abstract getEntries(): Observable<OrderEntry[]>;

  abstract addEntries(
    products: ProductsData,
    savedCartInfo?: { name: string; description: string }
  ): Observable<string>;

  abstract getResults(cartId: string): Observable<ProductImportInfo>;
}
