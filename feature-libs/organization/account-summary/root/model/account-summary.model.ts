import {
  Address,
  B2BUnit,
  Currency,
  PaginationModel,
  SortModel
} from '@spartacus/core';

interface MediaData {
  downloadURL?: string;
  realFileName?: string;
}

export interface OrgDocumentType {
  code?: string;
  name?: string;
  payableOrUsable?: string;
}

interface AmountBalance {
  currentBalance?: string;
  dueBalances?: DueBalanceRange[];
  openBalance?: string;
  pastDueBalance?: string;
}

interface DueBalanceRange {
  amount?: string;
  dayRange?: NumberOfDayRange;
}

interface NumberOfDayRange {
  minBoundary?: number;
  maxBoundary?: number;
}

export enum DocumentStatus {
  OPEN = 'open',
  CLOSED = 'closed',
  ALL = 'all',
}

export enum DocumentFields {
  BASIC = 'BASIC',
  DEFAULT = 'DEFAULT',
  FULL = 'FULL',
}

export enum FilterByOptions {
  DOCUMENT_NUMBER = 'orgDocumentId',
  DOCUMENT_NUMBER_RANGE = 'orgDocumentIdRange',
  DOCUMENT_TYPE = 'orgDocumentType',
  DATE_RANGE = 'createdAtDateRange',
  DUE_DATE_RANGE = 'dueAtDateRange',
  AMOUNT_RANGE = 'amountRange',
  OPEN_AMOUNT_RANGE = 'openAmountRange',
}

export interface AccountSummaryDetails {
  accountManagerEmail?: string;
  accountManagerName?: string;
  amountBalance?: AmountBalance;
  billingAddress?: Address;
  creditLimit?: string;
  orgUnit?: B2BUnit;
}

export interface AccountSummaryDocument {
  amount?: number;
  createdAtDate?: string;
  currency?: Currency;
  documentMedia?: MediaData;
  dueAtDate?: string;
  id?: string;
  openAmount?: number;
  orgDocumentType?: OrgDocumentType;
  status?: DocumentStatus;
}

export interface AccountSummaryDocumentType {
  code?: string;
  displayInAllList?: boolean;
  includeInOpenBalance?: boolean;
  name?: string;
}

export interface AccountSummary {
  accountSummaryList: AccountSummaryList;
}

export interface AccountSummaryList {
  orgDocumentTypes?: AccountSummaryDocumentType[];
  orgDocuments?: AccountSummaryDocument[];
  pagination?: PaginationModel;
  sorts?: SortModel[];
}

export interface DocumentQueryParams {
  page?: number;
  pageSize?: number;
  sort?: string;
  fields?: DocumentFields;
  status?: DocumentStatus;
  startRange?: string;
  endRange?: string;
  filterByKey?: FilterByOptions;
  filterByValue?: string;
}
