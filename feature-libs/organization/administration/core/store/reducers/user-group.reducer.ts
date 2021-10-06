import * as UserGroupActions from '../actions/user-group.action';
import { StateUtils } from '@spartacus/core';
import { B2BUserActions } from '../actions/index';
import { UserGroup } from '../../model/user-group.model';

export const userGroupInitialState = undefined;
export const userGroupsInitialState = undefined;

export function userGroupEntitiesReducer(
  state: UserGroup = userGroupInitialState,
  action: StateUtils.LoaderAction
): UserGroup {
  switch (action.type) {
    case UserGroupActions.LOAD_USER_GROUP_SUCCESS:
    case UserGroupActions.CREATE_USER_GROUP_SUCCESS:
    case UserGroupActions.UPDATE_USER_GROUP_SUCCESS:
      return action.payload;
    case B2BUserActions.ASSIGN_B2B_USER_USER_GROUP_SUCCESS:
    case B2BUserActions.UNASSIGN_B2B_USER_USER_GROUP_SUCCESS:
      return {
        ...state,
        ...action.payload,
      };
  }
  return state;
}

export function userGroupsListReducer(
  state = userGroupsInitialState,
  action: StateUtils.LoaderAction
): any {
  switch (action.type) {
    case UserGroupActions.LOAD_USER_GROUPS_SUCCESS:
      return action.payload.page;
  }
  return state;
}

export function userGroupAvailableOrderApprovalPermissionsListReducer(
  state = userGroupsInitialState,
  action: StateUtils.LoaderAction
): any {
  switch (action.type) {
    case UserGroupActions.LOAD_USER_GROUP_PERMISSIONS_SUCCESS:
      return action.payload.page;
  }
  return state;
}

export function userGroupAvailablOrgCustomersListReducer(
  state = userGroupsInitialState,
  action: StateUtils.LoaderAction
): any {
  switch (action.type) {
    case UserGroupActions.LOAD_USER_GROUP_AVAILABLE_CUSTOMERS_SUCCESS:
      return action.payload.page;
  }
  return state;
}
