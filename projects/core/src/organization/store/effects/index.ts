import { BudgetEffects } from './budget.effect';
import { OrgUnitEffects } from './org-unit.effect';
import { PermissionEffects } from './permission.effect';
import { CostCenterEffects } from './cost-center.effect';
import { OrgUnitUserGroupEffects } from './user-group.effect';

export const effects: any[] = [
  BudgetEffects,
  OrgUnitEffects,
  OrgUnitUserGroupEffects,
  PermissionEffects,
  CostCenterEffects,
];

export * from './budget.effect';
export * from './org-unit.effect';
export * from './user-group.effect';
export * from './permission.effect';
export * from './cost-center.effect';
