import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StockAdapter } from './stock.adapter';

// import { StoreCount } from '../model/stock.model';

@Injectable({ providedIn: 'root' })
export class StockConnector {
  constructor(protected adapter: StockAdapter) {}

  // TODO replace any with real type
  loadStockLevels(
    productCode: string,
    location: { latitude?: number; longitude?: number; location?: string }
  ): Observable<any> {
    return this.adapter.loadStockLevels(productCode, location);
  }
}
