import { Observable } from 'rxjs';
import { StoreFinderStockSearchPage } from '@spartacus/core';

export abstract class StockAdapter {
  // TODO type this
  abstract loadStockLevels(productCode: string, location: any): Observable<StoreFinderStockSearchPage>;
}
