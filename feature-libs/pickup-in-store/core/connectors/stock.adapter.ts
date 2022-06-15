import { Observable } from 'rxjs';

export abstract class StockAdapter {
  // TODO type this
  abstract loadStockLevels(productCode: string, location: any): Observable<any>;
}
