import { B2BUnit, B2BUser, Permission } from '@spartacus/core';

export interface UserGroup {
  members?: B2BUser[];
  membersCount?: number;
  name?: string;
  orgUnit?: B2BUnit;
  permissions?: Permission[];
  roles?: any;
  selected?: boolean;
  subGroups?: any;
  uid?: string;
}
