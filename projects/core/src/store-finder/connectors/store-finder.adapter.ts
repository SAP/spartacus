import { Observable } from 'rxjs';

import { GeoPoint } from '../../model/misc.model';
import { PointOfService } from '../../model/point-of-service.model';
import {
  StoreCount,
  StoreFinderSearchPage,
} from '../../model/store-finder.model';
import { StoreFinderSearchConfig } from '../model/search-config';

export abstract class StoreFinderAdapter {
  abstract search(
    query: string,
    searchConfig: StoreFinderSearchConfig,
    longitudeLatitude?: GeoPoint
  ): Observable<StoreFinderSearchPage>;

  abstract loadCounts(): Observable<StoreCount[]>;

  abstract load(storeId: string): Observable<PointOfService>;
}
