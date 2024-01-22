/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { B2BUserEffects } from './b2b-user.effect';
import { BudgetEffects } from './budget.effect';
import { CostCenterEffects } from './cost-center.effect';
import { OrgUnitEffects } from './org-unit.effect';
import { PermissionEffects } from './permission.effect';
import { UserGroupEffects } from './user-group.effect';

export const effects: any[] = [
  BudgetEffects,
  OrgUnitEffects,
  UserGroupEffects,
  PermissionEffects,
  CostCenterEffects,
  B2BUserEffects,
];

export * from './b2b-user.effect';
export * from './budget.effect';
export * from './cost-center.effect';
export * from './org-unit.effect';
export * from './permission.effect';
export * from './user-group.effect';
