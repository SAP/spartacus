import { Injectable } from '@angular/core';
import { StoreFinderStockSearchPage } from '@spartacus/core';
import { LocationSearchParams } from '@spartacus/pickup-in-store/root';
import { Observable } from 'rxjs';
import { StockAdapter } from './stock.adapter';

@Injectable({ providedIn: 'root' })
export class StockConnector {
  constructor(protected adapter: StockAdapter) {}

  loadStockLevels(
    productCode: string,
    location: LocationSearchParams
  ): Observable<StoreFinderStockSearchPage> {
    return this.adapter.loadStockLevels(productCode, location);
  }
}
