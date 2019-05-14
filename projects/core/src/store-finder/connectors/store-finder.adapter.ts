import { StoreFinderSearchConfig } from '../model/search-config';
import { LongitudeLatitude } from '../model';
import { Observable } from 'rxjs';
import {
  StoreCountList,
  StoreFinderSearchPage,
  PointOfService,
} from '../../model/store.model';

export abstract class StoreFinderAdapter {
  abstract search(
    query: string,
    searchConfig: StoreFinderSearchConfig,
    longitudeLatitude?: LongitudeLatitude
  ): Observable<StoreFinderSearchPage>;

  abstract loadCount(): Observable<StoreCountList>;

  abstract load(storeId: string): Observable<PointOfService>;
}
