import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  ProductFutureStock,
  ProductFutureStockList,
} from '../model/future-stock.model';
import { FutureStockAdapter } from './future-stock.adapter';

@Injectable()
export class FutureStockConnector {
  constructor(protected adapter: FutureStockAdapter) {}

  public getFutureStock(
    productCode: string,
    userId: string
  ): Observable<ProductFutureStock> {
    return this.adapter.getFutureStock(productCode, userId);
  }

  public getFutureStocks(
    productCodes: string,
    userId: string
  ): Observable<ProductFutureStockList> {
    return this.adapter.getFutureStocks(productCodes, userId);
  }
}
