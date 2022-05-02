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

export interface Member {
  name?: string;
  uid?: string;
}

export interface UserGroup {
  members?: Array<Member>;
  membersCount?: number;
  name?: string;
  subGroups?: Array<UserGroup>;
  uid?: string;
}

