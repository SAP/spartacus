import {
  Address,
  B2BUnit,
  Currency,
  PaginationModel,
  SortModel,
} from '@spartacus/core';

interface MediaData {
  downloadURL?: string;
  realFileName?: string;
}

interface B2BDocumentTypeData {
  code?: string;
  displayInAllList?: boolean;
  includeInOpenBalance?: boolean;
  name?: string;
  payableOrUsable?: string;
}

interface B2BAmountBalanceData {
  currentBalance?: string;
  dueBalance?: any;
  openBalance?: string;
  pastDueBalance?: string;
}

 enum DocumentStatus {
  OPEN = 'open',
  CLOSED = 'closed',
  ALL = 'all',
 }

export interface AccountSummaryDetails {
  accountManagerEmail?: string;
  accountManagerName?: string;
  amountBalanceData?: B2BAmountBalanceData;
  unit?: B2BUnit;
  billingAddress?: Address;
  formattedCreditLimit?: string;
}

export interface AccountSummaryDocument {
  amount?: number;
  currency?: Currency;
  date?: Date;
  documentMedia?: MediaData;
  documentNumber?: string;
  documentType?: B2BDocumentTypeData;
  dueDate?: string;
  formattedAmount?: string;
  formattedOpenAmount?: string;
  openAmount?: number;
  selectable?: boolean;
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
  documentTypes?: AccountSummaryDocumentType[];
  documents?: AccountSummaryDocument[];
  pagination?: PaginationModel;
  sorts?: SortModel[];
}

export enum FIELDS_TYPE {
  BASIC = 'BASIC',
  DEFAULT = 'DEFAULT',
  FULL = 'FULL',
}

export interface DocumentQueryParams {
  page?: number;
  pageSize?: number;
  sort?: string;
  fields?: FIELDS_TYPE;
  status?: string;
  startRange?: string;
  endRange?: string;
  filterByKey?: string;
  filterByValue?: string;
}
