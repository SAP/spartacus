import { BudgetEffects } from './budget.effect';
import { OrgUnitEffects } from './org-unit.effect';
import { PermissionEffects } from './permission.effect';
import { CostCenterEffects } from './cost-center.effect';
import { B2BUserEffects } from './b2b-user.effect';
import { UserGroupEffects } from './user-group.effect';
import { OrderApprovalEffects } from './order-approval.effect';

export const effects: any[] = [
  BudgetEffects,
  OrgUnitEffects,
  UserGroupEffects,
  PermissionEffects,
  CostCenterEffects,
  B2BUserEffects,
  OrderApprovalEffects,
];

export * from './budget.effect';
export * from './org-unit.effect';
export * from './user-group.effect';
export * from './permission.effect';
export * from './cost-center.effect';
export * from './b2b-user.effect';
export * from './order-approval.effect';
