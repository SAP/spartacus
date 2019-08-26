import { Address } from './address.model';

export interface Currency {
  active?: boolean;
  isocode?: string;
  name?: string;
  symbol?: string;
}

export interface Time {
  formattedHour?: string;
  hour?: number;
  minute?: number;
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

export interface HttpErrorModel {
  message?: string;
  error?: any | null;
  status?: number;
  statusText?: string;
  url?: string | null;
}

export interface BaseSite {
  channel?: string;
  defaultLanguage?: Language;
  defaultPreviewCatalogId?: string;
  defaultPreviewCategoryCode?: string;
  defaultPreviewProductCode?: string;
  locale?: string;
  name?: string;
  theme?: string;
  uid?: string;
}

export interface UserSignUp {
  firstName?: string;
  lastName?: string;
  password?: string;
  titleCode?: string;
  uid?: string;
}
