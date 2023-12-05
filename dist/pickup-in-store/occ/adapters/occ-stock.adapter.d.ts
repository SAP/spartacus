import { HttpClient } from '@angular/common/http';
import { LoggerService, OccEndpointsService, Stock, StoreFinderStockSearchPage } from '@spartacus/core';
import { StockAdapter } from '@spartacus/pickup-in-store/core';
import { LocationSearchParams } from '@spartacus/pickup-in-store/root';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
/**
 * Adapter for finding stock levels of a product in stores from the OCC APIs.
 */
export declare class OccStockAdapter implements StockAdapter {
    protected http: HttpClient;
    protected occEndpointsService: OccEndpointsService;
    protected logger: LoggerService;
    constructor(http: HttpClient, occEndpointsService: OccEndpointsService);
    loadStockLevels(productCode: string, location: LocationSearchParams): Observable<StoreFinderStockSearchPage>;
    loadStockLevelAtStore(productCode: string, storeName: string): Observable<Stock>;
    static ɵfac: i0.ɵɵFactoryDeclaration<OccStockAdapter, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<OccStockAdapter>;
}
