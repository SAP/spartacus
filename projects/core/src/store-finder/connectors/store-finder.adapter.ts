import { StoreFinderSearchConfig } from '../model/search-config';
import { LongitudeLatitude } from '../model';
import { Observable } from 'rxjs';

export abstract class StoreFinderAdapter {
  abstract search(
    query: string,
    searchConfig: StoreFinderSearchConfig,
    longitudeLatitude?: LongitudeLatitude
  ): Observable<any>;

  abstract loadCount(): Observable<any>;

  abstract load(storeId: string): Observable<any>;
}
