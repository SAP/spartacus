import { StoreFinderSearchConfig } from '../model/search-config';
import { Observable } from 'rxjs';
import { PointOfService } from '../../model/point-of-service.model';
import { GeoPoint } from '../../model/misc.model';
import {
  StoreFinderSearchPage,
  StoreCount,
} from '../../model/store-finder.model';

export abstract class StoreFinderAdapter {
  abstract search(
    query: string,
    searchConfig: StoreFinderSearchConfig,
    longitudeLatitude?: GeoPoint
  ): Observable<StoreFinderSearchPage>;

  abstract loadCount(): Observable<StoreCount[]>;

  abstract load(storeId: string): Observable<PointOfService>;
}
