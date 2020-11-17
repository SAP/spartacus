import { GeoPoint } from '@spartacus/core';

export interface StoreFinderSearchQuery {
  queryText?: string;
  longitudeLatitude?: GeoPoint;
  useMyLocation?: boolean;
  radius?: number;
}
