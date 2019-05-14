import { StoreFinderSearchConfig } from '../model/search-config';
import { LongitudeLatitude } from '../model';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { StoreFinderAdapter } from './store-finder.adapter';

@Injectable({ providedIn: 'root' })
export abstract class StoreFinderConnector {
  constructor(protected adapter: StoreFinderAdapter) {}

  search(
    query: string,
    searchConfig: StoreFinderSearchConfig,
    longitudeLatitude?: LongitudeLatitude
  ): Observable<any> {
    return this.adapter.search(query, searchConfig, longitudeLatitude);
  }

  getCount(): Observable<any> {
    return this.adapter.loadCount();
  }

  get(storeId: string): Observable<any> {
    return this.adapter.load(storeId);
  }
}
