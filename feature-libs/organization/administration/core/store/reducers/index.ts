import { InjectionToken, Provider } from '@angular/core';
import {
  Action,
  ActionReducer,
  ActionReducerMap,
  combineReducers,
  MetaReducer,
} from '@ngrx/store';
import {
  Address,
  AuthActions,
  B2BApprovalProcess,
  B2BUnit,
  B2BUser,
  CostCenter,
  ListModel,
  OrderApprovalPermissionType,
  SiteContextActions,
  StateUtils,
} from '@spartacus/core';
import { Budget } from '../../model/budget.model';
import { Permission } from '../../model/permission.model';
import { B2BUnitNode } from '../../model/unit-node.model';
import { UserGroup } from '../../model/user-group.model';
import { OrganizationActions } from '../actions';
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
  costCentersEntitiesReducer,
  costCentersListReducer,
} from './cost-center.reducer';
import {
  orgUnitAddressListReducer,
  orgUnitEntitiesReducer,
  orgUnitUserListReducer,
} from './org-unit.reducer';
import {
  permissionsEntitiesReducer,
  permissionsListReducer,
} from './permission.reducer';
import {
  userGroupAvailableOrderApprovalPermissionsListReducer,
  userGroupAvailablOrgCustomersListReducer,
  userGroupEntitiesReducer,
  userGroupsListReducer,
} from './user-group.reducer';

export function getReducers(): ActionReducerMap<OrganizationState> {
  return {
    [BUDGET_FEATURE]: combineReducers({
      entities: StateUtils.entityLoaderReducer<Budget>(
        BUDGET_ENTITIES,
        budgetsEntitiesReducer
      ),
      list: StateUtils.entityLoaderReducer<ListModel>(
        BUDGET_LIST,
        budgetsListReducer
      ),
    }),
    [PERMISSION_FEATURE]: combineReducers({
      entities: StateUtils.entityLoaderReducer<Permission>(
        PERMISSION_ENTITIES,
        permissionsEntitiesReducer
      ),
      list: StateUtils.entityLoaderReducer<ListModel>(
        PERMISSION_LIST,
        permissionsListReducer
      ),
      permissionTypes: StateUtils.entityLoaderReducer<
        OrderApprovalPermissionType[]
      >(PERMISSION_TYPES_LIST),
    }),
    [ORG_UNIT_FEATURE]: combineReducers({
      entities: StateUtils.entityLoaderReducer<B2BUnit>(
        ORG_UNIT_ENTITIES,
        orgUnitEntitiesReducer
      ),
      availableOrgUnitNodes:
        StateUtils.entityLoaderReducer<B2BUnitNode[]>(ORG_UNIT_NODE_LIST),
      tree: StateUtils.entityLoaderReducer<B2BUnitNode>(ORG_UNIT_TREE_ENTITY),
      approvalProcesses: StateUtils.entityLoaderReducer<B2BApprovalProcess[]>(
        ORG_UNIT_APPROVAL_PROCESSES_ENTITIES
      ),
      users: StateUtils.entityLoaderReducer<ListModel>(
        ORG_UNIT_ASSIGNED_USERS,
        orgUnitUserListReducer
      ),
      addressList: StateUtils.entityLoaderReducer<ListModel>(
        ADDRESS_LIST,
        orgUnitAddressListReducer
      ),
      addressEntities:
        StateUtils.entityLoaderReducer<Address>(ADDRESS_ENTITIES),
    }),
    [USER_GROUP_FEATURE]: combineReducers({
      entities: StateUtils.entityLoaderReducer<UserGroup>(
        USER_GROUP_ENTITIES,
        userGroupEntitiesReducer
      ),
      list: StateUtils.entityLoaderReducer<ListModel>(
        USER_GROUP_LIST,
        userGroupsListReducer
      ),
      permissions: StateUtils.entityLoaderReducer<ListModel>(
        USER_GROUP_PERMISSIONS,
        userGroupAvailableOrderApprovalPermissionsListReducer
      ),
      customers: StateUtils.entityLoaderReducer<ListModel>(
        USER_GROUP_AVAILABLE_CUSTOMERS,
        userGroupAvailablOrgCustomersListReducer
      ),
    }),
    [COST_CENTER_FEATURE]: combineReducers({
      entities: StateUtils.entityLoaderReducer<CostCenter>(
        COST_CENTER_ENTITIES,
        costCentersEntitiesReducer
      ),
      list: StateUtils.entityLoaderReducer<ListModel>(
        COST_CENTER_LIST,
        costCentersListReducer
      ),
      budgets: StateUtils.entityLoaderReducer<ListModel>(
        COST_CENTER_ASSIGNED_BUDGETS,
        costCenterAssignedBudgetsListReducer
      ),
    }),
    [B2B_USER_FEATURE]: combineReducers({
      entities: StateUtils.entityLoaderReducer<B2BUser>(
        B2B_USER_ENTITIES,
        b2bUserEntitiesReducer
      ),
      list: StateUtils.entityLoaderReducer<ListModel>(
        USER_LIST,
        userListReducer
      ),
      approvers: StateUtils.entityLoaderReducer<ListModel>(
        B2B_USER_APPROVERS,
        b2bUserApproverListReducer
      ),
      permissions: StateUtils.entityLoaderReducer<ListModel>(
        B2B_USER_PERMISSIONS,
        b2bUserPermissionListReducer
      ),
      userGroups: StateUtils.entityLoaderReducer<ListModel>(
        B2B_USER_USER_GROUPS,
        b2bUserUserGroupListReducer
      ),
    }),
  };
}

export const reducerToken: InjectionToken<ActionReducerMap<OrganizationState>> =
  new InjectionToken<ActionReducerMap<OrganizationState>>(
    'OrganizationReducers'
  );

export const reducerProvider: Provider = {
  provide: reducerToken,
  useFactory: getReducers,
};

export function clearOrganizationState(
  reducer: ActionReducer<OrganizationState, Action>
): ActionReducer<OrganizationState, Action> {
  return function (state, action) {
    if (action.type === OrganizationActions.CLEAR_ORGANIZATION_DATA) {
      state = undefined;
    }
    if (action.type === AuthActions.LOGOUT) {
      state = undefined;
    }
    if (action.type === SiteContextActions.LANGUAGE_CHANGE) {
      state = undefined;
    }

    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<any>[] = [clearOrganizationState];
