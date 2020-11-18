import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StoreFinderAdapter } from './store-finder.adapter';
import {
  GeoPoint,
  PointOfService,
  SearchConfig,
  StoreCount,
  StoreFinderSearchPage,
} from '@spartacus/core';

@Injectable({ providedIn: 'root' })
export class StoreFinderConnector {
  constructor(protected adapter: StoreFinderAdapter) {}

  search(
    query: string,
    searchConfig: SearchConfig,
    longitudeLatitude?: GeoPoint,
    radius?: number
  ): Observable<StoreFinderSearchPage> {
    return this.adapter.search(query, searchConfig, longitudeLatitude, radius);
  }

  getCounts(): Observable<StoreCount[]> {
    return this.adapter.loadCounts();
  }

  get(storeId: string): Observable<PointOfService> {
    return this.adapter.load(storeId);
  }
}
