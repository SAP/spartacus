import { Permission } from '../../../model/permission.model';
import { LoaderAction } from '../../../state/utils/loader/loader.action';
import * as PermissionActions from '../actions/permission.action';

export const permissionInitialState = {};
export const permissionsInitialState = undefined;

export function permissionsEntitiesReducer(
  state: Permission = permissionInitialState,
  action: LoaderAction
): Permission {
  switch (action.type) {
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
