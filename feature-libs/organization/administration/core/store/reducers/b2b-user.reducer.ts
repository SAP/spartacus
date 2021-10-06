import {
  B2BUserActions,
  OrgUnitActions,
  UserGroupActions,
} from '../actions/index';
import { B2BUser, StateUtils } from '@spartacus/core';

export const b2bUserInitialState = undefined;
export const b2bUsersInitialState = undefined;

export function b2bUserEntitiesReducer(
  state: B2BUser = b2bUserInitialState,
  action: StateUtils.LoaderAction
): B2BUser {
  switch (action.type) {
    case B2BUserActions.LOAD_B2B_USER_SUCCESS:
    case B2BUserActions.CREATE_B2B_USER_SUCCESS:
    case B2BUserActions.UPDATE_B2B_USER_SUCCESS:
      return action.payload;
    case OrgUnitActions.ASSIGN_ROLE_SUCCESS:
    case OrgUnitActions.ASSIGN_APPROVER_SUCCESS:
      return {
        ...state,
        selected: action.payload?.selected,
        roles: [...(state?.roles || []), action.payload?.roleId],
      };
    case OrgUnitActions.UNASSIGN_ROLE_SUCCESS:
    case OrgUnitActions.UNASSIGN_APPROVER_SUCCESS:
      return {
        ...state,
        selected: action.payload?.selected,
        roles: [...(state?.roles || [])].filter(
          (role) => role !== action.payload?.roleId
        ),
      };
    case B2BUserActions.ASSIGN_B2B_USER_APPROVER_SUCCESS:
    case B2BUserActions.UNASSIGN_B2B_USER_APPROVER_SUCCESS:
    case UserGroupActions.USER_GROUP_ASSIGN_MEMBER_SUCCESS:
    case UserGroupActions.USER_GROUP_UNASSIGN_MEMBER_SUCCESS:
    case UserGroupActions.USER_GROUP_UNASSIGN_ALL_MEMBERS_SUCCESS:
      return {
        ...state,
        ...action.payload,
      };
  }
  return state;
}

export function userListReducer(
  state = b2bUsersInitialState,
  action: StateUtils.LoaderAction
): any {
  switch (action.type) {
    case B2BUserActions.LOAD_B2B_USERS_SUCCESS:
      return action.payload.page;
  }
  return state;
}

export function b2bUserApproverListReducer(
  state = b2bUsersInitialState,
  action: StateUtils.LoaderAction
): any {
  switch (action.type) {
    case B2BUserActions.LOAD_B2B_USER_APPROVERS_SUCCESS:
      return action.payload.page;
  }
  return state;
}

export function b2bUserPermissionListReducer(
  state = b2bUsersInitialState,
  action: StateUtils.LoaderAction
): any {
  switch (action.type) {
    case B2BUserActions.LOAD_B2B_USER_PERMISSIONS_SUCCESS:
      return action.payload.page;
  }
  return state;
}

export function b2bUserUserGroupListReducer(
  state = b2bUsersInitialState,
  action: StateUtils.LoaderAction
): any {
  switch (action.type) {
    case B2BUserActions.LOAD_B2B_USER_USER_GROUPS_SUCCESS:
      return action.payload.page;
  }
  return state;
}
