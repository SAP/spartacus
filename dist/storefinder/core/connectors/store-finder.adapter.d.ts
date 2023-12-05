import { Observable } from 'rxjs';
import { GeoPoint, PointOfService, SearchConfig } from '@spartacus/core';
import { StoreCount, StoreFinderSearchPage } from '../model/store-finder.model';
export declare abstract class StoreFinderAdapter {
    abstract search(query: string, searchConfig: SearchConfig, longitudeLatitude?: GeoPoint, radius?: number): Observable<StoreFinderSearchPage>;
    abstract loadCounts(): Observable<StoreCount[]>;
    abstract load(storeId: string): Observable<PointOfService>;
}
