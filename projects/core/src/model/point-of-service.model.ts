import { Time, GeoPoint } from './misc.model';
import { Address } from './address.model';
import { Image } from './image.model';

export interface PointOfService {
  address?: Address;
  description?: string;
  displayName?: string;
  distanceKm?: number;
  features?: { [propertyName: string]: string };
  formattedDistance?: string;
  geoPoint?: GeoPoint;
  mapIcon?: Image;
  name?: string;
  openingHours?: OpeningSchedule;
  storeContent?: string;
  storeImages?: Image[];
  url?: string;
}

export interface SpecialOpeningDay {
  closed?: boolean;
  closingTime?: Time;
  comment?: string;
  date?: Date;
  formattedDate?: string;
  name?: string;
  openingTime?: Time;
}

export interface WeekdayOpeningDay {
  closed?: boolean;
  closingTime?: Time;
  openingTime?: Time;
  weekDay?: string;
}

export interface OpeningSchedule {
  code?: string;
  name?: string;
  specialDayOpeningList?: SpecialOpeningDay[];
  weekDayOpeningList?: WeekdayOpeningDay[];
}
