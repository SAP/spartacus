import {
  ListModel,
  SearchConfig,
  StateUtils,
  OrderApprovalPermissionType,
} from '@spartacus/core';
import { Permission } from '../../model/permission.model';
import {
  PERMISSION_ENTITIES,
  PERMISSION_LIST,
  PERMISSION_TYPES,
  PERMISSION_TYPES_LIST,
} from '../organization-state';

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

export class LoadPermission extends StateUtils.EntityLoadAction {
  readonly type = LOAD_PERMISSION;
  constructor(public payload: { userId: string; permissionCode: string }) {
    super(PERMISSION_ENTITIES, payload.permissionCode);
  }
}

export class LoadPermissionFail extends StateUtils.EntityFailAction {
  readonly type = LOAD_PERMISSION_FAIL;
  constructor(public payload: { permissionCode: string; error: any }) {
    super(PERMISSION_ENTITIES, payload.permissionCode, payload.error);
  }
}

export class LoadPermissionSuccess extends StateUtils.EntitySuccessAction {
  readonly type = LOAD_PERMISSION_SUCCESS;
  constructor(public payload: Permission | Permission[]) {
    super(
      PERMISSION_ENTITIES,
      Array.isArray(payload)
        ? payload.map((permission) => permission?.code)
        : payload?.code
    );
  }
}

export class LoadPermissions extends StateUtils.EntityLoadAction {
  readonly type = LOAD_PERMISSIONS;
  constructor(
    public payload: {
      userId: string;
      params: SearchConfig;
    }
  ) {
    super(PERMISSION_LIST, StateUtils.serializeSearchConfig(payload.params));
  }
}

export class LoadPermissionsFail extends StateUtils.EntityFailAction {
  readonly type = LOAD_PERMISSIONS_FAIL;
  constructor(public payload: { params: SearchConfig; error: any }) {
    super(
      PERMISSION_LIST,
      StateUtils.serializeSearchConfig(payload.params),
      payload.error
    );
  }
}

export class LoadPermissionsSuccess extends StateUtils.EntitySuccessAction {
  readonly type = LOAD_PERMISSIONS_SUCCESS;
  constructor(
    public payload: {
      page: ListModel;
      params: SearchConfig;
    }
  ) {
    super(PERMISSION_LIST, StateUtils.serializeSearchConfig(payload.params));
  }
}

export class CreatePermission extends StateUtils.EntityLoadAction {
  readonly type = CREATE_PERMISSION;
  constructor(public payload: { userId: string; permission: Permission }) {
    super(PERMISSION_ENTITIES, payload.permission.code);
  }
}

export class CreatePermissionFail extends StateUtils.EntityFailAction {
  readonly type = CREATE_PERMISSION_FAIL;
  constructor(public payload: { permissionCode: string; error: any }) {
    super(PERMISSION_ENTITIES, payload.permissionCode, payload.error);
  }
}

export class CreatePermissionSuccess extends StateUtils.EntitySuccessAction {
  readonly type = CREATE_PERMISSION_SUCCESS;
  constructor(public payload: Permission) {
    super(PERMISSION_ENTITIES, payload.code, payload);
  }
}

export class UpdatePermission extends StateUtils.EntityLoadAction {
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

export class UpdatePermissionFail extends StateUtils.EntityFailAction {
  readonly type = UPDATE_PERMISSION_FAIL;
  constructor(public payload: { permissionCode: string; error: any }) {
    super(PERMISSION_ENTITIES, payload.permissionCode, payload.error);
  }
}

export class UpdatePermissionSuccess extends StateUtils.EntitySuccessAction {
  readonly type = UPDATE_PERMISSION_SUCCESS;
  constructor(public payload: Permission) {
    super(PERMISSION_ENTITIES, payload.code, payload);
  }
}

export class LoadPermissionTypes extends StateUtils.EntityLoadAction {
  readonly type = LOAD_PERMISSION_TYPES;
  constructor() {
    super(PERMISSION_TYPES_LIST, PERMISSION_TYPES);
  }
}

export class LoadPermissionTypesFail extends StateUtils.EntityFailAction {
  readonly type = LOAD_PERMISSION_TYPES_FAIL;
  constructor(public payload: any) {
    super(PERMISSION_TYPES_LIST, PERMISSION_TYPES, payload.error);
  }
}

export class LoadPermissionTypesSuccess extends StateUtils.EntitySuccessAction {
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
