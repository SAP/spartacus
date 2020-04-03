import { Permission } from '../../../model/permission.model';
import { LoaderAction } from '../../../state/utils/loader/loader.action';
import { PermissionActions, UserGroupActions } from '../actions/index';

export const permissionInitialState = {};
export const permissionsInitialState = undefined;

export function permissionsEntitiesReducer(
  state: Permission = permissionInitialState,
  action: LoaderAction
): Permission {
  switch (action.type) {
    case PermissionActions.LOAD_PERMISSION_SUCCESS:
    case PermissionActions.CREATE_PERMISSION_SUCCESS:
    case PermissionActions.UPDATE_PERMISSION_SUCCESS:
      return action.payload;
    case UserGroupActions.CREATE_ORG_UNIT_USER_GROUP_ORDER_APPROVAL_PERMISSION_SUCCESS:
    case UserGroupActions.DELETE_ORG_UNIT_USER_GROUP_ORDER_APPROVAL_PERMISSION_SUCCESS:
      return {
        ...state,
        ...action.payload,
      };
  }
  return state;
}

export function permissionsListReducer(
  state = permissionsInitialState,
  action: LoaderAction
): any {
  switch (action.type) {
    case PermissionActions.LOAD_PERMISSIONS_SUCCESS:
      return action.payload.page;
  }
  return state;
}
