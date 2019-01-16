import { LongitudeLatitude } from './longitude-latitude';

export interface StoreFinderSearchQuery {
  queryText?: string;
  longitudeLatitude?: LongitudeLatitude;
  useMyLocation?: boolean;
}
