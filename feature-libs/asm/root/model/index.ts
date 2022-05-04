import { PaginationModel, SortModel, User } from '@spartacus/core';

export * from './customer-lists-page.model';

export interface CustomerSearchPage {
  entries: User[];
  pagination?: PaginationModel;
  sorts?: SortModel[];
}

export interface CustomerSearchOptions {
  query?: string;
  pageSize?: number;
  customerListId?: string;
  currentPage?: number;
  sort?: string;
}
