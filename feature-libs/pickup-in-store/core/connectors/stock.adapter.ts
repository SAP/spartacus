import { Stock, StoreFinderStockSearchPage } from '@spartacus/core';
import { LocationSearchParams } from '@spartacus/pickup-in-store/root';
import { Observable } from 'rxjs';

// TODO jsdoc

export abstract class StockAdapter {
  abstract loadStockLevels(
    productCode: string,
    location: LocationSearchParams
  ): Observable<StoreFinderStockSearchPage>;

  abstract loadStockLevelAtStore(
    productCode: string,
    storeName: string
  ): Observable<Stock>;
}
