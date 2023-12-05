import { Address, B2BApprovalProcess, B2BUnit, B2BUser, CostCenter, ListModel, OrderApprovalPermissionType, StateUtils } from '@spartacus/core';
import { Budget } from '../model/budget.model';
import { Permission } from '../model/permission.model';
import { B2BUnitNode } from '../model/unit-node.model';
import { UserGroup } from '../model/user-group.model';
export declare const ORGANIZATION_FEATURE = "organization";
export declare const BUDGET_FEATURE = "budget";
export declare const BUDGET_ENTITIES = "budget-entities";
export declare const BUDGET_LIST = "budget-list";
export declare const COST_CENTER_FEATURE = "costCenter";
export declare const COST_CENTER_ENTITIES = "costCenter-entities";
export declare const COST_CENTER_LIST = "costCenter-list";
export declare const COST_CENTER_ASSIGNED_BUDGETS = "costCenter-assigned-budgets";
export declare const PERMISSION_FEATURE = "permission";
export declare const PERMISSION_ENTITIES = "permission-entities";
export declare const PERMISSION_LIST = "permission-list";
export declare const PERMISSION_TYPES = "permission-types";
export declare const PERMISSION_TYPES_LIST = "permission-types-list";
export declare const ORG_UNIT_FEATURE = "orgUnit";
export declare const ORG_UNIT_NODE_ENTITIES = "orgUnitNode-entities";
export declare const ORG_UNIT_NODE_LIST = "orgUnitNode-list";
export declare const ORG_UNIT_ENTITIES = "orgUnit-entities";
export declare const ORG_UNIT_TREE_ENTITY = "orgUnit-tree";
export declare const ORG_UNIT_APPROVAL_PROCESSES_ENTITIES = "orgUnit-approval-processes";
export declare const ORG_UNIT_ASSIGNED_USERS = "orgUnit-assigned-users";
export declare const ORG_UNIT_TREE = "tree";
export declare const ORG_UNIT_APPROVAL_PROCESSES = "approvalProcesses";
export declare const ORG_UNIT_NODES = "availableOrgUnitNodes";
export declare const B2B_USER_FEATURE = "b2bUser";
export declare const B2B_USER_ENTITIES = "b2bUser-entities";
export declare const USER_LIST = "b2bUser-list";
export declare const B2B_USER_APPROVERS = "b2bUser-approvers";
export declare const B2B_USER_PERMISSIONS = "b2bUser-permissions";
export declare const B2B_USER_USER_GROUPS = "b2bUser-user-groups";
export declare const USER_GROUP_FEATURE = "userGroup";
export declare const USER_GROUP_ENTITIES = "userGroup-entities";
export declare const USER_GROUP_LIST = "userGroup-list";
export declare const USER_GROUP_PERMISSIONS = "userGroup-available-order-approval-permissions";
export declare const USER_GROUP_AVAILABLE_CUSTOMERS = "userGroup-available-org-customers";
export declare const ADDRESS_ENTITIES = "addresses-entities";
export declare const ADDRESS_LIST = "addresses-list";
export interface Management<Type> extends StateUtils.EntityListState<Type> {
}
export interface BudgetManagement extends Management<Budget> {
}
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
