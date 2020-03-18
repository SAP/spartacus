import {
  ORG_UNIT_USER_GROUP_ENTITIES,
  ORG_UNIT_USER_GROUP_LIST,
} from '../organization-state';
import { StateEntityLoaderActions } from '../../../state/utils/index';
import { OrgUnitUserGroupActions } from './index';
import { OrgUnitUserGroup } from '@spartacus/core';

const orgUnitUserGroupUid = 'testOrgUnitUserGroupId';
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
});
