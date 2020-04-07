import {
  OrderApprovalPermissionType,
  Permission,
} from '../../../model/permission.model';
import {
  EntityFailAction,
  EntityLoadAction,
  EntitySuccessAction,
} from '../../../state/utils/entity-loader/entity-loader.action';
import { B2BSearchConfig } from '../../model/search-config';
import { ALL, serializeB2BSearchConfig } from '../../utils/serializer';
import {
  PERMISSION_ENTITIES,
  PERMISSION_LIST,
  PERMISSION_TYPES,
  PERMISSION_TYPES_LIST,
} from '../organization-state';
import { ListModel } from '../../../model/misc.model';

export const LOAD_PERMISSION = '[Permission] Load Permission Data';
export const LOAD_PERMISSION_FAIL = '[Permission] Load Permission Data Fail';
export const LOAD_PERMISSION_SUCCESS =
  '[Permission] Load Permission Data Success';

export const LOAD_PERMISSIONS = '[Permission] Load Permissions';
export const LOAD_PERMISSIONS_FAIL = '[Permission] Load Permissions Fail';
export const LOAD_PERMISSIONS_SUCCESS = '[Permission] Load Permissions Success';

export const CREATE_PERMISSION = '[Permission] Create Permission';
export const CREATE_PERMISSION_FAIL = '[Permission] Create Permission Fail';
export const CREATE_PERMISSION_SUCCESS =
  '[Permission] Create Permission Success';

export const UPDATE_PERMISSION = '[Permission] Update Permission';
export const UPDATE_PERMISSION_FAIL = '[Permission] Update Permission Fail';
export const UPDATE_PERMISSION_SUCCESS =
  '[Permission] Update Permission Success';

export const LOAD_PERMISSION_TYPES = '[Permission Types] Load Permission Types';
export const LOAD_PERMISSION_TYPES_FAIL =
  '[Permission Types] Load Permission Types Fail';
export const LOAD_PERMISSION_TYPES_SUCCESS =
  '[Permission Types] Load Permission Types Success';

export class LoadPermission extends EntityLoadAction {
  readonly type = LOAD_PERMISSION;
  constructor(public payload: { userId: string; permissionCode: string }) {
    super(PERMISSION_ENTITIES, payload.permissionCode);
  }
}

export class LoadPermissionFail extends EntityFailAction {
  readonly type = LOAD_PERMISSION_FAIL;
  constructor(public payload: { permissionCode: string; error: any }) {
    super(PERMISSION_ENTITIES, payload.permissionCode, payload.error);
  }
}

export class LoadPermissionSuccess extends EntitySuccessAction {
  readonly type = LOAD_PERMISSION_SUCCESS;
  constructor(public payload: Permission[]) {
    super(
      PERMISSION_ENTITIES,
      payload.map(permission => permission.code)
    );
  }
}

export class LoadPermissions extends EntityLoadAction {
  readonly type = LOAD_PERMISSIONS;
  constructor(
    public payload: {
      userId: string;
      params: B2BSearchConfig;
    }
  ) {
    super(PERMISSION_LIST, serializeB2BSearchConfig(payload.params));
  }
}

export class LoadPermissionsFail extends EntityFailAction {
  readonly type = LOAD_PERMISSIONS_FAIL;
  constructor(public payload: { params: B2BSearchConfig; error: any }) {
    super(
      PERMISSION_LIST,
      serializeB2BSearchConfig(payload.params),
      payload.error
    );
  }
}

export class LoadPermissionsSuccess extends EntitySuccessAction {
  readonly type = LOAD_PERMISSIONS_SUCCESS;
  constructor(
    public payload: {
      page: ListModel;
      params: B2BSearchConfig;
    }
  ) {
    super(PERMISSION_LIST, serializeB2BSearchConfig(payload.params));
  }
}

export class CreatePermission extends EntityLoadAction {
  readonly type = CREATE_PERMISSION;
  constructor(public payload: { userId: string; permission: Permission }) {
    super(PERMISSION_ENTITIES, payload.permission.code);
  }
}

export class CreatePermissionFail extends EntityFailAction {
  readonly type = CREATE_PERMISSION_FAIL;
  constructor(public payload: { permissionCode: string; error: any }) {
    super(PERMISSION_ENTITIES, payload.permissionCode, payload.error);
  }
}

export class CreatePermissionSuccess extends EntitySuccessAction {
  readonly type = CREATE_PERMISSION_SUCCESS;
  constructor(public payload: Permission) {
    super(PERMISSION_ENTITIES, payload.code, payload);
  }
}

export class UpdatePermission extends EntityLoadAction {
  readonly type = UPDATE_PERMISSION;
  constructor(
    public payload: {
      userId: string;
      permissionCode: string;
      permission: Permission;
    }
  ) {
    super(PERMISSION_ENTITIES, payload.permission.code);
  }
}

export class UpdatePermissionFail extends EntityFailAction {
  readonly type = UPDATE_PERMISSION_FAIL;
  constructor(public payload: { permissionCode: string; error: any }) {
    super(PERMISSION_ENTITIES, payload.permissionCode, payload.error);
  }
}

export class UpdatePermissionSuccess extends EntitySuccessAction {
  readonly type = UPDATE_PERMISSION_SUCCESS;
  constructor(public payload: Permission) {
    super(PERMISSION_ENTITIES, payload.code, payload);
  }
}

export class LoadPermissionTypes extends EntityLoadAction {
  readonly type = LOAD_PERMISSION_TYPES;
  constructor() {
    super(PERMISSION_TYPES_LIST, PERMISSION_TYPES);
  }
}

export class LoadPermissionTypesFail extends EntityFailAction {
  readonly type = LOAD_PERMISSION_TYPES_FAIL;
  constructor(public payload: any) {
    super(PERMISSION_TYPES_LIST, ALL, payload.error);
  }
}

export class LoadPermissionTypesSuccess extends EntitySuccessAction {
  readonly type = LOAD_PERMISSION_TYPES_SUCCESS;
  constructor(public payload: OrderApprovalPermissionType[]) {
    super(PERMISSION_TYPES_LIST, PERMISSION_TYPES);
  }
}

export type PermissionAction =
  | LoadPermission
  | LoadPermissionFail
  | LoadPermissionSuccess
  | LoadPermissions
  | LoadPermissionsFail
  | LoadPermissionsSuccess
  | CreatePermission
  | CreatePermissionFail
  | CreatePermissionSuccess
  | UpdatePermission
  | UpdatePermissionFail
  | UpdatePermissionSuccess
  | LoadPermissionTypes
  | LoadPermissionTypesFail
  | LoadPermissionTypesSuccess;
