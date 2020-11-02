import { StateUtils, OrderApprovalPermissionType } from '@spartacus/core';
import { Permission } from '../../model/permission.model';
import {
  PERMISSION_ENTITIES,
  PERMISSION_LIST,
  PERMISSION_TYPES,
  PERMISSION_TYPES_LIST,
} from '../organization-state';
import { PermissionActions } from './index';

const permissionCode = 'testPermissionId';
const permission: Permission = {
  code: permissionCode,
};

const permissionType: OrderApprovalPermissionType = {
  code: 'testPermissionTypeCode',
  name: 'testPermissionTypeName',
};
const permissionTypes: OrderApprovalPermissionType[] = [permissionType];

const userId = 'xxx@xxx.xxx';
const error = 'anError';
const params = { currentPage: 2 };
const query = '?pageSize=&currentPage=2&sort=';

const pagination = { currentPage: 1 };
const sorts = [{ selected: true, name: 'code' }];
const page = { ids: [permissionCode], pagination, sorts };

describe('Permission Actions', () => {
  describe('LoadPermission Actions', () => {
    describe('LoadPermission', () => {
      it('should create the action', () => {
        const action = new PermissionActions.LoadPermission({
          userId,
          permissionCode,
        });

        expect({ ...action }).toEqual({
          type: PermissionActions.LOAD_PERMISSION,
          payload: { userId, permissionCode },
          meta: StateUtils.entityLoadMeta(PERMISSION_ENTITIES, permissionCode),
        });
      });
    });

    describe('LoadPermissionFail', () => {
      it('should create the action', () => {
        const action = new PermissionActions.LoadPermissionFail({
          permissionCode,
          error,
        });

        expect({ ...action }).toEqual({
          type: PermissionActions.LOAD_PERMISSION_FAIL,
          payload: {
            permissionCode,
            error,
          },
          meta: StateUtils.entityFailMeta(
            PERMISSION_ENTITIES,
            permissionCode,
            error
          ),
        });
      });
    });

    describe('LoadPermissionSuccess', () => {
      it('should create the action', () => {
        const action = new PermissionActions.LoadPermissionSuccess([
          permission,
        ]);

        expect({ ...action }).toEqual({
          type: PermissionActions.LOAD_PERMISSION_SUCCESS,
          payload: [permission],
          meta: StateUtils.entitySuccessMeta(PERMISSION_ENTITIES, [
            permissionCode,
          ]),
        });
      });
    });
  });

  describe('LoadPermissions Actions', () => {
    describe('LoadPermissions', () => {
      it('should create the action', () => {
        const action = new PermissionActions.LoadPermissions({
          userId,
          params,
        });

        expect({ ...action }).toEqual({
          type: PermissionActions.LOAD_PERMISSIONS,
          payload: { userId, params },
          meta: StateUtils.entityLoadMeta(PERMISSION_LIST, query),
        });
      });
    });

    describe('LoadPermissionsFail', () => {
      it('should create the action', () => {
        const action = new PermissionActions.LoadPermissionsFail({
          params,
          error: { error },
        });

        expect({ ...action }).toEqual({
          type: PermissionActions.LOAD_PERMISSIONS_FAIL,
          payload: { params, error: { error } },
          meta: StateUtils.entityFailMeta(PERMISSION_LIST, query, {
            error,
          }),
        });
      });
    });

    describe('LoadPermissionsSuccess', () => {
      it('should create the action', () => {
        const action = new PermissionActions.LoadPermissionsSuccess({
          page,
          params,
        });

        expect({ ...action }).toEqual({
          type: PermissionActions.LOAD_PERMISSIONS_SUCCESS,
          payload: { page, params },
          meta: StateUtils.entitySuccessMeta(PERMISSION_LIST, query),
        });
      });
    });
  });

  describe('CreatePermission Actions', () => {
    describe('CreatePermission', () => {
      it('should create the action', () => {
        const action = new PermissionActions.CreatePermission({
          userId,
          permission,
        });

        expect({ ...action }).toEqual({
          type: PermissionActions.CREATE_PERMISSION,
          payload: { userId, permission },
          meta: StateUtils.entityLoadMeta(PERMISSION_ENTITIES, permissionCode),
        });
      });
    });

    describe('CreatePermissionFail', () => {
      it('should create the action', () => {
        const action = new PermissionActions.CreatePermissionFail({
          permissionCode,
          error,
        });

        expect({ ...action }).toEqual({
          type: PermissionActions.CREATE_PERMISSION_FAIL,
          payload: {
            permissionCode,
            error,
          },
          meta: StateUtils.entityFailMeta(
            PERMISSION_ENTITIES,
            permissionCode,
            error
          ),
        });
      });
    });

    describe('CreatePermissionSuccess', () => {
      it('should create the action', () => {
        const action = new PermissionActions.CreatePermissionSuccess(
          permission
        );

        expect({ ...action }).toEqual({
          type: PermissionActions.CREATE_PERMISSION_SUCCESS,
          payload: permission,
          meta: StateUtils.entitySuccessMeta(
            PERMISSION_ENTITIES,
            permissionCode
          ),
        });
      });
    });
  });

  describe('UpdatePermission Actions', () => {
    describe('UpdatePermission', () => {
      it('should create the action', () => {
        const action = new PermissionActions.UpdatePermission({
          userId,
          permissionCode,
          permission,
        });

        expect({ ...action }).toEqual({
          type: PermissionActions.UPDATE_PERMISSION,
          payload: { userId, permissionCode, permission },
          meta: StateUtils.entityLoadMeta(PERMISSION_ENTITIES, permissionCode),
        });
      });
    });

    describe('UpdatePermissionFail', () => {
      it('should create the action', () => {
        const action = new PermissionActions.UpdatePermissionFail({
          permissionCode,
          error,
        });

        expect({ ...action }).toEqual({
          type: PermissionActions.UPDATE_PERMISSION_FAIL,
          payload: {
            permissionCode,
            error,
          },
          meta: StateUtils.entityFailMeta(
            PERMISSION_ENTITIES,
            permissionCode,
            error
          ),
        });
      });
    });

    describe('UpdatePermissionSuccess', () => {
      it('should create the action', () => {
        const action = new PermissionActions.UpdatePermissionSuccess(
          permission
        );

        expect({ ...action }).toEqual({
          type: PermissionActions.UPDATE_PERMISSION_SUCCESS,
          payload: permission,
          meta: StateUtils.entitySuccessMeta(
            PERMISSION_ENTITIES,
            permissionCode
          ),
        });
      });
    });
  });

  describe('LoadPermissionTypes Actions', () => {
    describe('LoadPermissionTypes', () => {
      it('should execute LoadPermissionTypes action', () => {
        const action = new PermissionActions.LoadPermissionTypes();

        expect({ ...action }).toEqual({
          type: PermissionActions.LOAD_PERMISSION_TYPES,
          meta: StateUtils.entityLoadMeta(
            PERMISSION_TYPES_LIST,
            PERMISSION_TYPES
          ),
        });
      });
    });

    describe('LoadPermissionTypesFail', () => {
      it('should execute LoadPermissionTypesFail action', () => {
        const action = new PermissionActions.LoadPermissionTypesFail({
          permissionCode,
          error,
        });

        expect({ ...action }).toEqual({
          type: PermissionActions.LOAD_PERMISSION_TYPES_FAIL,
          payload: {
            permissionCode,
            error,
          },
          meta: StateUtils.entityFailMeta(
            PERMISSION_TYPES_LIST,
            PERMISSION_TYPES,
            error
          ),
        });
      });
    });

    describe('LoadPermissionTypesSuccess', () => {
      it('should execute LoadPermissionTypesSuccess action', () => {
        const action = new PermissionActions.LoadPermissionTypesSuccess(
          permissionTypes
        );

        expect({ ...action }).toEqual({
          type: PermissionActions.LOAD_PERMISSION_TYPES_SUCCESS,
          payload: permissionTypes,
          meta: StateUtils.entitySuccessMeta(
            PERMISSION_TYPES_LIST,
            PERMISSION_TYPES
          ),
        });
      });
    });
  });
});
