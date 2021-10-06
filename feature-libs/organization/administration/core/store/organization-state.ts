import {
  Address,
  B2BApprovalProcess,
  B2BUnit,
  B2BUser,
  CostCenter,
  ListModel,
  OrderApprovalPermissionType,
  StateUtils,
} from '@spartacus/core';
import { Budget } from '../model/budget.model';
import { Permission } from '../model/permission.model';
import { B2BUnitNode } from '../model/unit-node.model';
import { UserGroup } from '../model/user-group.model';

export const ORGANIZATION_FEATURE = 'organization';

export const BUDGET_FEATURE = 'budget';
export const BUDGET_ENTITIES = 'budget-entities';
export const BUDGET_LIST = 'budget-list';

export const COST_CENTER_FEATURE = 'costCenter';
export const COST_CENTER_ENTITIES = 'costCenter-entities';
export const COST_CENTER_LIST = 'costCenter-list';
export const COST_CENTER_ASSIGNED_BUDGETS = 'costCenter-assigned-budgets';

export const PERMISSION_FEATURE = 'permission';
export const PERMISSION_ENTITIES = 'permission-entities';
export const PERMISSION_LIST = 'permission-list';

export const PERMISSION_TYPES = 'permission-types';
export const PERMISSION_TYPES_LIST = 'permission-types-list';

export const ORG_UNIT_FEATURE = 'orgUnit';
export const ORG_UNIT_NODE_ENTITIES = 'orgUnitNode-entities';
export const ORG_UNIT_NODE_LIST = 'orgUnitNode-list';
export const ORG_UNIT_ENTITIES = 'orgUnit-entities';
export const ORG_UNIT_TREE_ENTITY = 'orgUnit-tree';
export const ORG_UNIT_APPROVAL_PROCESSES_ENTITIES =
  'orgUnit-approval-processes';
export const ORG_UNIT_ASSIGNED_USERS = 'orgUnit-assigned-users';

export const ORG_UNIT_TREE = 'tree';
export const ORG_UNIT_APPROVAL_PROCESSES = 'approvalProcesses';
export const ORG_UNIT_NODES = 'availableOrgUnitNodes';

export const B2B_USER_FEATURE = 'b2bUser';
export const B2B_USER_ENTITIES = 'b2bUser-entities';
export const USER_LIST = 'b2bUser-list';
export const B2B_USER_APPROVERS = 'b2bUser-approvers';
export const B2B_USER_PERMISSIONS = 'b2bUser-permissions';
export const B2B_USER_USER_GROUPS = 'b2bUser-user-groups';

export const USER_GROUP_FEATURE = 'userGroup';
export const USER_GROUP_ENTITIES = 'userGroup-entities';
export const USER_GROUP_LIST = 'userGroup-list';
export const USER_GROUP_PERMISSIONS =
  'userGroup-available-order-approval-permissions';
export const USER_GROUP_AVAILABLE_CUSTOMERS =
  'userGroup-available-org-customers';
export const ADDRESS_ENTITIES = 'addresses-entities';
export const ADDRESS_LIST = 'addresses-list';

export interface Management<Type> extends StateUtils.EntityListState<Type> {}

export interface BudgetManagement extends Management<Budget> {}

export interface OrgUnits {
  availableOrgUnitNodes: StateUtils.EntityLoaderState<B2BUnitNode[]>;
  entities: StateUtils.EntityLoaderState<B2BUnit>;
  tree: StateUtils.EntityLoaderState<B2BUnitNode>;
  approvalProcesses: StateUtils.EntityLoaderState<B2BApprovalProcess[]>;
  users: StateUtils.EntityLoaderState<ListModel>;
  addressList: StateUtils.EntityLoaderState<ListModel>;
  addressEntities: StateUtils.EntityLoaderState<Address>;
}

export interface UserGroupManagement extends Management<UserGroup> {
  permissions: StateUtils.EntityLoaderState<ListModel>;
  customers: StateUtils.EntityLoaderState<ListModel>;
}

export interface PermissionManagement extends Management<Permission> {
  permissionTypes: StateUtils.EntityLoaderState<OrderApprovalPermissionType[]>;
}

export interface CostCenterManagement extends Management<CostCenter> {
  budgets: StateUtils.EntityLoaderState<ListModel>;
}

export interface B2BUserManagement extends Management<B2BUser> {
  approvers: StateUtils.EntityLoaderState<ListModel>;
  permissions: StateUtils.EntityLoaderState<ListModel>;
  userGroups: StateUtils.EntityLoaderState<ListModel>;
}

export interface StateWithOrganization {
  [ORGANIZATION_FEATURE]: OrganizationState;
}

export interface OrganizationState {
  [BUDGET_FEATURE]: BudgetManagement;
  [ORG_UNIT_FEATURE]: OrgUnits;
  [USER_GROUP_FEATURE]: UserGroupManagement;
  [PERMISSION_FEATURE]: PermissionManagement;
  [COST_CENTER_FEATURE]: CostCenterManagement;
  [B2B_USER_FEATURE]: B2BUserManagement;
}
