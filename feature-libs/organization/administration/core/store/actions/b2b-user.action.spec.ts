import {
  B2B_USER_ENTITIES,
  USER_LIST,
  B2B_USER_APPROVERS,
  B2B_USER_PERMISSIONS,
  B2B_USER_USER_GROUPS,
  PERMISSION_ENTITIES,
  USER_GROUP_ENTITIES,
} from '../organization-state';
import { B2BUser, StateUtils } from '@spartacus/core';
import { B2BUserActions } from './index';

const orgCustomerId = 'orgCustomerId';
const orgCustomer: B2BUser = {
  active: true,
  customerId: orgCustomerId,
  uid: 'aaa@bbb',
  name: 'test',
};

const userId = 'userId';
const approverId = 'approverId';
const userGroupId = 'userGroupId';
const permissionId = 'permissionId';
const selected = true;
const error = 'anError';
const params = { currentPage: 2 };
const query = '?pageSize=&currentPage=2&sort=';

const pagination = { currentPage: 1 };
const sorts = [{ selected: true, name: 'code' }];
const page = { ids: [orgCustomerId], pagination, sorts };

describe('B2BUser Actions', () => {
  describe('LoadB2BUser Actions', () => {
    describe('LoadB2BUser', () => {
      it('should create the action', () => {
        const action = new B2BUserActions.LoadB2BUser({
          userId,
          orgCustomerId,
        });

        expect({ ...action }).toEqual({
          type: B2BUserActions.LOAD_B2B_USER,
          payload: { userId, orgCustomerId },
          meta: StateUtils.entityLoadMeta(B2B_USER_ENTITIES, orgCustomerId),
        });
      });
    });

    describe('LoadB2BUserFail', () => {
      it('should create the action', () => {
        const action = new B2BUserActions.LoadB2BUserFail({
          orgCustomerId,
          error,
        });

        expect({ ...action }).toEqual({
          type: B2BUserActions.LOAD_B2B_USER_FAIL,
          payload: { orgCustomerId, error },
          meta: StateUtils.entityFailMeta(
            B2B_USER_ENTITIES,
            orgCustomerId,
            error
          ),
        });
      });
    });

    describe('LoadB2BUserSuccess', () => {
      it('should create the action', () => {
        const action = new B2BUserActions.LoadB2BUserSuccess([orgCustomer]);

        expect({ ...action }).toEqual({
          type: B2BUserActions.LOAD_B2B_USER_SUCCESS,
          payload: [orgCustomer],
          meta: StateUtils.entitySuccessMeta(B2B_USER_ENTITIES, [
            orgCustomerId,
          ]),
        });
      });
    });
  });

  describe('LoadB2BUsers Actions', () => {
    describe('LoadB2BUsers', () => {
      it('should create the action', () => {
        const action = new B2BUserActions.LoadB2BUsers({
          userId,
          params,
        });

        expect({ ...action }).toEqual({
          type: B2BUserActions.LOAD_B2B_USERS,
          payload: { userId, params },
          meta: StateUtils.entityLoadMeta(USER_LIST, query),
        });
      });
    });

    describe('LoadB2BUsersFail', () => {
      it('should create the action', () => {
        const action = new B2BUserActions.LoadB2BUsersFail({
          params,
          error: { error },
        });

        expect({ ...action }).toEqual({
          type: B2BUserActions.LOAD_B2B_USERS_FAIL,
          payload: { params, error: { error } },
          meta: StateUtils.entityFailMeta(USER_LIST, query, {
            error,
          }),
        });
      });
    });

    describe('LoadB2BUsersSuccess', () => {
      it('should create the action', () => {
        const action = new B2BUserActions.LoadB2BUsersSuccess({
          page,
          params,
        });

        expect({ ...action }).toEqual({
          type: B2BUserActions.LOAD_B2B_USERS_SUCCESS,
          payload: { page, params },
          meta: StateUtils.entitySuccessMeta(USER_LIST, query),
        });
      });
    });
  });

  describe('CreateB2BUser Actions', () => {
    describe('CreateB2BUser', () => {
      it('should create the action', () => {
        const action = new B2BUserActions.CreateB2BUser({
          userId,
          orgCustomer,
        });

        expect({ ...action }).toEqual({
          type: B2BUserActions.CREATE_B2B_USER,
          payload: { userId, orgCustomer },
          meta: StateUtils.entityLoadMeta(
            B2B_USER_ENTITIES,
            orgCustomer.customerId
          ),
        });
      });
    });

    describe('CreateB2BUserFail', () => {
      it('should create the action', () => {
        const action = new B2BUserActions.CreateB2BUserFail({
          orgCustomerId,
          error,
        });

        expect({ ...action }).toEqual({
          type: B2BUserActions.CREATE_B2B_USER_FAIL,
          payload: {
            orgCustomerId,
            error,
          },
          meta: StateUtils.entityFailMeta(
            B2B_USER_ENTITIES,
            orgCustomerId,
            error
          ),
        });
      });
    });

    describe('CreateB2BUserSuccess', () => {
      it('should create the action', () => {
        const action = new B2BUserActions.CreateB2BUserSuccess(orgCustomer);

        expect({ ...action }).toEqual({
          type: B2BUserActions.CREATE_B2B_USER_SUCCESS,
          payload: orgCustomer,
          meta: StateUtils.entitySuccessMeta(B2B_USER_ENTITIES, orgCustomerId),
        });
      });
    });
  });

  describe('UpdateB2BUser Actions', () => {
    describe('UpdateB2BUser', () => {
      it('should create the action', () => {
        const action = new B2BUserActions.UpdateB2BUser({
          userId,
          orgCustomerId,
          orgCustomer,
        });

        expect({ ...action }).toEqual({
          type: B2BUserActions.UPDATE_B2B_USER,
          payload: { userId, orgCustomerId, orgCustomer },
          meta: StateUtils.entityLoadMeta(B2B_USER_ENTITIES, orgCustomerId),
        });
      });
    });

    describe('UpdateB2BUserFail', () => {
      it('should create the action', () => {
        const action = new B2BUserActions.UpdateB2BUserFail({
          orgCustomerId,
          error,
        });

        expect({ ...action }).toEqual({
          type: B2BUserActions.UPDATE_B2B_USER_FAIL,
          payload: {
            orgCustomerId,
            error,
          },
          meta: StateUtils.entityFailMeta(
            B2B_USER_ENTITIES,
            orgCustomerId,
            error
          ),
        });
      });
    });

    describe('UpdateB2BUserSuccess', () => {
      it('should create the action', () => {
        const action = new B2BUserActions.UpdateB2BUserSuccess(orgCustomer);

        expect({ ...action }).toEqual({
          type: B2BUserActions.UPDATE_B2B_USER_SUCCESS,
          payload: orgCustomer,
          meta: StateUtils.entitySuccessMeta(B2B_USER_ENTITIES, orgCustomerId),
        });
      });
    });
  });

  describe('B2BUserApprovers Actions', () => {
    describe('LoadB2BUserApprovers', () => {
      it('should create the action', () => {
        const action = new B2BUserActions.LoadB2BUserApprovers({
          userId,
          orgCustomerId,
          params,
        });

        expect({ ...action }).toEqual({
          type: B2BUserActions.LOAD_B2B_USER_APPROVERS,
          payload: { userId, orgCustomerId, params },
          meta: StateUtils.entityLoadMeta(
            B2B_USER_APPROVERS,
            `${orgCustomerId}${query}`
          ),
        });
      });
    });

    describe('LoadB2BUserApproversFail', () => {
      it('should create the action', () => {
        const action = new B2BUserActions.LoadB2BUserApproversFail({
          orgCustomerId,
          params,
          error,
        });

        expect({ ...action }).toEqual({
          type: B2BUserActions.LOAD_B2B_USER_APPROVERS_FAIL,
          payload: {
            orgCustomerId,
            params,
            error,
          },
          meta: StateUtils.entityFailMeta(
            B2B_USER_APPROVERS,
            `${orgCustomerId}${query}`,
            error
          ),
        });
      });
    });

    describe('LoadB2BUserApproversSuccess', () => {
      it('should create the action', () => {
        const action = new B2BUserActions.LoadB2BUserApproversSuccess({
          orgCustomerId,
          page,
          params,
        });

        expect({ ...action }).toEqual({
          type: B2BUserActions.LOAD_B2B_USER_APPROVERS_SUCCESS,
          payload: {
            orgCustomerId,
            page,
            params,
          },
          meta: StateUtils.entitySuccessMeta(
            B2B_USER_APPROVERS,
            `${orgCustomerId}${query}`
          ),
        });
      });
    });

    describe('CreateB2BUserApprover', () => {
      it('should create the action', () => {
        const action = new B2BUserActions.AssignB2BUserApprover({
          userId,
          orgCustomerId,
          approverId,
        });

        expect({ ...action }).toEqual({
          type: B2BUserActions.ASSIGN_B2B_USER_APPROVER,
          payload: { userId, orgCustomerId, approverId },
          meta: StateUtils.entityLoadMeta(B2B_USER_ENTITIES, approverId),
        });
      });
    });

    describe('CreateB2BUserApproverFail', () => {
      it('should create the action', () => {
        const action = new B2BUserActions.AssignB2BUserApproverFail({
          orgCustomerId,
          approverId,
          error,
        });

        expect({ ...action }).toEqual({
          type: B2BUserActions.ASSIGN_B2B_USER_APPROVER_FAIL,
          payload: {
            orgCustomerId,
            approverId,
            error,
          },
          meta: StateUtils.entityFailMeta(B2B_USER_ENTITIES, approverId),
        });
      });
    });

    describe('CreateB2BUserApproverSuccess', () => {
      it('should create the action', () => {
        const action = new B2BUserActions.AssignB2BUserApproverSuccess({
          approverId,
          selected,
        });

        expect({ ...action }).toEqual({
          type: B2BUserActions.ASSIGN_B2B_USER_APPROVER_SUCCESS,
          payload: { approverId, selected },
          meta: StateUtils.entitySuccessMeta(B2B_USER_ENTITIES, approverId),
        });
      });
    });

    describe('DeleteB2BUserApprover', () => {
      it('should create the action', () => {
        const action = new B2BUserActions.UnassignB2BUserApprover({
          userId,
          orgCustomerId,
          approverId,
        });

        expect({ ...action }).toEqual({
          type: B2BUserActions.UNASSIGN_B2B_USER_APPROVER,
          payload: { userId, orgCustomerId, approverId },
          meta: StateUtils.entityLoadMeta(B2B_USER_ENTITIES, approverId),
        });
      });
    });

    describe('DeleteB2BUserApproverFail', () => {
      it('should create the action', () => {
        const action = new B2BUserActions.UnassignB2BUserApproverFail({
          orgCustomerId,
          approverId,
          error,
        });

        expect({ ...action }).toEqual({
          type: B2BUserActions.UNASSIGN_B2B_USER_APPROVER_FAIL,
          payload: {
            orgCustomerId,
            approverId,
            error,
          },
          meta: StateUtils.entityFailMeta(B2B_USER_ENTITIES, approverId),
        });
      });
    });

    describe('DeleteB2BUserApproverSuccess', () => {
      it('should create the action', () => {
        const action = new B2BUserActions.UnassignB2BUserApproverSuccess({
          approverId,
          selected,
        });

        expect({ ...action }).toEqual({
          type: B2BUserActions.UNASSIGN_B2B_USER_APPROVER_SUCCESS,
          payload: { approverId, selected },
          meta: StateUtils.entitySuccessMeta(B2B_USER_ENTITIES, approverId),
        });
      });
    });
  });

  describe('B2BUserPermissions Actions', () => {
    describe('Load B2BUser Permissions', () => {
      it('should create the action', () => {
        const action = new B2BUserActions.LoadB2BUserPermissions({
          userId,
          orgCustomerId,
          params,
        });

        expect({ ...action }).toEqual({
          type: B2BUserActions.LOAD_B2B_USER_PERMISSIONS,
          payload: { userId, orgCustomerId, params },
          meta: StateUtils.entityLoadMeta(
            B2B_USER_PERMISSIONS,
            `${orgCustomerId}${query}`
          ),
        });
      });
    });

    describe('LoadB2BUserPermissionsFail', () => {
      it('should create the action', () => {
        const action = new B2BUserActions.LoadB2BUserPermissionsFail({
          orgCustomerId,
          params,
          error,
        });

        expect({ ...action }).toEqual({
          type: B2BUserActions.LOAD_B2B_USER_PERMISSIONS_FAIL,
          payload: {
            orgCustomerId,
            params,
            error,
          },
          meta: StateUtils.entityFailMeta(
            B2B_USER_PERMISSIONS,
            orgCustomerId,
            error
          ),
        });
      });
    });

    describe('LoadB2BUserPermissionsSuccess', () => {
      it('should create the action', () => {
        const action = new B2BUserActions.LoadB2BUserPermissionsSuccess({
          orgCustomerId,
          page,
          params,
        });

        expect({ ...action }).toEqual({
          type: B2BUserActions.LOAD_B2B_USER_PERMISSIONS_SUCCESS,
          payload: {
            orgCustomerId,
            page,
            params,
          },
          meta: StateUtils.entitySuccessMeta(
            B2B_USER_PERMISSIONS,
            `${orgCustomerId}${query}`
          ),
        });
      });
    });

    describe('CreateB2BUserPermission', () => {
      it('should create the action', () => {
        const action = new B2BUserActions.AssignB2BUserPermission({
          userId,
          orgCustomerId,
          permissionId,
        });

        expect({ ...action }).toEqual({
          type: B2BUserActions.ASSIGN_B2B_USER_PERMISSION,
          payload: { userId, orgCustomerId, permissionId },
          meta: StateUtils.entityLoadMeta(PERMISSION_ENTITIES, permissionId),
        });
      });
    });

    describe('CreateB2BUserPermissionFail', () => {
      it('should create the action', () => {
        const action = new B2BUserActions.AssignB2BUserPermissionFail({
          orgCustomerId,
          permissionId,
          error,
        });

        expect({ ...action }).toEqual({
          type: B2BUserActions.ASSIGN_B2B_USER_PERMISSION_FAIL,
          payload: {
            orgCustomerId,
            permissionId,
            error,
          },
          meta: StateUtils.entityFailMeta(
            PERMISSION_ENTITIES,
            permissionId,
            error
          ),
        });
      });
    });

    describe('CreateB2BUserPermissionSuccess', () => {
      it('should create the action', () => {
        const action = new B2BUserActions.AssignB2BUserPermissionSuccess({
          permissionId,
          selected,
        });

        expect({ ...action }).toEqual({
          type: B2BUserActions.ASSIGN_B2B_USER_PERMISSION_SUCCESS,
          payload: { permissionId, selected },
          meta: StateUtils.entitySuccessMeta(PERMISSION_ENTITIES, permissionId),
        });
      });
    });

    describe('DeleteB2BUserPermission', () => {
      it('should create the action', () => {
        const action = new B2BUserActions.UnassignB2BUserPermission({
          userId,
          orgCustomerId,
          permissionId,
        });

        expect({ ...action }).toEqual({
          type: B2BUserActions.UNASSIGN_B2B_USER_PERMISSION,
          payload: { userId, orgCustomerId, permissionId },
          meta: StateUtils.entityLoadMeta(PERMISSION_ENTITIES, permissionId),
        });
      });
    });

    describe('DeleteB2BUserPermissionFail', () => {
      it('should create the action', () => {
        const action = new B2BUserActions.UnassignB2BUserPermissionFail({
          orgCustomerId,
          permissionId,
          error,
        });

        expect({ ...action }).toEqual({
          type: B2BUserActions.UNASSIGN_B2B_USER_PERMISSION_FAIL,
          payload: {
            orgCustomerId,
            permissionId,
            error,
          },
          meta: StateUtils.entityFailMeta(
            PERMISSION_ENTITIES,
            permissionId,
            error
          ),
        });
      });
    });

    describe('DeleteB2BUserPermissionSuccess', () => {
      it('should create the action', () => {
        const action = new B2BUserActions.UnassignB2BUserPermissionSuccess({
          permissionId,
          selected,
        });

        expect({ ...action }).toEqual({
          type: B2BUserActions.UNASSIGN_B2B_USER_PERMISSION_SUCCESS,
          payload: { permissionId, selected },
          meta: StateUtils.entitySuccessMeta(PERMISSION_ENTITIES, permissionId),
        });
      });
    });
  });

  describe('B2BUserUserGroup Actions', () => {
    describe('Load B2BUser UserGroups', () => {
      it('should create the action', () => {
        const action = new B2BUserActions.LoadB2BUserUserGroups({
          userId,
          orgCustomerId,
          params,
        });

        expect({ ...action }).toEqual({
          type: B2BUserActions.LOAD_B2B_USER_USER_GROUPS,
          payload: { userId, orgCustomerId, params },
          meta: StateUtils.entityLoadMeta(
            B2B_USER_USER_GROUPS,
            `${orgCustomerId}${query}`
          ),
        });
      });
    });

    describe('LoadB2BUserUserGroupsFail', () => {
      it('should create the action', () => {
        const action = new B2BUserActions.LoadB2BUserUserGroupsFail({
          orgCustomerId,
          params,
          error,
        });

        expect({ ...action }).toEqual({
          type: B2BUserActions.LOAD_B2B_USER_USER_GROUPS_FAIL,
          payload: {
            orgCustomerId,
            params,
            error,
          },
          meta: StateUtils.entityFailMeta(
            B2B_USER_USER_GROUPS,
            `${orgCustomerId}${query}`,
            error
          ),
        });
      });
    });

    describe('LoadB2BUserUserGroupsSuccess', () => {
      it('should create the action', () => {
        const action = new B2BUserActions.LoadB2BUserUserGroupsSuccess({
          orgCustomerId,
          page,
          params,
        });

        expect({ ...action }).toEqual({
          type: B2BUserActions.LOAD_B2B_USER_USER_GROUPS_SUCCESS,
          payload: {
            orgCustomerId,
            page,
            params,
          },
          meta: StateUtils.entitySuccessMeta(
            B2B_USER_USER_GROUPS,
            `${orgCustomerId}${query}`
          ),
        });
      });
    });

    describe('CreateB2BUserUserGroup', () => {
      it('should create the action', () => {
        const action = new B2BUserActions.AssignB2BUserUserGroup({
          userId,
          orgCustomerId,
          userGroupId,
        });

        expect({ ...action }).toEqual({
          type: B2BUserActions.ASSIGN_B2B_USER_USER_GROUP,
          payload: { userId, orgCustomerId, userGroupId },
          meta: StateUtils.entityLoadMeta(USER_GROUP_ENTITIES, userGroupId),
        });
      });
    });

    describe('CreateB2BUserUserGroupFail', () => {
      it('should create the action', () => {
        const action = new B2BUserActions.AssignB2BUserUserGroupFail({
          orgCustomerId,
          userGroupId,
          error,
        });

        expect({ ...action }).toEqual({
          type: B2BUserActions.ASSIGN_B2B_USER_USER_GROUP_FAIL,
          payload: {
            orgCustomerId,
            userGroupId,
            error,
          },
          meta: StateUtils.entityFailMeta(
            USER_GROUP_ENTITIES,
            userGroupId,
            error
          ),
        });
      });
    });

    describe('CreateB2BUserUserGroupSuccess', () => {
      it('should create the action', () => {
        const action = new B2BUserActions.AssignB2BUserUserGroupSuccess({
          uid: userGroupId,
          selected,
        });

        expect({ ...action }).toEqual({
          type: B2BUserActions.ASSIGN_B2B_USER_USER_GROUP_SUCCESS,
          payload: { uid: userGroupId, selected },
          meta: StateUtils.entitySuccessMeta(USER_GROUP_ENTITIES, userGroupId),
        });
      });
    });

    describe('DeleteB2BUserUserGroup', () => {
      it('should create the action', () => {
        const action = new B2BUserActions.UnassignB2BUserUserGroup({
          userId,
          orgCustomerId,
          userGroupId,
        });

        expect({ ...action }).toEqual({
          type: B2BUserActions.UNASSIGN_B2B_USER_USER_GROUP,
          payload: { userId, orgCustomerId, userGroupId },
          meta: StateUtils.entityLoadMeta(USER_GROUP_ENTITIES, userGroupId),
        });
      });
    });

    describe('DeleteB2BUserUserGroupFail', () => {
      it('should create the action', () => {
        const action = new B2BUserActions.UnassignB2BUserUserGroupFail({
          orgCustomerId,
          userGroupId,
          error,
        });

        expect({ ...action }).toEqual({
          type: B2BUserActions.UNASSIGN_B2B_USER_USER_GROUP_FAIL,
          payload: {
            orgCustomerId,
            userGroupId,
            error,
          },
          meta: StateUtils.entityFailMeta(
            USER_GROUP_ENTITIES,
            userGroupId,
            error
          ),
        });
      });
    });

    describe('DeleteB2BUserUserGroupSuccess', () => {
      it('should create the action', () => {
        const action = new B2BUserActions.UnassignB2BUserUserGroupSuccess({
          uid: userGroupId,
          selected,
        });

        expect({ ...action }).toEqual({
          type: B2BUserActions.UNASSIGN_B2B_USER_USER_GROUP_SUCCESS,
          payload: { uid: userGroupId, selected },
          meta: StateUtils.entitySuccessMeta(USER_GROUP_ENTITIES, userGroupId),
        });
      });
    });
  });
});
