import { Observable } from 'rxjs';
import {
  GeoPoint,
  PointOfService,
  SearchConfig,
  StoreCount,
  StoreFinderSearchPage,
} from '@spartacus/core';

export abstract class StoreFinderAdapter {
  abstract search(
    query: string,
    searchConfig: SearchConfig,
    longitudeLatitude?: GeoPoint,
    radius?: number
  ): Observable<StoreFinderSearchPage>;

  abstract loadCounts(): Observable<StoreCount[]>;

  abstract load(storeId: string): Observable<PointOfService>;
}
