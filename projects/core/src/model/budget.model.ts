import { Currency } from './misc.model';
import { B2BUnit } from './org-unit.model';
import { CostCenter } from './cost-center.model';

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
