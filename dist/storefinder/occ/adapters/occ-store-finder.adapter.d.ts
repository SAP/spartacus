import { HttpClient } from '@angular/common/http';
import { ConverterService, GeoPoint, Occ, OccEndpointsService, PointOfService, SearchConfig } from '@spartacus/core';
import { StoreCount, StoreFinderAdapter, StoreFinderSearchPage } from '@spartacus/storefinder/core';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
export declare class OccStoreFinderAdapter implements StoreFinderAdapter {
    protected http: HttpClient;
    protected occEndpointsService: OccEndpointsService;
    protected converterService: ConverterService;
    constructor(http: HttpClient, occEndpointsService: OccEndpointsService, converterService: ConverterService);
    search(query: string, searchConfig: SearchConfig, longitudeLatitude?: GeoPoint, radius?: number): Observable<StoreFinderSearchPage>;
    loadCounts(): Observable<StoreCount[]>;
    load(storeId: string): Observable<PointOfService>;
    protected callOccFindStores(query: string, searchConfig?: SearchConfig, longitudeLatitude?: GeoPoint, radius?: number): Observable<Occ.StoreFinderSearchPage>;
    static ɵfac: i0.ɵɵFactoryDeclaration<OccStoreFinderAdapter, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<OccStoreFinderAdapter>;
}
