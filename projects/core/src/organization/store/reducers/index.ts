import { InjectionToken, Provider } from '@angular/core';
import { ActionReducerMap, combineReducers } from '@ngrx/store';
import {
  B2BAddress,
  B2BApprovalProcess,
  B2BUnit,
  B2BUnitNode,
  B2BUser,
  Budget,
  CostCenter,
  ListModel,
  OrderApprovalPermissionType,
  Permission,
  UserGroup,
} from '../../../model';
import { entityLoaderReducer } from '../../../state/utils/entity-loader/entity-loader.reducer';
import {
  ADDRESS_ENTITIES,
  ADDRESS_LIST,
  B2B_USER_APPROVERS,
  B2B_USER_ENTITIES,
  B2B_USER_FEATURE,
  B2B_USER_PERMISSIONS,
  B2B_USER_USER_GROUPS,
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
  PERMISSION_ENTITIES,
  PERMISSION_FEATURE,
  PERMISSION_LIST,
  PERMISSION_TYPES_ENTITIES,
  PERMISSION_TYPES_FEATURE,
  PERMISSION_TYPES_LIST,
  USER_GROUP_AVAILABLE_CUSTOMERS,
  USER_GROUP_ENTITIES,
  USER_GROUP_FEATURE,
  USER_GROUP_LIST,
  USER_GROUP_PERMISSIONS,
  USER_LIST,
} from '../organization-state';
import {
  b2bUserApproverListReducer,
  b2bUserEntitiesReducer,
  b2bUserPermissionListReducer,
  b2bUserUserGroupListReducer,
  userListReducer,
} from './b2b-user.reducer';
import { budgetsEntitiesReducer, budgetsListReducer } from './budget.reducer';
import {
  costCenterAssignedBudgetsListReducer,
  costCentersListReducer,
} from './cost-center.reducer';
import {
  orgUnitAddressListReducer,
  orgUnitUserListReducer,
} from './org-unit.reducer';
import { permissionTypeListReducer } from './permission-type.reducer';
import {
  permissionsEntitiesReducer,
  permissionsListReducer,
} from './permission.reducer';
import {
  userGroupAvailableOrderApprovalPermissionsListReducer,
  userGroupAvailablOrgCustomersListReducer,
  userGroupsListReducer,
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
      entities: entityLoaderReducer<Permission>(
        PERMISSION_ENTITIES,
        permissionsEntitiesReducer
      ),
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
      addressList: entityLoaderReducer<ListModel>(
        ADDRESS_LIST,
        orgUnitAddressListReducer
      ),
      addressEntities: entityLoaderReducer<B2BAddress>(ADDRESS_ENTITIES),
    }),
    [USER_GROUP_FEATURE]: combineReducers({
      entities: entityLoaderReducer<UserGroup>(USER_GROUP_ENTITIES),
      list: entityLoaderReducer<ListModel>(
        USER_GROUP_LIST,
        userGroupsListReducer
      ),
      permissions: entityLoaderReducer<ListModel>(
        USER_GROUP_PERMISSIONS,
        userGroupAvailableOrderApprovalPermissionsListReducer
      ),
      customers: entityLoaderReducer<ListModel>(
        USER_GROUP_AVAILABLE_CUSTOMERS,
        userGroupAvailablOrgCustomersListReducer
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
