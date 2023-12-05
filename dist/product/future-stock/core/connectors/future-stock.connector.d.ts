import { Observable } from 'rxjs';
import { ProductFutureStock, ProductFutureStockList } from '../model/future-stock.model';
import { FutureStockAdapter } from './future-stock.adapter';
import * as i0 from "@angular/core";
export declare class FutureStockConnector {
    protected adapter: FutureStockAdapter;
    constructor(adapter: FutureStockAdapter);
    getFutureStock(userId: string, productCode: string): Observable<ProductFutureStock>;
    getFutureStocks(userId: string, productCodes: string): Observable<ProductFutureStockList>;
    static ɵfac: i0.ɵɵFactoryDeclaration<FutureStockConnector, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<FutureStockConnector>;
}
