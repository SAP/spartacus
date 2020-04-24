import { GeoPoint } from '../../model/misc.model';

export interface StoreFinderSearchQuery {
  queryText?: string;
  longitudeLatitude?: GeoPoint;
  useMyLocation?: boolean;
  radius?: number;
}
