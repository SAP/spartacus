export enum OrganizationTableType {
  BUDGET = 'budget',
  BUDGET_ASSIGNED_COST_CENTERS = 'budgetAssignedCostCenters',
  COST_CENTER = 'costCenter',
  COST_CENTER_BUDGETS = 'costCenterBudgets',
  COST_CENTER_ASSIGNED_BUDGETS = 'costCenterAssignedBudgets',
  UNIT = 'unit',
  UNIT_USERS = 'unitUsers',
  UNIT_CHILDREN = 'unitChildren',
  UNIT_APPROVERS = 'unitApprovers',
  UNIT_ASSIGNED_APPROVERS = 'unitAssignedApprovers',
  UNIT_ASSIGNED_ROLES = 'unitAssignRoles',
  UNIT_ADDRESS = 'unitAddress',
  UNIT_COST_CENTERS = 'unitCostCenters',
  USER_GROUP = 'userGroup',
  USER_GROUP_USERS = 'userGroupUsers',
  USER_GROUP_ASSIGNED_USERS = 'userGroupAssignedUsers',
  USER_GROUP_PERMISSIONS = 'userGroupPermissions',
  USER_GROUP_ASSIGNED_PERMISSIONS = 'userGroupAssignedPermissions',
  USER = 'user',
  USER_APPROVERS = 'userApprovers',
  USER_ASSIGNED_APPROVERS = 'userAssignedApprovers',
  USER_PERMISSIONS = 'userPermissions',
  USER_ASSIGNED_PERMISSIONS = 'userAssignedPermissions',
  USER_USER_GROUPS = 'userUserGroups',
  USER_ASSIGNED_USER_GROUPS = 'userAssignedUserGroups',
  PERMISSION = 'permission',
  ORDER_APPROVAL = 'orderApproval', // #9423
}

export type BaseItem = {
  code?: string;
  selected?: boolean;
  // tmp alternative "key"
  customerId?: string;
  id?: string;

  active?: boolean;
  orgUnit?: any;
};
