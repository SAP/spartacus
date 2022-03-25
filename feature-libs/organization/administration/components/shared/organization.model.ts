import { B2BUnit } from '@spartacus/core';

export enum OrganizationTableType {
  BUDGET = 'orgBudget',
  BUDGET_ASSIGNED_COST_CENTERS = 'orgBudgetAssignedCostCenters',
  COST_CENTER = 'orgCostCenter',
  COST_CENTER_BUDGETS = 'orgCostCenterBudgets',
  COST_CENTER_ASSIGNED_BUDGETS = 'orgCostCenterAssignedBudgets',
  UNIT = 'orgUnit',
  UNIT_USERS = 'orgUnitUsers',
  UNIT_CHILDREN = 'orgUnitChildren',
  UNIT_APPROVERS = 'orgUnitApprovers',
  UNIT_ASSIGNED_APPROVERS = 'orgUnitAssignedApprovers',
  UNIT_ADDRESS = 'orgUnitAddress',
  UNIT_COST_CENTERS = 'orgUnitCostCenters',
  USER_GROUP = 'orgUserGroup',
  USER_GROUP_USERS = 'orgUserGroupUsers',
  USER_GROUP_ASSIGNED_USERS = 'orgUserGroupAssignedUsers',
  USER_GROUP_PERMISSIONS = 'orgUserGroupPermissions',
  USER_GROUP_ASSIGNED_PERMISSIONS = 'orgUserGroupAssignedPermissions',
  USER = 'orgUser',
  USER_APPROVERS = 'orgUserApprovers',
  USER_ASSIGNED_APPROVERS = 'orgUserAssignedApprovers',
  USER_PERMISSIONS = 'orgUserPermissions',
  USER_ASSIGNED_PERMISSIONS = 'orgUserAssignedPermissions',
  USER_USER_GROUPS = 'orgUserUserGroups',
  USER_ASSIGNED_USER_GROUPS = 'orgUserAssignedUserGroups',
  PERMISSION = 'orgPurchaseLimit',
}

export type BaseItem = {
  code?: string;
  selected?: boolean;
  // tmp alternative "key"
  customerId?: string;
  uid?: string;
  id?: string;

  active?: boolean;
  // tmp alternative "orgUnit"
  orgUnit?: B2BUnit;
  parentOrgUnit?: B2BUnit;
  unit?: B2BUnit;
};
