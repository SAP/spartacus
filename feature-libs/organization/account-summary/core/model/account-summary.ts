import { Currency, PaginationModel, SortModel } from '@spartacus/core';

export interface AccountSummary {
  accountSummaryList: AccountSummaryList;
}

export interface AccountSummaryDocument {
  amount?: number;
  currency?: Currency;
  date?: Date;
  documentNumber?: string;
  documentType?: DocumentType;
  formattedAmount?: string;
  formattedOpenAmount?: string;
  openAmount?: number;
  selectable?: boolean;
  status?: string;
}

export interface AccountSummaryList {
  documents?: AccountSummaryDocument[];
  pagination?: PaginationModel;
  sorts?: SortModel[];
}
