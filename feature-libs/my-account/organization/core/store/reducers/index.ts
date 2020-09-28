import { InjectionToken, Provider } from '@angular/core';
import {
  Action,
  ActionReducer,
  ActionReducerMap,
  combineReducers,
  MetaReducer,
} from '@ngrx/store';
import {
  AuthActions,
  B2BAddress,
  B2BApprovalProcess,
  B2BUnit,
  B2BUser,
  CostCenter,
  ListModel,
  StateUtils,
} from '@spartacus/core';
import { Budget } from '../../model/budget.model';
import { OrderApproval } from '../../model/order-approval.model';
import {
  OrderApprovalPermissionType,
  Permission,
} from '../../model/permission.model';
import { B2BUnitNode } from '../../model/unit-node.model';
import { UserGroup } from '../../model/user-group.model';
import {
  B2BUserActions,
  BudgetActions,
  CostCenterActions,
  OrgUnitActions,
  PermissionActions,
  UserGroupActions,
} from '../actions';
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
  ORDER_APPROVAL_ENTITIES,
  ORDER_APPROVAL_FEATURE,
  ORDER_APPROVAL_LIST,
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
  costCentersListReducer,
} from './cost-center.reducer';
import {
  orderApprovalsEntitiesReducer,
  orderApprovalsListReducer,
} from './order-approval.reducer';
import {
  orgUnitAddressListReducer,
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
      entities: StateUtils.entityLoaderReducer<B2BUnit>(ORG_UNIT_ENTITIES),
      availableOrgUnitNodes: StateUtils.entityLoaderReducer<B2BUnitNode[]>(
        ORG_UNIT_NODE_LIST
      ),
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
      addressEntities: StateUtils.entityLoaderReducer<B2BAddress>(
        ADDRESS_ENTITIES
      ),
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
        COST_CENTER_ENTITIES
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
    [ORDER_APPROVAL_FEATURE]: combineReducers({
      entities: StateUtils.entityLoaderReducer<OrderApproval>(
        ORDER_APPROVAL_ENTITIES,
        orderApprovalsEntitiesReducer
      ),
      list: StateUtils.entityLoaderReducer<ListModel>(
        ORDER_APPROVAL_LIST,
        orderApprovalsListReducer
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

export function clearOrganizationState(
  reducer: ActionReducer<OrganizationState, Action>
): ActionReducer<OrganizationState, Action> {
  return function (state, action) {
    const allowedActionsForClear = [
      BudgetActions.CREATE_BUDGET_FAIL,
      BudgetActions.CREATE_BUDGET_SUCCESS,
      BudgetActions.UPDATE_BUDGET_FAIL,
      BudgetActions.UPDATE_BUDGET_SUCCESS,

      CostCenterActions.CREATE_COST_CENTER_FAIL,
      CostCenterActions.CREATE_COST_CENTER_SUCCESS,
      CostCenterActions.UPDATE_COST_CENTER_FAIL,
      CostCenterActions.UPDATE_COST_CENTER_SUCCESS,
      CostCenterActions.ASSIGN_BUDGET_FAIL,
      CostCenterActions.ASSIGN_BUDGET_SUCCESS,
      CostCenterActions.UNASSIGN_BUDGET_FAIL,
      CostCenterActions.UNASSIGN_BUDGET_SUCCESS,

      OrgUnitActions.CREATE_ORG_UNIT_FAIL,
      OrgUnitActions.CREATE_ORG_UNIT_SUCCESS,
      OrgUnitActions.UPDATE_ORG_UNIT_FAIL,
      OrgUnitActions.UPDATE_ORG_UNIT_SUCCESS,
      OrgUnitActions.ASSIGN_APPROVER_FAIL,
      OrgUnitActions.ASSIGN_APPROVER_SUCCESS,
      OrgUnitActions.UNASSIGN_APPROVER_FAIL,
      OrgUnitActions.UNASSIGN_APPROVER_SUCCESS,
      OrgUnitActions.CREATE_ADDRESS_FAIL,
      OrgUnitActions.CREATE_ADDRESS_SUCCESS,
      OrgUnitActions.UPDATE_ADDRESS_FAIL,
      OrgUnitActions.UPDATE_ADDRESS_SUCCESS,

      PermissionActions.CREATE_PERMISSION_FAIL,
      PermissionActions.CREATE_PERMISSION_SUCCESS,
      PermissionActions.UPDATE_PERMISSION_FAIL,
      PermissionActions.UPDATE_PERMISSION_SUCCESS,

      UserGroupActions.CREATE_USER_GROUP_FAIL,
      UserGroupActions.CREATE_USER_GROUP_SUCCESS,
      UserGroupActions.UPDATE_USER_GROUP_FAIL,
      UserGroupActions.UPDATE_USER_GROUP_SUCCESS,
      UserGroupActions.USER_GROUP_ASSIGN_MEMBER_FAIL,
      UserGroupActions.USER_GROUP_ASSIGN_MEMBER_SUCCESS,
      UserGroupActions.USER_GROUP_UNASSIGN_MEMBER_FAIL,
      UserGroupActions.USER_GROUP_UNASSIGN_MEMBER_SUCCESS,
      UserGroupActions.USER_GROUP_UNASSIGN_ALL_MEMBERS_FAIL,
      UserGroupActions.USER_GROUP_UNASSIGN_ALL_MEMBERS_SUCCESS,
      UserGroupActions.USER_GROUP_ASSIGN_PERMISSION_FAIL,
      UserGroupActions.USER_GROUP_ASSIGN_PERMISSION_SUCCESS,
      UserGroupActions.USER_GROUP_UNASSIGN_PERMISSION_FAIL,
      UserGroupActions.USER_GROUP_UNASSIGN_PERMISSION_SUCCESS,
      UserGroupActions.DELETE_USER_GROUP_FAIL,
      UserGroupActions.DELETE_USER_GROUP_SUCCESS,

      B2BUserActions.CREATE_B2B_USER_FAIL,
      B2BUserActions.CREATE_B2B_USER_SUCCESS,
      B2BUserActions.UPDATE_B2B_USER_FAIL,
      B2BUserActions.UPDATE_B2B_USER_SUCCESS,
      B2BUserActions.CREATE_B2B_USER_APPROVER_FAIL,
      B2BUserActions.CREATE_B2B_USER_APPROVER_SUCCESS,
      B2BUserActions.DELETE_B2B_USER_APPROVER_FAIL,
      B2BUserActions.DELETE_B2B_USER_APPROVER_SUCCESS,
      B2BUserActions.CREATE_B2B_USER_PERMISSION_FAIL,
      B2BUserActions.CREATE_B2B_USER_PERMISSION_SUCCESS,
      B2BUserActions.DELETE_B2B_USER_PERMISSION_FAIL,
      B2BUserActions.DELETE_B2B_USER_PERMISSION_SUCCESS,
      B2BUserActions.CREATE_B2B_USER_USER_GROUP_FAIL,
      B2BUserActions.CREATE_B2B_USER_USER_GROUP_SUCCESS,
      B2BUserActions.DELETE_B2B_USER_USER_GROUP_FAIL,
      B2BUserActions.DELETE_B2B_USER_USER_GROUP_SUCCESS,
    ];
    if (allowedActionsForClear.includes(action.type)) {
      state = undefined;
    }
    if (action.type === AuthActions.LOGOUT) {
      state = undefined;
    }

    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<any>[] = [clearOrganizationState];
