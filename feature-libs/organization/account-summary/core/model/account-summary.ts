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

export interface AccountSummaryDetails {
  accountManagerEmail?: string;
  accountManagerName?: string;
  amountBalanceData?: B2BAmountBalanceData;
  b2BUnitWsDTO?: B2BUnit;
  billingAddress?: Address;
  formattedCreditLimit?: string;
}

export interface AccountSummaryDocument {
  amount?: number;
  currency?: Currency;
  date?: Date;
  documentMedia: MediaData;
  documentNumber?: string;
  documentType?: B2BDocumentTypeData;
  dueDate?: string;
  formattedAmount?: string;
  formattedOpenAmount?: string;
  openAmount?: number;
  selectable?: boolean;
  status?: string;
}

export interface AccountSummary {
  accountSummaryList: AccountSummaryList;
}

export interface AccountSummaryList {
  documents?: AccountSummaryDocument[];
  pagination?: PaginationModel;
  sorts?: SortModel[];
}

export interface DocumentQueryParams {
  b2bDocumentStatus?: string;
  currentPage?: number;
  pageSize?: number;
  sort?: string;
  startRange?: string;
  endRange?: string;
  filterKey?: string;
  filterValue?: string;
}
