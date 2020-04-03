import {
  USER_GROUP_ENTITIES,
  USER_GROUP_LIST,
  USER_GROUP_PERMISSIONS,
  PERMISSION_ENTITIES,
  USER_GROUP_AVAILABLE_CUSTOMERS,
  B2B_USER_ENTITIES,
} from '../organization-state';
import { StateEntityLoaderActions } from '../../../state/utils/index';
import { UserGroupActions } from './index';
import { OrgUnitUserGroup } from '@spartacus/core';

const orgUnitUserGroupUid = 'testUserGroupId';
const permissionUid = 'permissionUid';
const customerId = 'customerId';
const orgUnitUserGroup: OrgUnitUserGroup = {
  uid: orgUnitUserGroupUid,
};
const userId = 'xxx@xxx.xxx';
const error = 'anError';
const params = { currentPage: 2 };
const query = '?pageSize=&currentPage=2&sort=';

const pagination = { currentPage: 1 };
const sorts = [{ selected: true, name: 'uid' }];
const page = { ids: [orgUnitUserGroupUid], pagination, sorts };

describe('UserGroup Actions', () => {
  describe('LoadUserGroup Actions', () => {
    describe('LoadUserGroup', () => {
      it('should create the action', () => {
        const action = new UserGroupActions.LoadUserGroup({
          userId,
          orgUnitUserGroupUid,
        });

        expect({ ...action }).toEqual({
          type: UserGroupActions.LOAD_USER_GROUP,
          payload: { userId, orgUnitUserGroupUid },
          meta: StateEntityLoaderActions.entityLoadMeta(
            USER_GROUP_ENTITIES,
            orgUnitUserGroupUid
          ),
        });
      });
    });

    describe('LoadUserGroupFail', () => {
      it('should create the action', () => {
        const action = new UserGroupActions.LoadUserGroupFail({
          orgUnitUserGroupUid,
          error,
        });

        expect({ ...action }).toEqual({
          type: UserGroupActions.LOAD_USER_GROUP_FAIL,
          payload: { orgUnitUserGroupUid, error },
          meta: StateEntityLoaderActions.entityFailMeta(
            USER_GROUP_ENTITIES,
            orgUnitUserGroupUid,
            error
          ),
        });
      });
    });

    describe('LoadUserGroupSuccess', () => {
      it('should create the action', () => {
        const action = new UserGroupActions.LoadUserGroupSuccess([
          orgUnitUserGroup,
        ]);

        expect({ ...action }).toEqual({
          type: UserGroupActions.LOAD_USER_GROUP_SUCCESS,
          payload: [orgUnitUserGroup],
          meta: StateEntityLoaderActions.entitySuccessMeta(
            USER_GROUP_ENTITIES,
            [orgUnitUserGroupUid]
          ),
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
          meta: StateEntityLoaderActions.entityLoadMeta(USER_GROUP_LIST, query),
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
          meta: StateEntityLoaderActions.entityFailMeta(
            USER_GROUP_LIST,
            query,
            {
              error,
            }
          ),
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
          meta: StateEntityLoaderActions.entitySuccessMeta(
            USER_GROUP_LIST,
            query
          ),
        });
      });
    });
  });

  describe('CreateUserGroup Actions', () => {
    describe('CreateUserGroup', () => {
      it('should create the action', () => {
        const action = new UserGroupActions.CreateUserGroup({
          userId,
          orgUnitUserGroup,
        });

        expect({ ...action }).toEqual({
          type: UserGroupActions.CREATE_USER_GROUP,
          payload: { userId, orgUnitUserGroup },
          meta: StateEntityLoaderActions.entityLoadMeta(
            USER_GROUP_ENTITIES,
            orgUnitUserGroupUid
          ),
        });
      });
    });

    describe('CreateUserGroupFail', () => {
      it('should create the action', () => {
        const action = new UserGroupActions.CreateUserGroupFail({
          orgUnitUserGroupUid,
          error,
        });

        expect({ ...action }).toEqual({
          type: UserGroupActions.CREATE_USER_GROUP_FAIL,
          payload: {
            orgUnitUserGroupUid,
            error,
          },
          meta: StateEntityLoaderActions.entityFailMeta(
            USER_GROUP_ENTITIES,
            orgUnitUserGroupUid,
            error
          ),
        });
      });
    });

    describe('CreateUserGroupSuccess', () => {
      it('should create the action', () => {
        const action = new UserGroupActions.CreateUserGroupSuccess(
          orgUnitUserGroup
        );

        expect({ ...action }).toEqual({
          type: UserGroupActions.CREATE_USER_GROUP_SUCCESS,
          payload: orgUnitUserGroup,
          meta: StateEntityLoaderActions.entitySuccessMeta(
            USER_GROUP_ENTITIES,
            orgUnitUserGroupUid
          ),
        });
      });
    });
  });

  describe('UpdateUserGroup Actions', () => {
    describe('UpdateUserGroup', () => {
      it('should create the action', () => {
        const action = new UserGroupActions.UpdateUserGroup({
          userId,
          orgUnitUserGroupUid,
          orgUnitUserGroup,
        });

        expect({ ...action }).toEqual({
          type: UserGroupActions.UPDATE_USER_GROUP,
          payload: { userId, orgUnitUserGroupUid, orgUnitUserGroup },
          meta: StateEntityLoaderActions.entityLoadMeta(
            USER_GROUP_ENTITIES,
            orgUnitUserGroupUid
          ),
        });
      });
    });

    describe('UpdateUserGroupFail', () => {
      it('should create the action', () => {
        const action = new UserGroupActions.UpdateUserGroupFail({
          orgUnitUserGroupUid,
          error,
        });

        expect({ ...action }).toEqual({
          type: UserGroupActions.UPDATE_USER_GROUP_FAIL,
          payload: {
            orgUnitUserGroupUid,
            error,
          },
          meta: StateEntityLoaderActions.entityFailMeta(
            USER_GROUP_ENTITIES,
            orgUnitUserGroupUid,
            error
          ),
        });
      });
    });

    describe('UpdateUserGroupSuccess', () => {
      it('should create the action', () => {
        const action = new UserGroupActions.UpdateUserGroupSuccess(
          orgUnitUserGroup
        );

        expect({ ...action }).toEqual({
          type: UserGroupActions.UPDATE_USER_GROUP_SUCCESS,
          payload: orgUnitUserGroup,
          meta: StateEntityLoaderActions.entitySuccessMeta(
            USER_GROUP_ENTITIES,
            orgUnitUserGroupUid
          ),
        });
      });
    });
  });

  describe('DeleteUserGroup Actions', () => {
    describe('DeleteUserGroup', () => {
      it('should create the action', () => {
        const action = new UserGroupActions.DeleteUserGroup({
          userId,
          orgUnitUserGroupUid,
        });

        expect({ ...action }).toEqual({
          type: UserGroupActions.DELETE_USER_GROUP,
          payload: { userId, orgUnitUserGroupUid },
          meta: StateEntityLoaderActions.entityLoadMeta(
            USER_GROUP_ENTITIES,
            orgUnitUserGroupUid
          ),
        });
      });
    });

    describe('DeleteUserGroupFail', () => {
      it('should create the action', () => {
        const action = new UserGroupActions.DeleteUserGroupFail({
          orgUnitUserGroupUid,
          error,
        });

        expect({ ...action }).toEqual({
          type: UserGroupActions.DELETE_USER_GROUP_FAIL,
          payload: {
            orgUnitUserGroupUid,
            error,
          },
          meta: StateEntityLoaderActions.entityFailMeta(
            USER_GROUP_ENTITIES,
            orgUnitUserGroupUid,
            error
          ),
        });
      });
    });

    describe('DeleteUserGroupSuccess', () => {
      it('should create the action', () => {
        const action = new UserGroupActions.DeleteUserGroupSuccess(
          orgUnitUserGroup
        );

        expect({ ...action }).toEqual({
          type: UserGroupActions.DELETE_USER_GROUP_SUCCESS,
          payload: orgUnitUserGroup,
          meta: StateEntityLoaderActions.entitySuccessMeta(
            USER_GROUP_ENTITIES,
            orgUnitUserGroupUid
          ),
        });
      });
    });
  });

  describe('LoadPermissions Actions', () => {
    describe('LoadPermissions', () => {
      it('should create the action', () => {
        const action = new UserGroupActions.LoadPermissions({
          userId,
          orgUnitUserGroupUid,
          params,
        });

        expect({ ...action }).toEqual({
          type: UserGroupActions.LOAD_USER_GROUP_PERMISSIONS,
          payload: { userId, orgUnitUserGroupUid, params },
          meta: StateEntityLoaderActions.entityLoadMeta(
            USER_GROUP_PERMISSIONS,
            orgUnitUserGroupUid + query
          ),
        });
      });
    });

    describe('LoadPermissionsFail', () => {
      it('should create the action', () => {
        const action = new UserGroupActions.LoadPermissionsFail({
          orgUnitUserGroupUid,
          params,
          error,
        });

        expect({ ...action }).toEqual({
          type: UserGroupActions.LOAD_USER_GROUP_PERMISSIONS_FAIL,
          payload: {
            orgUnitUserGroupUid,
            params,
            error,
          },
          meta: StateEntityLoaderActions.entityFailMeta(
            USER_GROUP_PERMISSIONS,
            orgUnitUserGroupUid + query,
            error
          ),
        });
      });
    });

    describe('LoadPermissionsSuccess', () => {
      it('should create the action', () => {
        const action = new UserGroupActions.LoadPermissionsSuccess({
          orgUnitUserGroupUid,
          page,
          params,
        });

        expect({ ...action }).toEqual({
          type: UserGroupActions.LOAD_USER_GROUP_PERMISSIONS_SUCCESS,
          payload: {
            orgUnitUserGroupUid,
            page,
            params,
          },
          meta: StateEntityLoaderActions.entitySuccessMeta(
            USER_GROUP_PERMISSIONS,
            orgUnitUserGroupUid + query
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
          orgUnitUserGroupUid,
          permissionUid,
        });

        expect({ ...action }).toEqual({
          type: UserGroupActions.USER_GROUP_ASSIGN_PERMISSION,
          payload: { userId, orgUnitUserGroupUid, permissionUid },
          meta: StateEntityLoaderActions.entityLoadMeta(
            PERMISSION_ENTITIES,
            permissionUid
          ),
        });
      });
    });

    describe('AssignPermissionFail', () => {
      it('should create the action', () => {
        const action = new UserGroupActions.AssignPermissionFail({
          orgUnitUserGroupUid,
          permissionUid,
          error,
        });

        expect({ ...action }).toEqual({
          type: UserGroupActions.USER_GROUP_ASSIGN_PERMISSION_FAIL,
          payload: {
            orgUnitUserGroupUid,
            permissionUid,
            error,
          },
          meta: StateEntityLoaderActions.entityFailMeta(
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
          meta: StateEntityLoaderActions.entitySuccessMeta(
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
          orgUnitUserGroupUid,
          permissionUid,
        });

        expect({ ...action }).toEqual({
          type: UserGroupActions.USER_GROUP_UNASSIGN_PERMISSION,
          payload: { userId, orgUnitUserGroupUid, permissionUid },
          meta: StateEntityLoaderActions.entityLoadMeta(
            PERMISSION_ENTITIES,
            permissionUid
          ),
        });
      });
    });

    describe('UnassignPermissionFail', () => {
      it('should create the action', () => {
        const action = new UserGroupActions.UnassignPermissionFail({
          orgUnitUserGroupUid,
          permissionUid,
          error,
        });

        expect({ ...action }).toEqual({
          type: UserGroupActions.USER_GROUP_UNASSIGN_PERMISSION_FAIL,
          payload: {
            orgUnitUserGroupUid,
            permissionUid,
            error,
          },
          meta: StateEntityLoaderActions.entityFailMeta(
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
          meta: StateEntityLoaderActions.entitySuccessMeta(
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
          orgUnitUserGroupUid,
          params,
        });

        expect({ ...action }).toEqual({
          type: UserGroupActions.LOAD_USER_GROUP_AVAILABLE_CUSTOMERS,
          payload: { userId, orgUnitUserGroupUid, params },
          meta: StateEntityLoaderActions.entityLoadMeta(
            USER_GROUP_AVAILABLE_CUSTOMERS,
            orgUnitUserGroupUid + query
          ),
        });
      });
    });

    describe('LoadAvailableOrgCustomersFail', () => {
      it('should create the action', () => {
        const action = new UserGroupActions.LoadAvailableOrgCustomersFail({
          orgUnitUserGroupUid,
          params,
          error,
        });

        expect({ ...action }).toEqual({
          type: UserGroupActions.LOAD_USER_GROUP_AVAILABLE_CUSTOMERS_FAIL,
          payload: {
            orgUnitUserGroupUid,
            params,
            error,
          },
          meta: StateEntityLoaderActions.entityFailMeta(
            USER_GROUP_AVAILABLE_CUSTOMERS,
            orgUnitUserGroupUid + query,
            error
          ),
        });
      });
    });

    describe('LoadAvailableOrgCustomersSuccess', () => {
      it('should create the action', () => {
        const action = new UserGroupActions.LoadAvailableOrgCustomersSuccess({
          orgUnitUserGroupUid,
          page,
          params,
        });

        expect({ ...action }).toEqual({
          type: UserGroupActions.LOAD_USER_GROUP_AVAILABLE_CUSTOMERS_SUCCESS,
          payload: {
            orgUnitUserGroupUid,
            page,
            params,
          },
          meta: StateEntityLoaderActions.entitySuccessMeta(
            USER_GROUP_AVAILABLE_CUSTOMERS,
            orgUnitUserGroupUid + query
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
          orgUnitUserGroupUid,
          customerId,
        });

        expect({ ...action }).toEqual({
          type: UserGroupActions.USER_GROUP_ASSIGN_MEMBER,
          payload: { userId, orgUnitUserGroupUid, customerId },
          meta: StateEntityLoaderActions.entityLoadMeta(
            B2B_USER_ENTITIES,
            customerId
          ),
        });
      });
    });

    describe('AssignMemberFail', () => {
      it('should create the action', () => {
        const action = new UserGroupActions.AssignMemberFail({
          orgUnitUserGroupUid,
          customerId,
          error,
        });

        expect({ ...action }).toEqual({
          type: UserGroupActions.USER_GROUP_ASSIGN_MEMBER_FAIL,
          payload: {
            orgUnitUserGroupUid,
            customerId,
            error,
          },
          meta: StateEntityLoaderActions.entityFailMeta(
            B2B_USER_ENTITIES,
            customerId,
            error
          ),
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
          meta: StateEntityLoaderActions.entitySuccessMeta(
            B2B_USER_ENTITIES,
            customerId
          ),
        });
      });
    });
  });

  describe('UnassignMember Actions', () => {
    describe('UnassignMember', () => {
      it('should create the action', () => {
        const action = new UserGroupActions.UnassignMember({
          userId,
          orgUnitUserGroupUid,
          customerId,
        });

        expect({ ...action }).toEqual({
          type: UserGroupActions.USER_GROUP_UNASSIGN_MEMBER,
          payload: { userId, orgUnitUserGroupUid, customerId },
          meta: StateEntityLoaderActions.entityLoadMeta(
            B2B_USER_ENTITIES,
            customerId
          ),
        });
      });
    });

    describe('UnassignMemberFail', () => {
      it('should create the action', () => {
        const action = new UserGroupActions.UnassignMemberFail({
          orgUnitUserGroupUid,
          customerId,
          error,
        });

        expect({ ...action }).toEqual({
          type: UserGroupActions.USER_GROUP_UNASSIGN_MEMBER_FAIL,
          payload: {
            orgUnitUserGroupUid,
            customerId,
            error,
          },
          meta: StateEntityLoaderActions.entityFailMeta(
            B2B_USER_ENTITIES,
            customerId,
            error
          ),
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
          meta: StateEntityLoaderActions.entitySuccessMeta(
            B2B_USER_ENTITIES,
            customerId
          ),
        });
      });
    });
  });
});
