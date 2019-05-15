import { StoreFinderSearchConfig } from '../model/search-config';
import { Observable } from 'rxjs';
import {
  StoreCountList,
  StoreFinderSearchPage,
  PointOfService,
} from '../../model/store.model';
import { GeoPoint } from '../../model/misc.model';

export abstract class StoreFinderAdapter {
  abstract search(
    query: string,
    searchConfig: StoreFinderSearchConfig,
    longitudeLatitude?: GeoPoint
  ): Observable<StoreFinderSearchPage>;

  abstract loadCount(): Observable<StoreCountList>;

  abstract load(storeId: string): Observable<PointOfService>;
}
