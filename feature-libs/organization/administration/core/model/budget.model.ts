import { Currency, B2BUnit, CostCenter } from '@spartacus/core';

export interface Budget {
  active?: boolean;
  budget?: number;
  code?: string;
  currency?: Currency;
  endDate?: string;
  startDate?: string;
  name?: string;
  orgUnit?: B2BUnit;
  costCenters?: CostCenter[];
  selected?: boolean;
}
