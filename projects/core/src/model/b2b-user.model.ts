import { B2BUnit } from './org-unit.model';

export interface B2BUser {
  firstName?: string;
  lastName?: string;
  uid?: string;
  email?: string;
  orgUnit?: B2BUnit;
  roles?: string[];
  titleCode?: string;
}
