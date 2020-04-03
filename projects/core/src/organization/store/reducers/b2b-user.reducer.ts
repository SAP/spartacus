import { LoaderAction } from '../../../state/utils/loader/loader.action';
import {
  B2BUserActions,
  OrgUnitActions,
  OrgUnitUserGroupActions,
} from '../actions/index';
import { B2BUser } from '../../../model/org-unit.model';

export const b2bUserInitialState = {};
export const b2bUsersInitialState = undefined;

export function b2bUserEntitiesReducer(
  state: B2BUser = b2bUserInitialState,
  action: LoaderAction
): B2BUser {
  switch (action.type) {
    case B2BUserActions.LOAD_B2B_USER_SUCCESS:
      return action.payload;
    case OrgUnitActions.ASSIGN_ROLE_SUCCESS:
      return {
        ...state,
        selected: action.payload.selected,
        roles: [...state.roles, action.payload.roleId],
      };
    case OrgUnitActions.UNASSIGN_ROLE_SUCCESS:
      return {
        ...state,
        selected: action.payload.selected,
        roles: [...state.roles].filter(role => role !== action.payload.roleId),
      };
    case OrgUnitUserGroupActions.CREATE_ORG_UNIT_USER_GROUP_MEMBER_SUCCESS:
    case OrgUnitUserGroupActions.DELETE_ORG_UNIT_USER_GROUP_MEMBER_SUCCESS:
    case OrgUnitUserGroupActions.DELETE_ORG_UNIT_USER_GROUP_MEMBERS_SUCCESS:
      return {
        ...state,
        ...action.payload,
      };
  }
  return state;
}

export function userListReducer(
  state = b2bUsersInitialState,
  action: LoaderAction
): any {
  switch (action.type) {
    case B2BUserActions.LOAD_B2B_USERS_SUCCESS:
      return action.payload.page;
  }
  return state;
}

export function b2bUserApproverListReducer(
  state = b2bUsersInitialState,
  action: LoaderAction
): any {
  switch (action.type) {
    case B2BUserActions.LOAD_B2B_USER_APPROVERS_SUCCESS:
      return action.payload.page;
  }
  return state;
}

export function b2bUserPermissionListReducer(
  state = b2bUsersInitialState,
  action: LoaderAction
): any {
  switch (action.type) {
    case B2BUserActions.LOAD_B2B_USER_PERMISSIONS_SUCCESS:
      return action.payload.page;
  }
  return state;
}

export function b2bUserUserGroupListReducer(
  state = b2bUsersInitialState,
  action: LoaderAction
): any {
  switch (action.type) {
    case B2BUserActions.LOAD_B2B_USER_USER_GROUPS_SUCCESS:
      return action.payload.page;
  }
  return state;
}
