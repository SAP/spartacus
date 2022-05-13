import { UserGroup } from './user-group.model';

export interface CustomerListsPage {
  currentPage?: number;
  numberOfPages?: number;
  pageSize?: number;
  totalNumber?: number;
  userGroups?: Array<UserGroup>;
}
