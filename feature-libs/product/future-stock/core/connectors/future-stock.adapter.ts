import { Observable } from 'rxjs';
import { ProductFutureStock } from '../model/future-stock.model';

export abstract class FutureStockAdapter {
  /**
   *
   * Abstract method used to get the future product availability for the specified product
   */
   abstract getFutureStock(productCode: string, userId: string): Observable<ProductFutureStock>;
  /**
   *
   * Abstract method used to get the future product availability for the list of specified products
   */
  abstract getFutureStocks(productCodes: string, userId: string): Observable<ProductFutureStock[]>;
}
