import { User } from './misc.model';
import { B2BUnit } from './org-unit.model';
import { Permission } from './permission.model';

export interface OrgUnitUserGroup {
  name?: string;
  uid?: string;
  members?: User[];
  orgUnit?: B2BUnit;
  permissions?: Permission[];
  selected?: boolean;
}
