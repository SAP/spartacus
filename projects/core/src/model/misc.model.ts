import { Address } from './address.model';

export interface Currency {
  active?: boolean;
  isocode?: string;
  name?: string;
  symbol?: string;
}

export interface Time {
  formattedHour?: string;
  hour?: Uint8Array;
  minute?: Uint8Array;
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

export interface GeoPoint {
  latitude?: number;
  longitude?: number;
}

export interface Language {
  active?: boolean;
  isocode?: string;
  name?: string;
  nativeName?: string;
}

export interface User {
  currency?: Currency;
  customerId?: string;
  deactivationDate?: Date;
  defaultAddress?: Address;
  displayUid?: string;
  firstName?: string;
  language?: Language;
  lastName?: string;
  name?: string;
  title?: string;
  titleCode?: string;
  uid?: string;
}

export interface PaginationModel {
  currentPage?: number;
  pageSize?: number;
  sort?: string;
  totalPages?: number;
  totalResults?: number;
}

export interface SortModel {
  code?: string;
  name?: string;
  selected?: boolean;
}

export interface Title {
  code?: string;
  name?: string;
}

export interface ErrorModel {
  message?: string;
  reason?: string;
  subject?: string;
  subjectType?: string;
  type?: string;
}
