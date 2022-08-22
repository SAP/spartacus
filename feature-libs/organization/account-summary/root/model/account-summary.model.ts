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
  numberOfDayRange?: NumberOfDayRange;
}

interface NumberOfDayRange {
  minBoundery?: number;
  maxBoundery?: number;
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
  DOCUMENT_NUMBER = 'documentNumber',
  DOCUMENT_NUMBER_RANGE = 'documentNumberRange',
  DOCUMENT_TYPE = 'documentType',
  DATE_RANGE = 'dateRange',
  DUE_DATE_RANGE = 'dueDateRange',
  AMOUNT_RANGE = 'amountRange',
  OPEN_AMOUNT_RANGE = 'openAmountRange',
}

export interface AccountSummaryDetails {
  accountManagerEmail?: string;
  accountManagerName?: string;
  amountBalance?: AmountBalance;
  unit?: B2BUnit;
  billingAddress?: Address;
  formattedCreditLimit?: string;
}

export interface AccountSummaryDocument {
  amount?: number;
  createdAtDate?: Date;
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
