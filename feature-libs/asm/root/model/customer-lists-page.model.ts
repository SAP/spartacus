import { UserGroup } from './user-group.model';

export interface CustomerListsPage {
  currentPage?: number;
  numberOfPages?: number;
  pageSize?: number;
  totalNumber?: number;
  userGroups?: Array<UserGroup>;
}

export enum CustomerListColumnActionType {
  START_SESSION = 'START_SESSION',
  ORDER_HISTORY = 'ORDER_HISTORY',
}
