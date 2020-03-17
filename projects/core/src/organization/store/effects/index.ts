import { BudgetEffects } from './budget.effect';
import { OrgUnitEffects } from './org-unit.effect';
import { PermissionEffects } from './permission.effect';
import { CostCenterEffects } from './cost-center.effect';
import { OrgUnitCustomerEffects } from './org-unit-customer.effect';

export const effects: any[] = [
  BudgetEffects,
  OrgUnitEffects,
  PermissionEffects,
  CostCenterEffects,
  OrgUnitCustomerEffects,
];

export * from './budget.effect';
export * from './org-unit.effect';
export * from './permission.effect';
export * from './cost-center.effect';
export * from './org-unit-customer.effect';
