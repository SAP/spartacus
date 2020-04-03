import { User } from './misc.model';
import { B2BUnit } from './org-unit.model';
import { Permission } from './permission.model';

export interface UserGroup {
  members?: number;
  membersCount?: User[];
  name?: string;
  orgUnit?: B2BUnit;
  permissions?: Permission[];
  roles?: any;
  selected?: boolean;
  subGroups?: any;
  uid?: string;
}
