import { InjectionToken, Provider } from '@angular/core';
import { ActionReducerMap, combineReducers } from '@ngrx/store';
import {
  Budget,
  B2BUnitNode,
  ListModel,
  Permission,
  CostCenter,
  B2BUnit,
  B2BApprovalProcess,
  OrgUnitUserGroup,
  B2BUser,
} from '../../../model';
import { entityLoaderReducer } from '../../../state/utils/entity-loader/entity-loader.reducer';
import {
  OrganizationState,
  BUDGET_ENTITIES,
  BUDGET_FEATURE,
  BUDGET_LIST,
  ORG_UNIT_FEATURE,
  ORG_UNIT_NODE_LIST,
  PERMISSION_ENTITIES,
  PERMISSION_FEATURE,
  PERMISSION_LIST,
  COST_CENTER_FEATURE,
  COST_CENTER_ENTITIES,
  COST_CENTER_LIST,
  COST_CENTER_ASSIGNED_BUDGETS,
  ORG_UNIT_USER_GROUP_ENTITIES,
  ORG_UNIT_USER_GROUP_FEATURE,
  ORG_UNIT_USER_GROUP_LIST,
  ORG_UNIT_USER_GROUP_AVAILABLE_ORDER_APPROVAL_PERMISSIONS,
  ORG_UNIT_USER_GROUP_AVAILABLE_ORG_CUSTOMERS,
  ORG_UNIT_ENTITIES,
  ORG_UNIT_APPROVAL_PROCESSES_ENTITIES,
  ORG_UNIT_TREE_ENTITY,
  B2B_USER_FEATURE,
  B2B_USER_ENTITIES,
  USER_LIST,
  ORG_UNIT_ASSIGNED_USERS,
  B2B_USER_APPROVERS,
  B2B_USER_PERMISSIONS,
  B2B_USER_USER_GROUPS,
} from '../organization-state';
import { budgetsListReducer, budgetsEntitiesReducer } from './budget.reducer';
import {
  permissionsListReducer,
  permissionsEntitiesReducer,
} from './permission.reducer';
import {
  costCentersListReducer,
  costCenterAssignedBudgetsListReducer,
} from './cost-center.reducer';
import {
  userListReducer,
  b2bUserEntitiesReducer,
  b2bUserApproverListReducer,
  b2bUserPermissionListReducer,
  b2bUserUserGroupListReducer,
} from './b2b-user.reducer';
import {
  orgUnitUserGroupAvailableOrderApprovalPermissionsListReducer,
  orgUnitUserGroupAvailablOrgCustomersListReducer,
  orgUnitUserGroupsListReducer,
} from './user-group.reducer';
import { orgUnitUserListReducer } from './org-unit.reducer';

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
      entities: entityLoaderReducer<Permission>(
        PERMISSION_ENTITIES,
        permissionsEntitiesReducer
      ),
      list: entityLoaderReducer<ListModel>(
        PERMISSION_LIST,
        permissionsListReducer
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
    [B2B_USER_FEATURE]: combineReducers({
      entities: entityLoaderReducer<B2BUser>(
        B2B_USER_ENTITIES,
        b2bUserEntitiesReducer
      ),
      list: entityLoaderReducer<ListModel>(USER_LIST, userListReducer),
      approvers: entityLoaderReducer<ListModel>(
        B2B_USER_APPROVERS,
        b2bUserApproverListReducer
      ),
      permissions: entityLoaderReducer<ListModel>(
        B2B_USER_PERMISSIONS,
        b2bUserPermissionListReducer
      ),
      userGroups: entityLoaderReducer<ListModel>(
        B2B_USER_USER_GROUPS,
        b2bUserUserGroupListReducer
      ),
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
