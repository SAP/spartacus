import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { GeoPoint } from '../../model/misc.model';
import { PointOfService } from '../../model/point-of-service.model';
import {
  StoreCount,
  StoreFinderSearchPage,
} from '../../model/store-finder.model';
import { StoreFinderSearchConfig } from '../model/search-config';
import { StoreFinderAdapter } from './store-finder.adapter';

@Injectable({ providedIn: 'root' })
export class StoreFinderConnector {
  constructor(protected adapter: StoreFinderAdapter) {}

  search(
    query: string,
    searchConfig: StoreFinderSearchConfig,
    longitudeLatitude?: GeoPoint
  ): Observable<StoreFinderSearchPage> {
    return this.adapter.search(query, searchConfig, longitudeLatitude);
  }

  getCounts(): Observable<StoreCount[]> {
    return this.adapter.loadCounts();
  }

  get(storeId: string): Observable<PointOfService> {
    return this.adapter.load(storeId);
  }
}
