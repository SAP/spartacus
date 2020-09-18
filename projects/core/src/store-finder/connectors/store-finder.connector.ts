import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GeoPoint } from '../../model/misc.model';
import { PointOfService } from '../../model/point-of-service.model';
import {
  StoreCount,
  StoreFinderSearchPage,
} from '../../model/store-finder.model';
import { SearchConfig } from '../../product/model/search-config';
import { StoreFinderAdapter } from './store-finder.adapter';

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
