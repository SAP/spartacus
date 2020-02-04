import { Currency } from './misc.model';
import { B2BUnit } from './org-unit.model';

export interface OrderApprovalPermissionType {
  code: string;
  name?: string;
}

export enum Period {
  DAY = 'DAY',
  WEEK = 'WEEK',
  MONTH = 'MONTH',
  QUARTER = 'QUARTER',
  YEAR = 'YEAR',
}

export interface Permission {
  active?: boolean;
  code: string;
  currency?: Currency;
  orderApprovalPermissionType?: OrderApprovalPermissionType;
  orgUnit?: B2BUnit;
  periodRange?: Period;
  selected?: boolean;
  threshold?: number;
}
