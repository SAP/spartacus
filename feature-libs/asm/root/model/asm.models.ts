import { PaginationModel, SortModel, UrlCommand, User } from '@spartacus/core';

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

export interface AsmDialogActionEvent {
  selectedUser: User;
  actionType: AsmDialogActionType;
  route?: UrlCommand;
}
