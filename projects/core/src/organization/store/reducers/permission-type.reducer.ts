import { LoaderAction } from '../../../state/utils/loader/loader.action';
import * as PermissionTypeActions from '../actions/permission-type.action';
import { OrderApprovalPermissionType } from 'projects/core/src/model/permission.model';

export const permissionTypeInitialState = {};
export const permissionTypesInitialState = undefined;

export function permissionTypeEntitiesReducer(
  state: OrderApprovalPermissionType = permissionTypeInitialState,
  action: LoaderAction
): OrderApprovalPermissionType {
  switch (action.type) {
  }
  return state;
}

export function permissionTypeListReducer(
  state = permissionTypesInitialState,
  action: LoaderAction
): any {
  switch (action.type) {
    case PermissionTypeActions.LOAD_PERMISSION_TYPES_SUCCESS:
      return action.payload.page;
  }
  return state;
}
