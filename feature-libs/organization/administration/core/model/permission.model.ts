import {
  B2BUnit,
  Currency,
  OrderApprovalPermissionType,
} from '@spartacus/core';

export enum Period {
  DAY = 'DAY',
  WEEK = 'WEEK',
  MONTH = 'MONTH',
  QUARTER = 'QUARTER',
  YEAR = 'YEAR',
}

export interface Permission {
  active?: boolean;
  code?: string;
  currency?: Currency;
  orderApprovalPermissionType?: OrderApprovalPermissionType;
  orgUnit?: B2BUnit;
  periodRange?: Period;
  selected?: boolean;
  threshold?: number;
}
