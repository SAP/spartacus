import { BudgetEffects } from './budget.effect';
import { OrgUnitEffects } from './org-unit.effect';
import { PermissionEffects } from './permission.effect';
import { CostCenterEffects } from './cost-center.effect';
import { PermissionTypeEffects } from './permission-type.effect';

export const effects: any[] = [
  BudgetEffects,
  OrgUnitEffects,
  PermissionEffects,
  PermissionTypeEffects,
  CostCenterEffects,
];

export * from './budget.effect';
export * from './org-unit.effect';
export * from './permission.effect';
export * from './permission-type.effect';
export * from './cost-center.effect';
