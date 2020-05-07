import { B2BUnit, B2BUser } from './org-unit.model';
import { Permission } from './permission.model';

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
