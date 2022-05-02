import { UserGroup } from "@spartacus/asm/core";

export interface CustomerListsPage {
  currentPage?: number;
  numberOfPages?: number;
  pageSize?: number;
  totalNumber?: number;
  userGroups?: Array<UserGroup>;
}
