import { B2BUnit } from './org-unit.model';

export interface CostCenter {
  active?: string;
  activeFlag?: boolean;
  code?: string;
  name?: string;
  originalCode?: string;
  unit?: B2BUnit;
}
