import { B2BUnit } from '@spartacus/core';

export interface CostCenter {
  active?: string;
  activeFlag?: boolean;
  code?: string;
  name?: string;
  originalCode?: string;
  unit?: B2BUnit;
}
