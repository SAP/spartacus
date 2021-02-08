import { B2BUnit, B2BUser, B2BUserRole } from '@spartacus/core';
import { Permission } from './permission.model';

export interface UserGroup {
  members?: B2BUser[];
  membersCount?: number;
  name?: string;
  orgUnit?: B2BUnit;
  permissions?: Permission[];
  roles?: B2BUserRole[];
  selected?: boolean;
  subGroups?: UserGroup[];
  uid?: string;
}
