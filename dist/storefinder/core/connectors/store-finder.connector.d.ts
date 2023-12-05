import { Observable } from 'rxjs';
import { StoreFinderAdapter } from './store-finder.adapter';
import { GeoPoint, PointOfService, SearchConfig } from '@spartacus/core';
import { StoreCount, StoreFinderSearchPage } from '../model/store-finder.model';
import * as i0 from "@angular/core";
export declare class StoreFinderConnector {
    protected adapter: StoreFinderAdapter;
    constructor(adapter: StoreFinderAdapter);
    search(query: string, searchConfig: SearchConfig, longitudeLatitude?: GeoPoint, radius?: number): Observable<StoreFinderSearchPage>;
    getCounts(): Observable<StoreCount[]>;
    get(storeId: string): Observable<PointOfService>;
    static ɵfac: i0.ɵɵFactoryDeclaration<StoreFinderConnector, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<StoreFinderConnector>;
}
