import { B2BUnit } from './org-unit.model';
import { Currency } from './misc.model';

export interface CostCenter {
  active?: string;
  activeFlag?: boolean;
  code?: string;
  name?: string;
  originalCode?: string;
  unit?: B2BUnit;
  currency?: Currency;
}
