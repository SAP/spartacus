import { StateUtils } from '@spartacus/core';
import { UserGroup } from '@spartacus/organization/administration/core';
import {
  B2B_USER_ENTITIES,
  PERMISSION_ENTITIES,
  USER_GROUP_AVAILABLE_CUSTOMERS,
  USER_GROUP_ENTITIES,
  USER_GROUP_LIST,
  USER_GROUP_PERMISSIONS,
} from '../organization-state';
import { UserGroupActions } from './index';

const userGroupId = 'testUserGroupId';
const permissionUid = 'permissionUid';
const customerId = 'customerId';
const userGroup: UserGroup = {
  uid: userGroupId,
};
const userId = 'xxx@xxx.xxx';
const error = 'anError';
const params = { currentPage: 2 };
const query = '?pageSize=&currentPage=2&sort=';

const pagination = { currentPage: 1 };
const sorts = [{ selected: true, name: 'uid' }];
const page = { ids: [userGroupId], pagination, sorts };

describe('UserGroup Actions', () => {
  describe('LoadUserGroup Actions', () => {
    describe('LoadUserGroup', () => {
      it('should create the action', () => {
        const action = new UserGroupActions.LoadUserGroup({
          userId,
          userGroupId,
        });

        expect({ ...action }).toEqual({
          type: UserGroupActions.LOAD_USER_GROUP,
          payload: { userId, userGroupId },
          meta: StateUtils.entityLoadMeta(USER_GROUP_ENTITIES, userGroupId),
        });
      });
    });

    describe('LoadUserGroupFail', () => {
      it('should create the action', () => {
        const action = new UserGroupActions.LoadUserGroupFail({
          userGroupId,
          error,
        });

        expect({ ...action }).toEqual({
          type: UserGroupActions.LOAD_USER_GROUP_FAIL,
          payload: { userGroupId, error },
          meta: StateUtils.entityFailMeta(
            USER_GROUP_ENTITIES,
            userGroupId,
            error
          ),
        });
      });
    });

    describe('LoadUserGroupSuccess', () => {
      it('should create the action', () => {
        const action = new UserGroupActions.LoadUserGroupSuccess([userGroup]);

        expect({ ...action }).toEqual({
          type: UserGroupActions.LOAD_USER_GROUP_SUCCESS,
          payload: [userGroup],
          meta: StateUtils.entitySuccessMeta(USER_GROUP_ENTITIES, [
            userGroupId,
          ]),
        });
      });
    });
  });

  describe('LoadUserGroups Actions', () => {
    describe('LoadUserGroups', () => {
      it('should create the action', () => {
        const action = new UserGroupActions.LoadUserGroups({
          userId,
          params,
        });

        expect({ ...action }).toEqual({
          type: UserGroupActions.LOAD_USER_GROUPS,
          payload: { userId, params },
          meta: StateUtils.entityLoadMeta(USER_GROUP_LIST, query),
        });
      });
    });

    describe('LoadUserGroupsFail', () => {
      it('should create the action', () => {
        const action = new UserGroupActions.LoadUserGroupsFail({
          params,
          error: { error },
        });

        expect({ ...action }).toEqual({
          type: UserGroupActions.LOAD_USER_GROUPS_FAIL,
          payload: { params, error: { error } },
          meta: StateUtils.entityFailMeta(USER_GROUP_LIST, query, {
            error,
          }),
        });
      });
    });

    describe('LoadUserGroupsSuccess', () => {
      it('should create the action', () => {
        const action = new UserGroupActions.LoadUserGroupsSuccess({
          page,
          params,
        });

        expect({ ...action }).toEqual({
          type: UserGroupActions.LOAD_USER_GROUPS_SUCCESS,
          payload: { page, params },
          meta: StateUtils.entitySuccessMeta(USER_GROUP_LIST, query),
        });
      });
    });
  });

  describe('CreateUserGroup Actions', () => {
    describe('CreateUserGroup', () => {
      it('should create the action', () => {
        const action = new UserGroupActions.CreateUserGroup({
          userId,
          userGroup,
        });

        expect({ ...action }).toEqual({
          type: UserGroupActions.CREATE_USER_GROUP,
          payload: { userId, userGroup },
          meta: StateUtils.entityLoadMeta(USER_GROUP_ENTITIES, userGroupId),
        });
      });
    });

    describe('CreateUserGroupFail', () => {
      it('should create the action', () => {
        const action = new UserGroupActions.CreateUserGroupFail({
          userGroupId,
          error,
        });

        expect({ ...action }).toEqual({
          type: UserGroupActions.CREATE_USER_GROUP_FAIL,
          payload: {
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

    describe('CreateUserGroupSuccess', () => {
      it('should create the action', () => {
        const action = new UserGroupActions.CreateUserGroupSuccess(userGroup);

        expect({ ...action }).toEqual({
          type: UserGroupActions.CREATE_USER_GROUP_SUCCESS,
          payload: userGroup,
          meta: StateUtils.entitySuccessMeta(USER_GROUP_ENTITIES, userGroupId),
        });
      });
    });
  });

  describe('UpdateUserGroup Actions', () => {
    describe('UpdateUserGroup', () => {
      it('should create the action', () => {
        const action = new UserGroupActions.UpdateUserGroup({
          userId,
          userGroupId,
          userGroup,
        });

        expect({ ...action }).toEqual({
          type: UserGroupActions.UPDATE_USER_GROUP,
          payload: { userId, userGroupId, userGroup },
          meta: StateUtils.entityLoadMeta(USER_GROUP_ENTITIES, userGroupId),
        });
      });
    });

    describe('UpdateUserGroupFail', () => {
      it('should create the action', () => {
        const action = new UserGroupActions.UpdateUserGroupFail({
          userGroupId,
          error,
        });

        expect({ ...action }).toEqual({
          type: UserGroupActions.UPDATE_USER_GROUP_FAIL,
          payload: {
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

    describe('UpdateUserGroupSuccess', () => {
      it('should create the action', () => {
        const action = new UserGroupActions.UpdateUserGroupSuccess(userGroup);

        expect({ ...action }).toEqual({
          type: UserGroupActions.UPDATE_USER_GROUP_SUCCESS,
          payload: userGroup,
          meta: StateUtils.entitySuccessMeta(USER_GROUP_ENTITIES, userGroupId),
        });
      });
    });
  });

  describe('DeleteUserGroup Actions', () => {
    describe('DeleteUserGroup', () => {
      it('should create the action', () => {
        const action = new UserGroupActions.DeleteUserGroup({
          userId,
          userGroupId,
        });

        expect({ ...action }).toEqual({
          type: UserGroupActions.DELETE_USER_GROUP,
          payload: { userId, userGroupId },
          meta: StateUtils.entityLoadMeta(USER_GROUP_ENTITIES, userGroupId),
        });
      });
    });

    describe('DeleteUserGroupFail', () => {
      it('should create the action', () => {
        const action = new UserGroupActions.DeleteUserGroupFail({
          userGroupId,
          error,
        });

        expect({ ...action }).toEqual({
          type: UserGroupActions.DELETE_USER_GROUP_FAIL,
          payload: {
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

    describe('DeleteUserGroupSuccess', () => {
      it('should create the action', () => {
        const action = new UserGroupActions.DeleteUserGroupSuccess(userGroup);

        expect({ ...action }).toEqual({
          type: UserGroupActions.DELETE_USER_GROUP_SUCCESS,
          payload: userGroup,
          meta: StateUtils.entitySuccessMeta(USER_GROUP_ENTITIES, userGroupId),
        });
      });
    });
  });

  describe('LoadPermissions Actions', () => {
    describe('LoadPermissions', () => {
      it('should create the action', () => {
        const action = new UserGroupActions.LoadPermissions({
          userId,
          userGroupId,
          params,
        });

        expect({ ...action }).toEqual({
          type: UserGroupActions.LOAD_USER_GROUP_PERMISSIONS,
          payload: { userId, userGroupId, params },
          meta: StateUtils.entityLoadMeta(
            USER_GROUP_PERMISSIONS,
            userGroupId + query
          ),
        });
      });
    });

    describe('LoadPermissionsFail', () => {
      it('should create the action', () => {
        const action = new UserGroupActions.LoadPermissionsFail({
          userGroupId,
          params,
          error,
        });

        expect({ ...action }).toEqual({
          type: UserGroupActions.LOAD_USER_GROUP_PERMISSIONS_FAIL,
          payload: {
            userGroupId,
            params,
            error,
          },
          meta: StateUtils.entityFailMeta(
            USER_GROUP_PERMISSIONS,
            userGroupId + query,
            error
          ),
        });
      });
    });

    describe('LoadPermissionsSuccess', () => {
      it('should create the action', () => {
        const action = new UserGroupActions.LoadPermissionsSuccess({
          userGroupId,
          page,
          params,
        });

        expect({ ...action }).toEqual({
          type: UserGroupActions.LOAD_USER_GROUP_PERMISSIONS_SUCCESS,
          payload: {
            userGroupId,
            page,
            params,
          },
          meta: StateUtils.entitySuccessMeta(
            USER_GROUP_PERMISSIONS,
            userGroupId + query
          ),
        });
      });
    });
  });

  describe('AssignPermission Actions', () => {
    describe('AssignPermission', () => {
      it('should create the action', () => {
        const action = new UserGroupActions.AssignPermission({
          userId,
          userGroupId,
          permissionUid,
        });

        expect({ ...action }).toEqual({
          type: UserGroupActions.USER_GROUP_ASSIGN_PERMISSION,
          payload: { userId, userGroupId, permissionUid },
          meta: StateUtils.entityLoadMeta(PERMISSION_ENTITIES, permissionUid),
        });
      });
    });

    describe('AssignPermissionFail', () => {
      it('should create the action', () => {
        const action = new UserGroupActions.AssignPermissionFail({
          userGroupId,
          permissionUid,
          error,
        });

        expect({ ...action }).toEqual({
          type: UserGroupActions.USER_GROUP_ASSIGN_PERMISSION_FAIL,
          payload: {
            userGroupId,
            permissionUid,
            error,
          },
          meta: StateUtils.entityFailMeta(
            PERMISSION_ENTITIES,
            permissionUid,
            error
          ),
        });
      });
    });

    describe('AssignPermissionSuccess', () => {
      it('should create the action', () => {
        const action = new UserGroupActions.AssignPermissionSuccess({
          permissionUid: permissionUid,
          selected: true,
        });

        expect({ ...action }).toEqual({
          type: UserGroupActions.USER_GROUP_ASSIGN_PERMISSION_SUCCESS,
          payload: { permissionUid: permissionUid, selected: true },
          meta: StateUtils.entitySuccessMeta(
            PERMISSION_ENTITIES,
            permissionUid
          ),
        });
      });
    });
  });

  describe('UnassignPermission Actions', () => {
    describe('UnassignPermission', () => {
      it('should create the action', () => {
        const action = new UserGroupActions.UnassignPermission({
          userId,
          userGroupId,
          permissionUid,
        });

        expect({ ...action }).toEqual({
          type: UserGroupActions.USER_GROUP_UNASSIGN_PERMISSION,
          payload: { userId, userGroupId, permissionUid },
          meta: StateUtils.entityLoadMeta(PERMISSION_ENTITIES, permissionUid),
        });
      });
    });

    describe('UnassignPermissionFail', () => {
      it('should create the action', () => {
        const action = new UserGroupActions.UnassignPermissionFail({
          userGroupId,
          permissionUid,
          error,
        });

        expect({ ...action }).toEqual({
          type: UserGroupActions.USER_GROUP_UNASSIGN_PERMISSION_FAIL,
          payload: {
            userGroupId,
            permissionUid,
            error,
          },
          meta: StateUtils.entityFailMeta(
            PERMISSION_ENTITIES,
            permissionUid,
            error
          ),
        });
      });
    });

    describe('UnassignPermissionSuccess', () => {
      it('should create the action', () => {
        const action = new UserGroupActions.UnassignPermissionSuccess({
          permissionUid: permissionUid,
          selected: false,
        });

        expect({ ...action }).toEqual({
          type: UserGroupActions.USER_GROUP_UNASSIGN_PERMISSION_SUCCESS,
          payload: { permissionUid: permissionUid, selected: false },
          meta: StateUtils.entitySuccessMeta(
            PERMISSION_ENTITIES,
            permissionUid
          ),
        });
      });
    });
  });

  describe('LoadAvailableOrgCustomers Actions', () => {
    describe('LoadAvailableOrgCustomers', () => {
      it('should create the action', () => {
        const action = new UserGroupActions.LoadAvailableOrgCustomers({
          userId,
          userGroupId,
          params,
        });

        expect({ ...action }).toEqual({
          type: UserGroupActions.LOAD_USER_GROUP_AVAILABLE_CUSTOMERS,
          payload: { userId, userGroupId, params },
          meta: StateUtils.entityLoadMeta(
            USER_GROUP_AVAILABLE_CUSTOMERS,
            userGroupId + query
          ),
        });
      });
    });

    describe('LoadAvailableOrgCustomersFail', () => {
      it('should create the action', () => {
        const action = new UserGroupActions.LoadAvailableOrgCustomersFail({
          userGroupId,
          params,
          error,
        });

        expect({ ...action }).toEqual({
          type: UserGroupActions.LOAD_USER_GROUP_AVAILABLE_CUSTOMERS_FAIL,
          payload: {
            userGroupId,
            params,
            error,
          },
          meta: StateUtils.entityFailMeta(
            USER_GROUP_AVAILABLE_CUSTOMERS,
            userGroupId + query,
            error
          ),
        });
      });
    });

    describe('LoadAvailableOrgCustomersSuccess', () => {
      it('should create the action', () => {
        const action = new UserGroupActions.LoadAvailableOrgCustomersSuccess({
          userGroupId,
          page,
          params,
        });

        expect({ ...action }).toEqual({
          type: UserGroupActions.LOAD_USER_GROUP_AVAILABLE_CUSTOMERS_SUCCESS,
          payload: {
            userGroupId,
            page,
            params,
          },
          meta: StateUtils.entitySuccessMeta(
            USER_GROUP_AVAILABLE_CUSTOMERS,
            userGroupId + query
          ),
        });
      });
    });
  });

  describe('AssignMember Actions', () => {
    describe('AssignMember', () => {
      it('should create the action', () => {
        const action = new UserGroupActions.AssignMember({
          userId,
          userGroupId,
          customerId,
        });

        expect({ ...action }).toEqual({
          type: UserGroupActions.USER_GROUP_ASSIGN_MEMBER,
          payload: { userId, userGroupId, customerId },
          meta: StateUtils.entityLoadMeta(B2B_USER_ENTITIES, customerId),
        });
      });
    });

    describe('AssignMemberFail', () => {
      it('should create the action', () => {
        const action = new UserGroupActions.AssignMemberFail({
          userGroupId,
          customerId,
          error,
        });

        expect({ ...action }).toEqual({
          type: UserGroupActions.USER_GROUP_ASSIGN_MEMBER_FAIL,
          payload: {
            userGroupId,
            customerId,
            error,
          },
          meta: StateUtils.entityFailMeta(B2B_USER_ENTITIES, customerId, error),
        });
      });
    });

    describe('AssignMemberrSuccess', () => {
      it('should create the action', () => {
        const action = new UserGroupActions.AssignMemberSuccess({
          customerId: customerId,
          selected: true,
        });

        expect({ ...action }).toEqual({
          type: UserGroupActions.USER_GROUP_ASSIGN_MEMBER_SUCCESS,
          payload: { customerId: customerId, selected: true },
          meta: StateUtils.entitySuccessMeta(B2B_USER_ENTITIES, customerId),
        });
      });
    });
  });

  describe('UnassignMember Actions', () => {
    describe('UnassignMember', () => {
      it('should create the action', () => {
        const action = new UserGroupActions.UnassignMember({
          userId,
          userGroupId,
          customerId,
        });

        expect({ ...action }).toEqual({
          type: UserGroupActions.USER_GROUP_UNASSIGN_MEMBER,
          payload: { userId, userGroupId, customerId },
          meta: StateUtils.entityLoadMeta(B2B_USER_ENTITIES, customerId),
        });
      });
    });

    describe('UnassignMemberFail', () => {
      it('should create the action', () => {
        const action = new UserGroupActions.UnassignMemberFail({
          userGroupId,
          customerId,
          error,
        });

        expect({ ...action }).toEqual({
          type: UserGroupActions.USER_GROUP_UNASSIGN_MEMBER_FAIL,
          payload: {
            userGroupId,
            customerId,
            error,
          },
          meta: StateUtils.entityFailMeta(B2B_USER_ENTITIES, customerId, error),
        });
      });
    });

    describe('UnassignMemberSuccess', () => {
      it('should create the action', () => {
        const action = new UserGroupActions.UnassignMemberSuccess({
          customerId: customerId,
          selected: false,
        });

        expect({ ...action }).toEqual({
          type: UserGroupActions.USER_GROUP_UNASSIGN_MEMBER_SUCCESS,
          payload: { customerId: customerId, selected: false },
          meta: StateUtils.entitySuccessMeta(B2B_USER_ENTITIES, customerId),
        });
      });
    });
  });
});
