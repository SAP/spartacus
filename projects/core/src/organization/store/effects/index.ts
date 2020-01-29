import { BudgetEffects } from './budget.effect';
import { OrgUnitEffects } from './org-unit.effect';
import { PermissionEffects } from './permission.effect';

export const effects: any[] = [
  BudgetEffects,
  OrgUnitEffects,
  PermissionEffects,
];

export * from './budget.effect';
export * from './org-unit.effect';
export * from './permission.effect';
