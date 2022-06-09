import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StockAdapter } from './stock.adapter';

// import { StoreCount } from '../model/stock.model';

@Injectable({ providedIn: 'root' })
export class StoreFinderConnector {
  constructor(protected adapter: StockAdapter) {}

  // TODO replace any with real type
  loadStockLevels(productCode: string): Observable<any> {
    return this.adapter.loadStockLevels(productCode);
  }
}
