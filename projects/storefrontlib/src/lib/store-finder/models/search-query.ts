import { LongitudeLatitude } from './longitude-latitude';

export interface SearchQuery {
  queryText?: string;
  longitudeLatitude?: LongitudeLatitude;
  useMyLocation?: boolean;
}
