import { LongitudeLatitude } from './longitude-latitude';
import { OpeningHours } from './opening-hours';
import { StoreAddress } from './store-address';

export interface Location {
  name?: string;
  displayName?: string;
  address?: StoreAddress;
  geoPoint?: LongitudeLatitude;
  openingHours?: {
    code: string;
    weekDayOpeningList: Array<OpeningHours>;
  };
}
