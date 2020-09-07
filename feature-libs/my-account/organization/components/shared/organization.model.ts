export enum OrganizationTableType {
  BUDGET = 'budget',
  BUDGET_COST_CENTERS = 'budgetCostCenters',
  COST_CENTER = 'costCenter',
  COST_CENTER_BUDGETS = 'costCenterBudgets',
  COST_CENTER_ASSIGN_BUDGETS = 'costCenterAssignBudgets',
  UNIT_USERS = 'unitUsers',
  UNIT_CHILDREN = 'unitChildren',
  UNIT_APPROVERS = 'unitApprovers',
  UNIT_ASSIGN_APPROVERS = 'unitAssignApprovers',
  UNIT_ASSIGN_ROLES = 'unitAssignRoles',
  UNIT_MANAGE_ADDRESSES = 'unitManageAddresses',
  UNIT_COST_CENTERS = 'unitCostCenters',
  USER_GROUP = 'userGroup',
  USER_GROUP_USERS = 'userGroupUsers',
  USER_GROUP_ASSIGN_USERS = 'userGroupAssignUsers',
  USER_GROUP_PERMISSIONS = 'userGroupPermissions',
  USER_GROUP_ASSIGN_PERMISSIONS = 'userGroupAssignPermissions',
  USER = 'user',
  USER_APPROVERS = 'userApprovers',
  USER_ASSIGN_APPROVERS = 'userAssignApprovers',
  USER_PERMISSIONS = 'userPermissions',
  USER_ASSIGN_PERMISSIONS = 'userAssignPermissions',
  USER_USER_GROUPS = 'userUserGroups',
  USER_ASSIGN_USER_GROUPS = 'userAssignUserGroups',
  PERMISSION = 'permission',
  ORDER_APPROVAL = 'orderApproval',
}

export enum UnitRoleType {
  CUSTOMER = 'b2bcustomergroup',
  APPROVER = 'b2bapprovergroup',
  MANAGER = 'b2bmanagergroup',
  ADMIN = 'b2badmingroup',
}

export type BaseItem = {
  code?: string;
  active?: boolean;
  orgUnit?: any;
};
