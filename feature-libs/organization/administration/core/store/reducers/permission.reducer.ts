import { StateUtils } from '@spartacus/core';
import { Permission } from '../../model/permission.model';
import {
  B2BUserActions,
  PermissionActions,
  UserGroupActions,
} from '../actions/index';

export const permissionInitialState = undefined;
export const permissionsInitialState = undefined;

export function permissionsEntitiesReducer(
  state: Permission = permissionInitialState,
  action: StateUtils.LoaderAction
): Permission {
  switch (action.type) {
    case PermissionActions.LOAD_PERMISSION_SUCCESS:
    case PermissionActions.CREATE_PERMISSION_SUCCESS:
    case PermissionActions.UPDATE_PERMISSION_SUCCESS:
      return action.payload;
    case UserGroupActions.USER_GROUP_ASSIGN_PERMISSION_SUCCESS:
    case UserGroupActions.USER_GROUP_UNASSIGN_PERMISSION_SUCCESS:
    case B2BUserActions.ASSIGN_B2B_USER_PERMISSION_SUCCESS:
    case B2BUserActions.UNASSIGN_B2B_USER_PERMISSION_SUCCESS:
      return {
        ...state,
        ...action.payload,
      };
  }
  return state;
}

export function permissionsListReducer(
  state = permissionsInitialState,
  action: StateUtils.LoaderAction
): any {
  switch (action.type) {
    case PermissionActions.LOAD_PERMISSIONS_SUCCESS:
      return action.payload.page;
  }
  return state;
}
