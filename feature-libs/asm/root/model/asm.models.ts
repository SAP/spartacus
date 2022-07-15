import { PaginationModel, SortModel, User } from '@spartacus/core';

export interface CustomerSearchPage {
  entries: User[];
  pagination?: PaginationModel;
  sorts?: SortModel[];
}

export interface CustomerSearchOptions {
  query?: string;
  pageSize?: number;
}

export interface AsmUi {
  collapsed?: boolean;
}

export interface BindCartParams {
  cartId: string;
  customerId: string;
}

export interface Customer360Section {
  sectionTitle: CUSTOMER_360_SECTION_TITLE;
  sectionContent: string;
}

export enum CUSTOMER_360_SECTION_TITLE {
  OVERVIEW = 'Overview',
  PROFILE = 'Profile',
  ACTIVITY = 'Activity',
  FEEDBACK = 'Feedback',
  MAPS = 'Maps',
}
