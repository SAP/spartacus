import { Injectable } from '@angular/core';
import { StoreFinderStockSearchPage } from '@spartacus/core';
import { Observable } from 'rxjs';
import { StockAdapter } from './stock.adapter';

@Injectable({ providedIn: 'root' })
export class StockConnector {
  constructor(protected adapter: StockAdapter) {}

  // TODO replace location's type with exported type
  loadStockLevels(
    productCode: string,
    location: { latitude?: number; longitude?: number; location?: string }
  ): Observable<StoreFinderStockSearchPage> {
    return this.adapter.loadStockLevels(productCode, location);
  }
}
