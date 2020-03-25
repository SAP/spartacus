import {
  ORG_UNIT_USER_GROUP_ENTITIES,
  ORG_UNIT_USER_GROUP_LIST,
  ORG_UNIT_USER_GROUP_AVAILABLE_ORDER_APPROVAL_PERMISSIONS,
  PERMISSION_ENTITIES,
  ORG_UNIT_USER_GROUP_AVAILABLE_ORG_CUSTOMERS,
  B2B_USER_ENTITIES,
} from '../organization-state';
import { StateEntityLoaderActions } from '../../../state/utils/index';
import { OrgUnitUserGroupActions } from './index';
import { OrgUnitUserGroup } from '@spartacus/core';

const orgUnitUserGroupUid = 'testOrgUnitUserGroupId';
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

describe('OrgUnitUserGroup Actions', () => {
  describe('LoadOrgUnitUserGroup Actions', () => {
    describe('LoadOrgUnitUserGroup', () => {
      it('should create the action', () => {
        const action = new OrgUnitUserGroupActions.LoadOrgUnitUserGroup({
          userId,
          orgUnitUserGroupUid,
        });

        expect({ ...action }).toEqual({
          type: OrgUnitUserGroupActions.LOAD_ORG_UNIT_USER_GROUP,
          payload: { userId, orgUnitUserGroupUid },
          meta: StateEntityLoaderActions.entityLoadMeta(
            ORG_UNIT_USER_GROUP_ENTITIES,
            orgUnitUserGroupUid
          ),
        });
      });
    });

    describe('LoadOrgUnitUserGroupFail', () => {
      it('should create the action', () => {
        const action = new OrgUnitUserGroupActions.LoadOrgUnitUserGroupFail({
          orgUnitUserGroupUid,
          error,
        });

        expect({ ...action }).toEqual({
          type: OrgUnitUserGroupActions.LOAD_ORG_UNIT_USER_GROUP_FAIL,
          payload: { orgUnitUserGroupUid, error },
          meta: StateEntityLoaderActions.entityFailMeta(
            ORG_UNIT_USER_GROUP_ENTITIES,
            orgUnitUserGroupUid,
            error
          ),
        });
      });
    });

    describe('LoadOrgUnitUserGroupSuccess', () => {
      it('should create the action', () => {
        const action = new OrgUnitUserGroupActions.LoadOrgUnitUserGroupSuccess([
          orgUnitUserGroup,
        ]);

        expect({ ...action }).toEqual({
          type: OrgUnitUserGroupActions.LOAD_ORG_UNIT_USER_GROUP_SUCCESS,
          payload: [orgUnitUserGroup],
          meta: StateEntityLoaderActions.entitySuccessMeta(
            ORG_UNIT_USER_GROUP_ENTITIES,
            [orgUnitUserGroupUid]
          ),
        });
      });
    });
  });

  describe('LoadOrgUnitUserGroups Actions', () => {
    describe('LoadOrgUnitUserGroups', () => {
      it('should create the action', () => {
        const action = new OrgUnitUserGroupActions.LoadOrgUnitUserGroups({
          userId,
          params,
        });

        expect({ ...action }).toEqual({
          type: OrgUnitUserGroupActions.LOAD_ORG_UNIT_USER_GROUPS,
          payload: { userId, params },
          meta: StateEntityLoaderActions.entityLoadMeta(
            ORG_UNIT_USER_GROUP_LIST,
            query
          ),
        });
      });
    });

    describe('LoadOrgUnitUserGroupsFail', () => {
      it('should create the action', () => {
        const action = new OrgUnitUserGroupActions.LoadOrgUnitUserGroupsFail({
          params,
          error: { error },
        });

        expect({ ...action }).toEqual({
          type: OrgUnitUserGroupActions.LOAD_ORG_UNIT_USER_GROUPS_FAIL,
          payload: { params, error: { error } },
          meta: StateEntityLoaderActions.entityFailMeta(
            ORG_UNIT_USER_GROUP_LIST,
            query,
            {
              error,
            }
          ),
        });
      });
    });

    describe('LoadOrgUnitUserGroupsSuccess', () => {
      it('should create the action', () => {
        const action = new OrgUnitUserGroupActions.LoadOrgUnitUserGroupsSuccess(
          {
            page,
            params,
          }
        );

        expect({ ...action }).toEqual({
          type: OrgUnitUserGroupActions.LOAD_ORG_UNIT_USER_GROUPS_SUCCESS,
          payload: { page, params },
          meta: StateEntityLoaderActions.entitySuccessMeta(
            ORG_UNIT_USER_GROUP_LIST,
            query
          ),
        });
      });
    });
  });

  describe('CreateOrgUnitUserGroup Actions', () => {
    describe('CreateOrgUnitUserGroup', () => {
      it('should create the action', () => {
        const action = new OrgUnitUserGroupActions.CreateOrgUnitUserGroup({
          userId,
          orgUnitUserGroup,
        });

        expect({ ...action }).toEqual({
          type: OrgUnitUserGroupActions.CREATE_ORG_UNIT_USER_GROUP,
          payload: { userId, orgUnitUserGroup },
          meta: StateEntityLoaderActions.entityLoadMeta(
            ORG_UNIT_USER_GROUP_ENTITIES,
            orgUnitUserGroupUid
          ),
        });
      });
    });

    describe('CreateOrgUnitUserGroupFail', () => {
      it('should create the action', () => {
        const action = new OrgUnitUserGroupActions.CreateOrgUnitUserGroupFail({
          orgUnitUserGroupUid,
          error,
        });

        expect({ ...action }).toEqual({
          type: OrgUnitUserGroupActions.CREATE_ORG_UNIT_USER_GROUP_FAIL,
          payload: {
            orgUnitUserGroupUid,
            error,
          },
          meta: StateEntityLoaderActions.entityFailMeta(
            ORG_UNIT_USER_GROUP_ENTITIES,
            orgUnitUserGroupUid,
            error
          ),
        });
      });
    });

    describe('CreateOrgUnitUserGroupSuccess', () => {
      it('should create the action', () => {
        const action = new OrgUnitUserGroupActions.CreateOrgUnitUserGroupSuccess(
          orgUnitUserGroup
        );

        expect({ ...action }).toEqual({
          type: OrgUnitUserGroupActions.CREATE_ORG_UNIT_USER_GROUP_SUCCESS,
          payload: orgUnitUserGroup,
          meta: StateEntityLoaderActions.entitySuccessMeta(
            ORG_UNIT_USER_GROUP_ENTITIES,
            orgUnitUserGroupUid
          ),
        });
      });
    });
  });

  describe('UpdateOrgUnitUserGroup Actions', () => {
    describe('UpdateOrgUnitUserGroup', () => {
      it('should create the action', () => {
        const action = new OrgUnitUserGroupActions.UpdateOrgUnitUserGroup({
          userId,
          orgUnitUserGroupUid,
          orgUnitUserGroup,
        });

        expect({ ...action }).toEqual({
          type: OrgUnitUserGroupActions.UPDATE_ORG_UNIT_USER_GROUP,
          payload: { userId, orgUnitUserGroupUid, orgUnitUserGroup },
          meta: StateEntityLoaderActions.entityLoadMeta(
            ORG_UNIT_USER_GROUP_ENTITIES,
            orgUnitUserGroupUid
          ),
        });
      });
    });

    describe('UpdateOrgUnitUserGroupFail', () => {
      it('should create the action', () => {
        const action = new OrgUnitUserGroupActions.UpdateOrgUnitUserGroupFail({
          orgUnitUserGroupUid,
          error,
        });

        expect({ ...action }).toEqual({
          type: OrgUnitUserGroupActions.UPDATE_ORG_UNIT_USER_GROUP_FAIL,
          payload: {
            orgUnitUserGroupUid,
            error,
          },
          meta: StateEntityLoaderActions.entityFailMeta(
            ORG_UNIT_USER_GROUP_ENTITIES,
            orgUnitUserGroupUid,
            error
          ),
        });
      });
    });

    describe('UpdateOrgUnitUserGroupSuccess', () => {
      it('should create the action', () => {
        const action = new OrgUnitUserGroupActions.UpdateOrgUnitUserGroupSuccess(
          orgUnitUserGroup
        );

        expect({ ...action }).toEqual({
          type: OrgUnitUserGroupActions.UPDATE_ORG_UNIT_USER_GROUP_SUCCESS,
          payload: orgUnitUserGroup,
          meta: StateEntityLoaderActions.entitySuccessMeta(
            ORG_UNIT_USER_GROUP_ENTITIES,
            orgUnitUserGroupUid
          ),
        });
      });
    });
  });

  describe('DeleteOrgUnitUserGroup Actions', () => {
    describe('DeleteOrgUnitUserGroup', () => {
      it('should create the action', () => {
        const action = new OrgUnitUserGroupActions.DeleteOrgUnitUserGroup({
          userId,
          orgUnitUserGroupUid,
        });

        expect({ ...action }).toEqual({
          type: OrgUnitUserGroupActions.DELETE_ORG_UNIT_USER_GROUP,
          payload: { userId, orgUnitUserGroupUid },
          meta: StateEntityLoaderActions.entityLoadMeta(
            ORG_UNIT_USER_GROUP_ENTITIES,
            orgUnitUserGroupUid
          ),
        });
      });
    });

    describe('DeleteOrgUnitUserGroupFail', () => {
      it('should create the action', () => {
        const action = new OrgUnitUserGroupActions.DeleteOrgUnitUserGroupFail({
          orgUnitUserGroupUid,
          error,
        });

        expect({ ...action }).toEqual({
          type: OrgUnitUserGroupActions.DELETE_ORG_UNIT_USER_GROUP_FAIL,
          payload: {
            orgUnitUserGroupUid,
            error,
          },
          meta: StateEntityLoaderActions.entityFailMeta(
            ORG_UNIT_USER_GROUP_ENTITIES,
            orgUnitUserGroupUid,
            error
          ),
        });
      });
    });

    describe('DeleteOrgUnitUserGroupSuccess', () => {
      it('should create the action', () => {
        const action = new OrgUnitUserGroupActions.DeleteOrgUnitUserGroupSuccess(
          orgUnitUserGroup
        );

        expect({ ...action }).toEqual({
          type: OrgUnitUserGroupActions.DELETE_ORG_UNIT_USER_GROUP_SUCCESS,
          payload: orgUnitUserGroup,
          meta: StateEntityLoaderActions.entitySuccessMeta(
            ORG_UNIT_USER_GROUP_ENTITIES,
            orgUnitUserGroupUid
          ),
        });
      });
    });
  });

  describe('LoadOrgUnitUserGroupAvailableOrderApprovalPermissions Actions', () => {
    describe('LoadOrgUnitUserGroupAvailableOrderApprovalPermissions', () => {
      it('should create the action', () => {
        const action = new OrgUnitUserGroupActions.LoadOrgUnitUserGroupAvailableOrderApprovalPermissions(
          {
            userId,
            orgUnitUserGroupUid,
            params,
          }
        );

        expect({ ...action }).toEqual({
          type:
            OrgUnitUserGroupActions.LOAD_ORG_UNIT_USER_GROUP_AVAILABLE_ORDER_APPROVAL_PERMISSIONS,
          payload: { userId, orgUnitUserGroupUid, params },
          meta: StateEntityLoaderActions.entityLoadMeta(
            ORG_UNIT_USER_GROUP_AVAILABLE_ORDER_APPROVAL_PERMISSIONS,
            orgUnitUserGroupUid + query
          ),
        });
      });
    });

    describe('LoadOrgUnitUserGroupAvailableOrderApprovalPermissionsFail', () => {
      it('should create the action', () => {
        const action = new OrgUnitUserGroupActions.LoadOrgUnitUserGroupAvailableOrderApprovalPermissionsFail(
          {
            orgUnitUserGroupUid,
            params,
            error,
          }
        );

        expect({ ...action }).toEqual({
          type:
            OrgUnitUserGroupActions.LOAD_ORG_UNIT_USER_GROUP_AVAILABLE_ORDER_APPROVAL_PERMISSIONS_FAIL,
          payload: {
            orgUnitUserGroupUid,
            params,
            error,
          },
          meta: StateEntityLoaderActions.entityFailMeta(
            ORG_UNIT_USER_GROUP_AVAILABLE_ORDER_APPROVAL_PERMISSIONS,
            orgUnitUserGroupUid + query,
            error
          ),
        });
      });
    });

    describe('LoadOrgUnitUserGroupAvailableOrderApprovalPermissionsSuccess', () => {
      it('should create the action', () => {
        const action = new OrgUnitUserGroupActions.LoadOrgUnitUserGroupAvailableOrderApprovalPermissionsSuccess(
          {
            orgUnitUserGroupUid,
            page,
            params,
          }
        );

        expect({ ...action }).toEqual({
          type:
            OrgUnitUserGroupActions.LOAD_ORG_UNIT_USER_GROUP_AVAILABLE_ORDER_APPROVAL_PERMISSIONS_SUCCESS,
          payload: {
            orgUnitUserGroupUid,
            page,
            params,
          },
          meta: StateEntityLoaderActions.entitySuccessMeta(
            ORG_UNIT_USER_GROUP_AVAILABLE_ORDER_APPROVAL_PERMISSIONS,
            orgUnitUserGroupUid + query
          ),
        });
      });
    });
  });

  describe('CreateOrgUnitUserGroupOrderApprovalPermission Actions', () => {
    describe('CreateOrgUnitUserGroupOrderApprovalPermission', () => {
      it('should create the action', () => {
        const action = new OrgUnitUserGroupActions.CreateOrgUnitUserGroupOrderApprovalPermission(
          {
            userId,
            orgUnitUserGroupUid,
            permissionUid,
          }
        );

        expect({ ...action }).toEqual({
          type:
            OrgUnitUserGroupActions.CREATE_ORG_UNIT_USER_GROUP_ORDER_APPROVAL_PERMISSION,
          payload: { userId, orgUnitUserGroupUid, permissionUid },
          meta: StateEntityLoaderActions.entityLoadMeta(
            PERMISSION_ENTITIES,
            permissionUid
          ),
        });
      });
    });

    describe('CreateOrgUnitUserGroupOrderApprovalPermissionFail', () => {
      it('should create the action', () => {
        const action = new OrgUnitUserGroupActions.CreateOrgUnitUserGroupOrderApprovalPermissionFail(
          {
            orgUnitUserGroupUid,
            permissionUid,
            error,
          }
        );

        expect({ ...action }).toEqual({
          type:
            OrgUnitUserGroupActions.CREATE_ORG_UNIT_USER_GROUP_ORDER_APPROVAL_PERMISSION_FAIL,
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

    describe('CreateOrgUnitUserGroupOrderApprovalPermissionSuccess', () => {
      it('should create the action', () => {
        const action = new OrgUnitUserGroupActions.CreateOrgUnitUserGroupOrderApprovalPermissionSuccess(
          {
            permissionUid: permissionUid,
            selected: true,
          }
        );

        expect({ ...action }).toEqual({
          type:
            OrgUnitUserGroupActions.CREATE_ORG_UNIT_USER_GROUP_ORDER_APPROVAL_PERMISSION_SUCCESS,
          payload: { permissionUid: permissionUid, selected: true },
          meta: StateEntityLoaderActions.entitySuccessMeta(
            PERMISSION_ENTITIES,
            permissionUid
          ),
        });
      });
    });
  });

  describe('DeleteOrgUnitUserGroupOrderApprovalPermission Actions', () => {
    describe('DeleteOrgUnitUserGroupOrderApprovalPermission', () => {
      it('should create the action', () => {
        const action = new OrgUnitUserGroupActions.DeleteOrgUnitUserGroupOrderApprovalPermission(
          {
            userId,
            orgUnitUserGroupUid,
            permissionUid,
          }
        );

        expect({ ...action }).toEqual({
          type:
            OrgUnitUserGroupActions.DELETE_ORG_UNIT_USER_GROUP_ORDER_APPROVAL_PERMISSION,
          payload: { userId, orgUnitUserGroupUid, permissionUid },
          meta: StateEntityLoaderActions.entityLoadMeta(
            PERMISSION_ENTITIES,
            permissionUid
          ),
        });
      });
    });

    describe('DeleteOrgUnitUserGroupOrderApprovalPermissionFail', () => {
      it('should create the action', () => {
        const action = new OrgUnitUserGroupActions.DeleteOrgUnitUserGroupOrderApprovalPermissionFail(
          {
            orgUnitUserGroupUid,
            permissionUid,
            error,
          }
        );

        expect({ ...action }).toEqual({
          type:
            OrgUnitUserGroupActions.DELETE_ORG_UNIT_USER_GROUP_ORDER_APPROVAL_PERMISSION_FAIL,
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

    describe('DeleteOrgUnitUserGroupOrderApprovalPermissionSuccess', () => {
      it('should create the action', () => {
        const action = new OrgUnitUserGroupActions.DeleteOrgUnitUserGroupOrderApprovalPermissionSuccess(
          {
            permissionUid: permissionUid,
            selected: false,
          }
        );

        expect({ ...action }).toEqual({
          type:
            OrgUnitUserGroupActions.DELETE_ORG_UNIT_USER_GROUP_ORDER_APPROVAL_PERMISSION_SUCCESS,
          payload: { permissionUid: permissionUid, selected: false },
          meta: StateEntityLoaderActions.entitySuccessMeta(
            PERMISSION_ENTITIES,
            permissionUid
          ),
        });
      });
    });
  });

  describe('LoadOrgUnitUserGroupAvailableOrgCustomers Actions', () => {
    describe('LoadOrgUnitUserGroupAvailableOrgCustomers', () => {
      it('should create the action', () => {
        const action = new OrgUnitUserGroupActions.LoadOrgUnitUserGroupAvailableOrgCustomers(
          {
            userId,
            orgUnitUserGroupUid,
            params,
          }
        );

        expect({ ...action }).toEqual({
          type:
            OrgUnitUserGroupActions.LOAD_ORG_UNIT_USER_GROUP_AVAILABLE_ORG_CUSTOMERS,
          payload: { userId, orgUnitUserGroupUid, params },
          meta: StateEntityLoaderActions.entityLoadMeta(
            ORG_UNIT_USER_GROUP_AVAILABLE_ORG_CUSTOMERS,
            orgUnitUserGroupUid + query
          ),
        });
      });
    });

    describe('LoadOrgUnitUserGroupAvailableOrgCustomersFail', () => {
      it('should create the action', () => {
        const action = new OrgUnitUserGroupActions.LoadOrgUnitUserGroupAvailableOrgCustomersFail(
          {
            orgUnitUserGroupUid,
            params,
            error,
          }
        );

        expect({ ...action }).toEqual({
          type:
            OrgUnitUserGroupActions.LOAD_ORG_UNIT_USER_GROUP_AVAILABLE_ORG_CUSTOMERS_FAIL,
          payload: {
            orgUnitUserGroupUid,
            params,
            error,
          },
          meta: StateEntityLoaderActions.entityFailMeta(
            ORG_UNIT_USER_GROUP_AVAILABLE_ORG_CUSTOMERS,
            orgUnitUserGroupUid + query,
            error
          ),
        });
      });
    });

    describe('LoadOrgUnitUserGroupAvailableOrgCustomersSuccess', () => {
      it('should create the action', () => {
        const action = new OrgUnitUserGroupActions.LoadOrgUnitUserGroupAvailableOrgCustomersSuccess(
          {
            orgUnitUserGroupUid,
            page,
            params,
          }
        );

        expect({ ...action }).toEqual({
          type:
            OrgUnitUserGroupActions.LOAD_ORG_UNIT_USER_GROUP_AVAILABLE_ORG_CUSTOMERS_SUCCESS,
          payload: {
            orgUnitUserGroupUid,
            page,
            params,
          },
          meta: StateEntityLoaderActions.entitySuccessMeta(
            ORG_UNIT_USER_GROUP_AVAILABLE_ORG_CUSTOMERS,
            orgUnitUserGroupUid + query
          ),
        });
      });
    });
  });

  describe('CreateOrgUnitUserGroupMember Actions', () => {
    describe('CreateOrgUnitUserGroupMember', () => {
      it('should create the action', () => {
        const action = new OrgUnitUserGroupActions.CreateOrgUnitUserGroupMember(
          {
            userId,
            orgUnitUserGroupUid,
            customerId,
          }
        );

        expect({ ...action }).toEqual({
          type: OrgUnitUserGroupActions.CREATE_ORG_UNIT_USER_GROUP_MEMBER,
          payload: { userId, orgUnitUserGroupUid, customerId },
          meta: StateEntityLoaderActions.entityLoadMeta(
            B2B_USER_ENTITIES,
            customerId
          ),
        });
      });
    });

    describe('CreateOrgUnitUserGroupMemberFail', () => {
      it('should create the action', () => {
        const action = new OrgUnitUserGroupActions.CreateOrgUnitUserGroupMemberFail(
          {
            orgUnitUserGroupUid,
            customerId,
            error,
          }
        );

        expect({ ...action }).toEqual({
          type: OrgUnitUserGroupActions.CREATE_ORG_UNIT_USER_GROUP_MEMBER_FAIL,
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

    describe('CreateOrgUnitUserGroupMemberSuccess', () => {
      it('should create the action', () => {
        const action = new OrgUnitUserGroupActions.CreateOrgUnitUserGroupMemberSuccess(
          {
            customerId: customerId,
            selected: true,
          }
        );

        expect({ ...action }).toEqual({
          type:
            OrgUnitUserGroupActions.CREATE_ORG_UNIT_USER_GROUP_MEMBER_SUCCESS,
          payload: { customerId: customerId, selected: true },
          meta: StateEntityLoaderActions.entitySuccessMeta(
            B2B_USER_ENTITIES,
            customerId
          ),
        });
      });
    });
  });

  describe('DeleteOrgUnitUserGroupMember Actions', () => {
    describe('DeleteOrgUnitUserGroupMember', () => {
      it('should create the action', () => {
        const action = new OrgUnitUserGroupActions.DeleteOrgUnitUserGroupMember(
          {
            userId,
            orgUnitUserGroupUid,
            customerId,
          }
        );

        expect({ ...action }).toEqual({
          type: OrgUnitUserGroupActions.DELETE_ORG_UNIT_USER_GROUP_MEMBER,
          payload: { userId, orgUnitUserGroupUid, customerId },
          meta: StateEntityLoaderActions.entityLoadMeta(
            B2B_USER_ENTITIES,
            customerId
          ),
        });
      });
    });

    describe('DeleteOrgUnitUserGroupMemberFail', () => {
      it('should create the action', () => {
        const action = new OrgUnitUserGroupActions.DeleteOrgUnitUserGroupMemberFail(
          {
            orgUnitUserGroupUid,
            customerId,
            error,
          }
        );

        expect({ ...action }).toEqual({
          type: OrgUnitUserGroupActions.DELETE_ORG_UNIT_USER_GROUP_MEMBER_FAIL,
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

    describe('DeleteOrgUnitUserGroupMemberSuccess', () => {
      it('should create the action', () => {
        const action = new OrgUnitUserGroupActions.DeleteOrgUnitUserGroupMemberSuccess(
          {
            customerId: customerId,
            selected: false,
          }
        );

        expect({ ...action }).toEqual({
          type:
            OrgUnitUserGroupActions.DELETE_ORG_UNIT_USER_GROUP_MEMBER_SUCCESS,
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
