import {
  EntityFailAction,
  EntityLoadAction,
  EntitySuccessAction,
} from '../../../state/utils/entity-loader/entity-loader.action';
import {
  PERMISSION_TYPES_ENTITIES,
  PERMISSION_TYPES_LIST,
} from '../organization-state';
import { ALL } from '../../utils/serializer';
import { ListModel } from 'projects/core/src/model/misc.model';
import { OrderApprovalPermissionType } from 'projects/core/src/model/permission.model';

export const LOAD_PERMISSION_TYPES = '[Permission Types] Load Permission Types';
export const LOAD_PERMISSION_TYPES_FAIL =
  '[Permission Types] Load Permission Types Fail';
export const LOAD_PERMISSION_TYPES_SUCCESS =
  '[Permission Types] Load Permission Types Success';

export class LoadPermissionTypes extends EntityLoadAction {
  readonly type = LOAD_PERMISSION_TYPES;
  constructor() {
    super(PERMISSION_TYPES_LIST, ALL);
  }
}

export class LoadPermissionTypesFail extends EntityFailAction {
  readonly type = LOAD_PERMISSION_TYPES_FAIL;
  constructor(public payload: any) {
    super(PERMISSION_TYPES_LIST, ALL, payload.error);
  }
}

export class LoadPermissionTypeSuccess extends EntitySuccessAction {
  readonly type = LOAD_PERMISSION_TYPES_SUCCESS;
  constructor(public payload: OrderApprovalPermissionType[]) {
    super(
      PERMISSION_TYPES_ENTITIES,
      payload.map(permissionType => permissionType.code)
    );
  }
}

export class LoadPermissionTypesSuccess extends EntitySuccessAction {
  readonly type = LOAD_PERMISSION_TYPES_SUCCESS;
  constructor(public payload: { page: ListModel }) {
    super(PERMISSION_TYPES_LIST, ALL);
  }
}

export type PermissionAction =
  | LoadPermissionTypes
  | LoadPermissionTypesFail
  | LoadPermissionTypeSuccess
  | LoadPermissionTypesSuccess;
