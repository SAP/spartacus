import { PaginationModel, SortModel, User } from '@spartacus/core';

export enum AsmDialogActionType {
  START_SESSION = 'START_SESSION',
  NAVIGATE = 'NAVIGATE',
}
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

export interface AsmDialogActionEvent {
  selectedUser: User;
  actionType: AsmDialogActionType;
  route?: string;
}

export enum CUSTOMER_360_SECTION_TITLE {
  OVERVIEW = 'OVERVIEW',
  PROFILE = 'PROFILE',
  ACTIVITY = 'ACTIVITY',
  FEEDBACK = 'FEEDBACK',
  PROMOTIONS = 'PROMOTIONS',
  MAPS = 'MAPS',
}
