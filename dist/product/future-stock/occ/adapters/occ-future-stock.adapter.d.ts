import { HttpClient } from '@angular/common/http';
import { ConverterService, LoggerService, OccEndpointsService } from '@spartacus/core';
import { FutureStockAdapter, ProductFutureStock, ProductFutureStockList } from '@spartacus/product/future-stock/core';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
export declare class OccFutureStockAdapter implements FutureStockAdapter {
    protected http: HttpClient;
    protected occEndpoints: OccEndpointsService;
    protected converter: ConverterService;
    protected logger: LoggerService;
    constructor(http: HttpClient, occEndpoints: OccEndpointsService, converter: ConverterService);
    getFutureStock(userId: string, productCode: string): Observable<ProductFutureStock>;
    getFutureStocks(userId: string, productCodes: string): Observable<ProductFutureStockList>;
    protected getFutureStockEndpoint(userId: string, productCode: string): string;
    protected getFutureStocksEndpoint(userId: string, productCodes: string): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<OccFutureStockAdapter, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<OccFutureStockAdapter>;
}
