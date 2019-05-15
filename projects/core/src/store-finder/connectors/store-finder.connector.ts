import { StoreFinderSearchConfig } from '../model/search-config';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { StoreFinderAdapter } from './store-finder.adapter';
import {
  StoreFinderSearchPage,
  StoreCountList,
  PointOfService,
} from '../../model/store.model';
import { GeoPoint } from '../../model/misc.model';

@Injectable({ providedIn: 'root' })
export abstract class StoreFinderConnector {
  constructor(protected adapter: StoreFinderAdapter) {}

  search(
    query: string,
    searchConfig: StoreFinderSearchConfig,
    longitudeLatitude?: GeoPoint
  ): Observable<StoreFinderSearchPage> {
    return this.adapter.search(query, searchConfig, longitudeLatitude);
  }

  getCount(): Observable<StoreCountList> {
    return this.adapter.loadCount();
  }

  get(storeId: string): Observable<PointOfService> {
    return this.adapter.load(storeId);
  }
}
