import { LoaderAction } from '../../../state/utils/loader/loader.action';
import * as UserGroupActions from '../actions/user-group.action';
import { UserGroup } from '../../../model/user-group.model';
import { B2BUserActions } from '../actions/index';
export const userGroupInitialState = {};
export const userGroupsInitialState = undefined;

export function userGroupEntitiesReducer(
  state: UserGroup = userGroupInitialState,
  action: LoaderAction
): UserGroup {
  switch (action.type) {
    case UserGroupActions.LOAD_USER_GROUP_SUCCESS:
    case UserGroupActions.CREATE_USER_GROUP_SUCCESS:
    case UserGroupActions.UPDATE_USER_GROUP_SUCCESS:
      return action.payload;
    case B2BUserActions.CREATE_B2B_USER_USER_GROUP_SUCCESS:
    case B2BUserActions.DELETE_B2B_USER_USER_GROUP_SUCCESS:
      return {
        ...state,
        ...action.payload,
      };
  }
  return state;
}

export function userGroupsListReducer(
  state = userGroupsInitialState,
  action: LoaderAction
): any {
  switch (action.type) {
    case UserGroupActions.LOAD_USER_GROUPS_SUCCESS:
      return action.payload.page;
  }
  return state;
}

export function userGroupAvailableOrderApprovalPermissionsListReducer(
  state = userGroupsInitialState,
  action: LoaderAction
): any {
  switch (action.type) {
    case UserGroupActions.LOAD_USER_GROUP_PERMISSIONS_SUCCESS:
      return action.payload.page;
  }
  return state;
}

export function userGroupAvailablOrgCustomersListReducer(
  state = userGroupsInitialState,
  action: LoaderAction
): any {
  switch (action.type) {
    case UserGroupActions.LOAD_USER_GROUP_AVAILABLE_CUSTOMERS_SUCCESS:
      return action.payload.page;
  }
  return state;
}
