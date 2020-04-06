import { InjectionToken, Provider } from '@angular/core';
import { ActionReducerMap, combineReducers } from '@ngrx/store';
import {
  B2BApprovalProcess,
  B2BUnit,
  B2BUnitNode,
  B2BUser,
  Budget,
  CostCenter,
  ListModel,
  OrderApprovalPermissionType,
  OrgUnitUserGroup,
  Permission,
} from '../../../model';
import { entityLoaderReducer } from '../../../state/utils/entity-loader/entity-loader.reducer';
import {
  B2B_USER_ENTITIES,
  B2B_USER_FEATURE,
  BUDGET_ENTITIES,
  BUDGET_FEATURE,
  BUDGET_LIST,
  COST_CENTER_ASSIGNED_BUDGETS,
  COST_CENTER_ENTITIES,
  COST_CENTER_FEATURE,
  COST_CENTER_LIST,
  OrganizationState,
  ORG_UNIT_APPROVAL_PROCESSES_ENTITIES,
  ORG_UNIT_ASSIGNED_USERS,
  ORG_UNIT_ENTITIES,
  ORG_UNIT_FEATURE,
  ORG_UNIT_NODE_LIST,
  ORG_UNIT_TREE_ENTITY,
  ORG_UNIT_USER_GROUP_AVAILABLE_ORDER_APPROVAL_PERMISSIONS,
  ORG_UNIT_USER_GROUP_AVAILABLE_ORG_CUSTOMERS,
  ORG_UNIT_USER_GROUP_ENTITIES,
  ORG_UNIT_USER_GROUP_FEATURE,
  ORG_UNIT_USER_GROUP_LIST,
  PERMISSION_ENTITIES,
  PERMISSION_FEATURE,
  PERMISSION_LIST,
  PERMISSION_TYPES_ENTITIES,
  PERMISSION_TYPES_FEATURE,
  PERMISSION_TYPES_LIST,
  USER_LIST,
} from '../organization-state';
import { b2bUserEntitiesReducer, userListReducer } from './b2b-user.reducer';
import { budgetsEntitiesReducer, budgetsListReducer } from './budget.reducer';
import {
  costCenterAssignedBudgetsListReducer,
  costCentersListReducer,
} from './cost-center.reducer';
import { orgUnitUserListReducer } from './org-unit.reducer';
import { permissionTypeListReducer } from './permission-type.reducer';
import { permissionsListReducer } from './permission.reducer';
import {
  orgUnitUserGroupAvailableOrderApprovalPermissionsListReducer,
  orgUnitUserGroupAvailablOrgCustomersListReducer,
  orgUnitUserGroupsListReducer,
} from './user-group.reducer';

export function getReducers(): ActionReducerMap<OrganizationState> {
  return {
    [BUDGET_FEATURE]: combineReducers({
      entities: entityLoaderReducer<Budget>(
        BUDGET_ENTITIES,
        budgetsEntitiesReducer
      ),
      list: entityLoaderReducer<ListModel>(BUDGET_LIST, budgetsListReducer),
    }),
    [PERMISSION_FEATURE]: combineReducers({
      entities: entityLoaderReducer<Permission>(PERMISSION_ENTITIES),
      list: entityLoaderReducer<ListModel>(
        PERMISSION_LIST,
        permissionsListReducer
      ),
      permissionTypes: entityLoaderReducer<OrderApprovalPermissionType[]>(
        PERMISSION_TYPES_FEATURE
      ),
    }),
    [ORG_UNIT_FEATURE]: combineReducers({
      entities: entityLoaderReducer<B2BUnit>(ORG_UNIT_ENTITIES),
      availableOrgUnitNodes: entityLoaderReducer<B2BUnitNode[]>(
        ORG_UNIT_NODE_LIST
      ),
      tree: entityLoaderReducer<B2BUnitNode>(ORG_UNIT_TREE_ENTITY),
      approvalProcesses: entityLoaderReducer<B2BApprovalProcess[]>(
        ORG_UNIT_APPROVAL_PROCESSES_ENTITIES
      ),
      users: entityLoaderReducer<ListModel>(
        ORG_UNIT_ASSIGNED_USERS,
        orgUnitUserListReducer
      ),
    }),
    [ORG_UNIT_USER_GROUP_FEATURE]: combineReducers({
      entities: entityLoaderReducer<OrgUnitUserGroup>(
        ORG_UNIT_USER_GROUP_ENTITIES
      ),
      list: entityLoaderReducer<ListModel>(
        ORG_UNIT_USER_GROUP_LIST,
        orgUnitUserGroupsListReducer
      ),
      permissions: entityLoaderReducer<ListModel>(
        ORG_UNIT_USER_GROUP_AVAILABLE_ORDER_APPROVAL_PERMISSIONS,
        orgUnitUserGroupAvailableOrderApprovalPermissionsListReducer
      ),
      customers: entityLoaderReducer<ListModel>(
        ORG_UNIT_USER_GROUP_AVAILABLE_ORG_CUSTOMERS,
        orgUnitUserGroupAvailablOrgCustomersListReducer
      ),
    }),
    [COST_CENTER_FEATURE]: combineReducers({
      entities: entityLoaderReducer<CostCenter>(COST_CENTER_ENTITIES),
      list: entityLoaderReducer<ListModel>(
        COST_CENTER_LIST,
        costCentersListReducer
      ),
      budgets: entityLoaderReducer<ListModel>(
        COST_CENTER_ASSIGNED_BUDGETS,
        costCenterAssignedBudgetsListReducer
      ),
    }),
    [PERMISSION_TYPES_FEATURE]: combineReducers({
      entities: entityLoaderReducer<OrderApprovalPermissionType[]>(
        PERMISSION_TYPES_ENTITIES
      ),
      list: entityLoaderReducer<ListModel>(
        PERMISSION_TYPES_LIST,
        permissionTypeListReducer
      ),
    }),
    [B2B_USER_FEATURE]: combineReducers({
      entities: entityLoaderReducer<B2BUser>(
        B2B_USER_ENTITIES,
        b2bUserEntitiesReducer
      ),
      list: entityLoaderReducer<ListModel>(USER_LIST, userListReducer),
    }),
  };
}

export const reducerToken: InjectionToken<ActionReducerMap<
  OrganizationState
>> = new InjectionToken<ActionReducerMap<OrganizationState>>(
  'OrganizationReducers'
);

export const reducerProvider: Provider = {
  provide: reducerToken,
  useFactory: getReducers,
};
