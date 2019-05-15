import { StoreFinderSearchConfig } from '../model/search-config';
import { Observable } from 'rxjs';
import {
  StoreFinderSearchPage,
  PointOfService,
  StoreCount,
} from '../../model/store.model';
import { GeoPoint } from '../../model/misc.model';

export abstract class StoreFinderAdapter {
  abstract search(
    query: string,
    searchConfig: StoreFinderSearchConfig,
    longitudeLatitude?: GeoPoint
  ): Observable<StoreFinderSearchPage>;

  abstract loadCount(): Observable<StoreCount[]>;

  abstract load(storeId: string): Observable<PointOfService>;
}
