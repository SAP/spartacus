import {
  Address,
  B2BApprovalProcess,
  B2BUnit,
  ListModel,
  SearchConfig,
  StateUtils,
} from '@spartacus/core';
import { B2BUnitNode } from '../../model/unit-node.model';
import {
  ADDRESS_ENTITIES,
  ADDRESS_LIST,
  B2B_USER_ENTITIES,
  ORG_UNIT_APPROVAL_PROCESSES,
  ORG_UNIT_APPROVAL_PROCESSES_ENTITIES,
  ORG_UNIT_ASSIGNED_USERS,
  ORG_UNIT_ENTITIES,
  ORG_UNIT_NODES,
  ORG_UNIT_NODE_LIST,
  ORG_UNIT_TREE,
  ORG_UNIT_TREE_ENTITY,
} from '../organization-state';
import { OrgUnitActions } from './index';

const orgUnitId = 'testOrgUnitId';
const orgUnit: Partial<B2BUnit> = { uid: orgUnitId };

const orgUnitNode: Partial<B2BUnitNode> = { id: orgUnitId };
const orgUnitNode2: Partial<B2BUnitNode> = { id: 'testOrgUnit2' };

const orgUnitList: B2BUnitNode[] = [orgUnitNode, orgUnitNode2];

const approvalProcesses: B2BApprovalProcess[] = [
  { code: 'testAprovalProcessCode', name: 'testAprovalProcessName' },
];

const orgCustomerId = 'testCustomerId';
const roleId = 'testRoleId';
const uid = 'testUid';
const selected = true;

const address: Address = { id: 'testAddressId' };
const addressId: string = address.id;
const page: ListModel = {
  ids: [addressId],
  sorts: [{ code: 'code' }],
};
const params: SearchConfig = { sort: 'code' };
const unit: B2BUnit = { uid: 'testUid' };
const unitCode: string = unit.uid;

const userId = 'xxx@xxx.xxx';
const error = 'anError';

describe('OrgUnit Actions', () => {
  describe('LoadOrgUnit Actions', () => {
    describe('LoadOrgUnit', () => {
      it('should create the action', () => {
        const action = new OrgUnitActions.LoadOrgUnit({
          userId,
          orgUnitId,
        });

        expect({ ...action }).toEqual({
          type: OrgUnitActions.LOAD_ORG_UNIT,
          payload: { userId, orgUnitId },
          meta: StateUtils.entityLoadMeta(ORG_UNIT_ENTITIES, orgUnitId),
        });
      });
    });

    describe('LoadOrgUnitFail', () => {
      it('should create the action', () => {
        const action = new OrgUnitActions.LoadOrgUnitFail({ orgUnitId, error });

        expect({ ...action }).toEqual({
          type: OrgUnitActions.LOAD_ORG_UNIT_FAIL,
          payload: { orgUnitId, error },
          meta: StateUtils.entityFailMeta(ORG_UNIT_ENTITIES, orgUnitId, error),
        });
      });
    });

    describe('LoadOrgUnitSuccess', () => {
      it('should create the action', () => {
        const action = new OrgUnitActions.LoadOrgUnitSuccess([orgUnit]);

        expect({ ...action }).toEqual({
          type: OrgUnitActions.LOAD_ORG_UNIT_SUCCESS,
          payload: [orgUnit],
          meta: StateUtils.entitySuccessMeta(ORG_UNIT_ENTITIES, [orgUnitId]),
        });
      });
    });
  });

  describe('LoadOrgUnitNodes Actions', () => {
    describe('LoadOrgUnitNodes', () => {
      it('should create the action', () => {
        const action = new OrgUnitActions.LoadOrgUnitNodes({
          userId,
        });

        expect({ ...action }).toEqual({
          type: OrgUnitActions.LOAD_UNIT_NODES,
          payload: { userId },
          meta: StateUtils.entityLoadMeta(ORG_UNIT_NODE_LIST, ORG_UNIT_NODES),
        });
      });
    });

    describe('LoadOrgUnitNodesFail', () => {
      it('should create the action', () => {
        const action = new OrgUnitActions.LoadOrgUnitNodesFail({
          error: { error },
        });

        expect({ ...action }).toEqual({
          type: OrgUnitActions.LOAD_UNIT_NODES_FAIL,
          payload: { error: { error } },
          meta: StateUtils.entityFailMeta(ORG_UNIT_NODE_LIST, ORG_UNIT_NODES, {
            error,
          }),
        });
      });
    });

    describe('LoadOrgUnitNodesSuccess', () => {
      it('should create the action', () => {
        const action = new OrgUnitActions.LoadOrgUnitNodesSuccess(orgUnitList);

        expect({ ...action }).toEqual({
          type: OrgUnitActions.LOAD_UNIT_NODES_SUCCESS,
          payload: orgUnitList,
          meta: StateUtils.entitySuccessMeta(
            ORG_UNIT_NODE_LIST,
            ORG_UNIT_NODES
          ),
        });
      });
    });
  });

  describe('LoadApprovalProcesses Actions', () => {
    it('should execute LoadApprovalProcesses action', () => {
      const action = new OrgUnitActions.LoadApprovalProcesses({
        userId,
      });

      expect({ ...action }).toEqual({
        type: OrgUnitActions.LOAD_APPROVAL_PROCESSES,
        payload: { userId },
        meta: StateUtils.entityLoadMeta(
          ORG_UNIT_APPROVAL_PROCESSES_ENTITIES,
          ORG_UNIT_APPROVAL_PROCESSES
        ),
      });
    });

    it('should execute LoadApprovalProcessesFail action', () => {
      const action = new OrgUnitActions.LoadApprovalProcessesFail({ error });

      expect({ ...action }).toEqual({
        type: OrgUnitActions.LOAD_APPROVAL_PROCESSES_FAIL,
        payload: { error },
        meta: StateUtils.entityFailMeta(
          ORG_UNIT_APPROVAL_PROCESSES_ENTITIES,
          ORG_UNIT_APPROVAL_PROCESSES,
          error
        ),
      });
    });

    it('should execute LoadApprovalProcessesSuccess action', () => {
      const action = new OrgUnitActions.LoadApprovalProcessesSuccess(
        approvalProcesses
      );

      expect({ ...action }).toEqual({
        type: OrgUnitActions.LOAD_APPROVAL_PROCESSES_SUCCESS,
        payload: approvalProcesses,
        meta: StateUtils.entitySuccessMeta(
          ORG_UNIT_APPROVAL_PROCESSES_ENTITIES,
          ORG_UNIT_APPROVAL_PROCESSES
        ),
      });
    });
  });

  describe('Create Unit Actions', () => {
    it('should execute Create Unit action', () => {
      const action = new OrgUnitActions.CreateUnit({
        userId,
        unit,
      });

      expect({ ...action }).toEqual({
        type: OrgUnitActions.CREATE_ORG_UNIT,
        payload: { userId, unit },
        meta: StateUtils.entityLoadMeta(ORG_UNIT_ENTITIES, unit.uid),
      });
    });

    it('should execute Create Unit Fail action', () => {
      const action = new OrgUnitActions.CreateUnitFail({
        unitCode,
        error,
      });

      expect({ ...action }).toEqual({
        type: OrgUnitActions.CREATE_ORG_UNIT_FAIL,
        payload: { unitCode, error },
        meta: StateUtils.entityFailMeta(ORG_UNIT_ENTITIES, unitCode, error),
      });
    });

    it('should execute Create Unit Success action', () => {
      const action = new OrgUnitActions.CreateUnitSuccess(unit);

      expect({ ...action }).toEqual({
        type: OrgUnitActions.CREATE_ORG_UNIT_SUCCESS,
        payload: unit,
        meta: StateUtils.entitySuccessMeta(ORG_UNIT_ENTITIES, unitCode),
      });
    });
  });

  describe('Update Unit Actions', () => {
    it('should execute Update Unit action', () => {
      const action = new OrgUnitActions.UpdateUnit({
        userId,
        unitCode,
        unit,
      });

      expect({ ...action }).toEqual({
        type: OrgUnitActions.UPDATE_ORG_UNIT,
        payload: { userId, unitCode, unit },
        meta: StateUtils.entityLoadMeta(ORG_UNIT_ENTITIES, unit.uid),
      });
    });

    it('should execute Update Unit Fail action', () => {
      const action = new OrgUnitActions.UpdateUnitFail({
        unitCode,
        error,
      });

      expect({ ...action }).toEqual({
        type: OrgUnitActions.UPDATE_ORG_UNIT_FAIL,
        payload: { unitCode, error },
        meta: StateUtils.entityFailMeta(ORG_UNIT_ENTITIES, unitCode, error),
      });
    });

    it('should execute Update Unit Success action', () => {
      const action = new OrgUnitActions.UpdateUnitSuccess(unit);

      expect({ ...action }).toEqual({
        type: OrgUnitActions.UPDATE_ORG_UNIT_SUCCESS,
        payload: unit,
        meta: StateUtils.entitySuccessMeta(ORG_UNIT_ENTITIES, unitCode),
      });
    });
  });

  describe('Create Address Actions', () => {
    it('should execute Create Address action', () => {
      const action = new OrgUnitActions.CreateAddress({
        userId,
        orgUnitId,
        address,
      });

      expect({ ...action }).toEqual({
        type: OrgUnitActions.CREATE_ADDRESS,
        payload: { userId, orgUnitId, address },
        meta: StateUtils.entityLoadMeta(ADDRESS_ENTITIES, addressId),
      });
    });

    it('should execute Create Address Fail action', () => {
      const action = new OrgUnitActions.CreateAddressFail({
        addressId,
        error,
      });

      expect({ ...action }).toEqual({
        type: OrgUnitActions.CREATE_ADDRESS_FAIL,
        payload: { addressId, error },
        meta: StateUtils.entityFailMeta(ADDRESS_ENTITIES, addressId, error),
      });
    });

    it('should execute Create Address Success action', () => {
      const action = new OrgUnitActions.CreateAddressSuccess(address);

      expect({ ...action }).toEqual({
        type: OrgUnitActions.CREATE_ADDRESS_SUCCESS,
        payload: address,
        meta: StateUtils.entitySuccessMeta(ADDRESS_ENTITIES, addressId),
      });
    });
  });

  describe('Update Address Actions', () => {
    it('should execute Update Address action', () => {
      const action = new OrgUnitActions.UpdateAddress({
        userId,
        orgUnitId,
        addressId,
        address,
      });

      expect({ ...action }).toEqual({
        type: OrgUnitActions.UPDATE_ADDRESS,
        payload: { userId, orgUnitId, addressId, address },
        meta: StateUtils.entityLoadMeta(ADDRESS_ENTITIES, addressId),
      });
    });

    it('should execute Update Address Fail action', () => {
      const action = new OrgUnitActions.UpdateAddressFail({
        addressId,
        error,
      });

      expect({ ...action }).toEqual({
        type: OrgUnitActions.UPDATE_ADDRESS_FAIL,
        payload: { addressId, error },
        meta: StateUtils.entityFailMeta(ADDRESS_ENTITIES, addressId, error),
      });
    });

    it('should execute Update Address Success action', () => {
      const action = new OrgUnitActions.UpdateAddressSuccess(address);

      expect({ ...action }).toEqual({
        type: OrgUnitActions.UPDATE_ADDRESS_SUCCESS,
        payload: address,
        meta: StateUtils.entitySuccessMeta(ADDRESS_ENTITIES, addressId),
      });
    });
  });

  describe('Delete Address Actions', () => {
    it('should execute Delete Address action', () => {
      const action = new OrgUnitActions.DeleteAddress({
        userId,
        orgUnitId,
        addressId,
      });

      expect({ ...action }).toEqual({
        type: OrgUnitActions.DELETE_ADDRESS,
        payload: { userId, orgUnitId, addressId },
        meta: StateUtils.entityLoadMeta(ADDRESS_ENTITIES, addressId),
      });
    });

    it('should execute Delete Address Fail action', () => {
      const action = new OrgUnitActions.DeleteAddressFail({
        addressId,
        error,
      });

      expect({ ...action }).toEqual({
        type: OrgUnitActions.DELETE_ADDRESS_FAIL,
        payload: { addressId, error },
        meta: StateUtils.entityFailMeta(ADDRESS_ENTITIES, addressId, error),
      });
    });

    it('should execute Delete Address Success action', () => {
      const action = new OrgUnitActions.DeleteAddressSuccess(address);

      expect({ ...action }).toEqual({
        type: OrgUnitActions.DELETE_ADDRESS_SUCCESS,
        payload: address,
        meta: StateUtils.entityRemoveMeta(ADDRESS_ENTITIES, addressId),
      });
    });
  });

  describe('Load Addresses Actions', () => {
    it('should execute Load Addresses action', () => {
      const action = new OrgUnitActions.LoadAddresses({
        userId,
        orgUnitId,
      });

      expect({ ...action }).toEqual({
        type: OrgUnitActions.LOAD_ADDRESSES,
        payload: { userId, orgUnitId },
        meta: StateUtils.entityLoadMeta(ADDRESS_LIST, orgUnitId),
      });
    });

    it('should execute Load Addresses Fail action', () => {
      const action = new OrgUnitActions.LoadAddressesFail({
        orgUnitId,
        error,
      });

      expect({ ...action }).toEqual({
        type: OrgUnitActions.LOAD_ADDRESSES_FAIL,
        payload: { orgUnitId, error },
        meta: StateUtils.entityFailMeta(ADDRESS_LIST, orgUnitId, error),
      });
    });

    it('should execute Load Addresses Success action', () => {
      const action = new OrgUnitActions.LoadAddressesSuccess({
        page,
        orgUnitId,
      });

      expect({ ...action }).toEqual({
        type: OrgUnitActions.LOAD_ADDRESSES_SUCCESS,
        payload: { page, orgUnitId },
        meta: StateUtils.entitySuccessMeta(ADDRESS_LIST, orgUnitId),
      });
    });

    it('should execute Load Address Success action', () => {
      const action = new OrgUnitActions.LoadAddressSuccess([address]);

      expect({ ...action }).toEqual({
        type: OrgUnitActions.LOAD_ADDRESS_SUCCESS,
        payload: [address],
        meta: StateUtils.entitySuccessMeta(ADDRESS_ENTITIES, [addressId]),
      });
    });
  });

  describe('Assign Role Actions', () => {
    it('should execute Assign Role action', () => {
      const action = new OrgUnitActions.AssignRole({
        userId,
        orgCustomerId,
        roleId,
      });

      expect({ ...action }).toEqual({
        type: OrgUnitActions.ASSIGN_ROLE,
        payload: { userId, orgCustomerId, roleId },
        meta: StateUtils.entityLoadMeta(B2B_USER_ENTITIES, orgCustomerId),
      });
    });

    it('should execute Assign Role Fail action', () => {
      const action = new OrgUnitActions.AssignRoleFail({
        orgCustomerId,
        error,
      });

      expect({ ...action }).toEqual({
        type: OrgUnitActions.ASSIGN_ROLE_FAIL,
        payload: { orgCustomerId, error },
        meta: StateUtils.entityFailMeta(
          B2B_USER_ENTITIES,
          orgCustomerId,
          error
        ),
      });
    });

    it('should execute Assign Role Success action', () => {
      const action = new OrgUnitActions.AssignRoleSuccess({
        uid,
        roleId,
        selected,
      });

      expect({ ...action }).toEqual({
        type: OrgUnitActions.ASSIGN_ROLE_SUCCESS,
        payload: { uid, roleId, selected },
        meta: StateUtils.entitySuccessMeta(B2B_USER_ENTITIES, uid),
      });
    });
  });

  describe('Unassign Role Actions', () => {
    it('should execute Unassign Role action', () => {
      const action = new OrgUnitActions.UnassignRole({
        userId,
        orgCustomerId,
        roleId,
      });

      expect({ ...action }).toEqual({
        type: OrgUnitActions.UNASSIGN_ROLE,
        payload: { userId, orgCustomerId, roleId },
        meta: StateUtils.entityLoadMeta(B2B_USER_ENTITIES, orgCustomerId),
      });
    });

    it('should execute Unassign Role Fail action', () => {
      const action = new OrgUnitActions.UnassignRoleFail({
        orgCustomerId,
        error,
      });

      expect({ ...action }).toEqual({
        type: OrgUnitActions.UNASSIGN_ROLE_FAIL,
        payload: { orgCustomerId, error },
        meta: StateUtils.entityFailMeta(
          B2B_USER_ENTITIES,
          orgCustomerId,
          error
        ),
      });
    });

    it('should execute Unassign Role Success action', () => {
      const action = new OrgUnitActions.UnassignRoleSuccess({
        uid,
        roleId,
        selected,
      });

      expect({ ...action }).toEqual({
        type: OrgUnitActions.UNASSIGN_ROLE_SUCCESS,
        payload: { uid, roleId, selected },
        meta: StateUtils.entitySuccessMeta(B2B_USER_ENTITIES, uid),
      });
    });
  });

  describe('Load Tree Actions', () => {
    it('should execute Load Tree action', () => {
      const action = new OrgUnitActions.LoadTree({
        userId,
      });

      expect({ ...action }).toEqual({
        type: OrgUnitActions.LOAD_UNIT_TREE,
        payload: { userId },
        meta: StateUtils.entityLoadMeta(ORG_UNIT_TREE_ENTITY, ORG_UNIT_TREE),
      });
    });

    it('should execute Load Tree Fail action', () => {
      const action = new OrgUnitActions.LoadTreeFail({
        error,
      });

      expect({ ...action }).toEqual({
        type: OrgUnitActions.LOAD_UNIT_TREE_FAIL,
        payload: { error },
        meta: StateUtils.entityFailMeta(
          ORG_UNIT_TREE_ENTITY,
          ORG_UNIT_TREE,
          error
        ),
      });
    });

    it('should execute Load Tree Success action', () => {
      const unitNode: B2BUnitNode = { id: 'testUnitNodeId' };
      const action = new OrgUnitActions.LoadTreeSuccess(unitNode);

      expect({ ...action }).toEqual({
        type: OrgUnitActions.LOAD_UNIT_TREE_SUCCESS,
        payload: unitNode,
        meta: StateUtils.entitySuccessMeta(ORG_UNIT_TREE_ENTITY, ORG_UNIT_TREE),
      });
    });
  });

  describe('Assign Approver Actions', () => {
    it('should execute Assign Approver action', () => {
      const action = new OrgUnitActions.AssignApprover({
        userId,
        orgUnitId,
        orgCustomerId,
        roleId,
      });

      expect({ ...action }).toEqual({
        type: OrgUnitActions.ASSIGN_APPROVER,
        payload: { userId, orgUnitId, orgCustomerId, roleId },
        meta: StateUtils.entityLoadMeta(B2B_USER_ENTITIES, orgCustomerId),
      });
    });

    it('should execute Assign Approver Fail action', () => {
      const action = new OrgUnitActions.AssignApproverFail({
        orgCustomerId,
        error,
      });

      expect({ ...action }).toEqual({
        type: OrgUnitActions.ASSIGN_APPROVER_FAIL,
        payload: { orgCustomerId, error },
        meta: StateUtils.entityFailMeta(
          B2B_USER_ENTITIES,
          orgCustomerId,
          error
        ),
      });
    });

    it('should execute Assign Approver Success action', () => {
      const action = new OrgUnitActions.AssignApproverSuccess({
        uid,
        roleId,
        selected,
      });

      expect({ ...action }).toEqual({
        type: OrgUnitActions.ASSIGN_APPROVER_SUCCESS,
        payload: { uid, roleId, selected },
        meta: StateUtils.entitySuccessMeta(B2B_USER_ENTITIES, uid),
      });
    });
  });

  describe('Unassign Approver Actions', () => {
    it('should execute Unassign Approver action', () => {
      const action = new OrgUnitActions.UnassignApprover({
        userId,
        orgUnitId,
        orgCustomerId,
        roleId,
      });

      expect({ ...action }).toEqual({
        type: OrgUnitActions.UNASSIGN_APPROVER,
        payload: { userId, orgUnitId, orgCustomerId, roleId },
        meta: StateUtils.entityLoadMeta(B2B_USER_ENTITIES, orgCustomerId),
      });
    });

    it('should execute Unassign Approver Fail action', () => {
      const action = new OrgUnitActions.UnassignApproverFail({
        orgCustomerId,
        error,
      });

      expect({ ...action }).toEqual({
        type: OrgUnitActions.UNASSIGN_APPROVER_FAIL,
        payload: { orgCustomerId, error },
        meta: StateUtils.entityFailMeta(
          B2B_USER_ENTITIES,
          orgCustomerId,
          error
        ),
      });
    });

    it('should execute Unassign Approver Success action', () => {
      const action = new OrgUnitActions.UnassignApproverSuccess({
        uid,
        roleId,
        selected,
      });

      expect({ ...action }).toEqual({
        type: OrgUnitActions.UNASSIGN_APPROVER_SUCCESS,
        payload: { uid, roleId, selected },
        meta: StateUtils.entitySuccessMeta(B2B_USER_ENTITIES, uid),
      });
    });
  });

  describe('LoadAssignedUsers Actions', () => {
    it('should execute LoadAssignedUsers action', () => {
      const action = new OrgUnitActions.LoadAssignedUsers({
        userId,
        orgUnitId,
        roleId,
        params,
      });

      expect({ ...action }).toEqual({
        type: OrgUnitActions.LOAD_ASSIGNED_USERS,
        payload: { userId, orgUnitId, roleId, params },
        meta: StateUtils.entityLoadMeta(
          ORG_UNIT_ASSIGNED_USERS,
          StateUtils.serializeSearchConfig(params, `${orgUnitId},${roleId}`)
        ),
      });
    });

    it('should execute LoadAssignedUsersFail action', () => {
      const action = new OrgUnitActions.LoadAssignedUsersFail({
        orgUnitId,
        roleId,
        params,
        error,
      });

      expect({ ...action }).toEqual({
        type: OrgUnitActions.LOAD_ASSIGNED_USERS_FAIL,
        payload: { orgUnitId, roleId, params, error },
        meta: StateUtils.entityFailMeta(
          ORG_UNIT_ASSIGNED_USERS,
          StateUtils.serializeSearchConfig(params, `${orgUnitId},${roleId}`),
          error
        ),
      });
    });

    it('should execute LoadAssignedUsersSuccess action', () => {
      const action = new OrgUnitActions.LoadAssignedUsersSuccess({
        orgUnitId,
        roleId,
        page,
        params,
      });

      expect({ ...action }).toEqual({
        type: OrgUnitActions.LOAD_ASSIGNED_USERS_SUCCESS,
        payload: { orgUnitId, roleId, page, params },
        meta: StateUtils.entitySuccessMeta(
          ORG_UNIT_ASSIGNED_USERS,
          StateUtils.serializeSearchConfig(params, `${orgUnitId},${roleId}`)
        ),
      });
    });
  });

  describe('ClearAssignedUsers Actions', () => {
    it('should execute ClearAssignedUsers action', () => {
      const action = new OrgUnitActions.ClearAssignedUsers({
        orgUnitId,
        roleId,
        params,
      });

      expect({ ...action }).toEqual({
        type: OrgUnitActions.CLEAR_ASSIGNED_USERS,
        payload: { orgUnitId, roleId, params },
        meta: StateUtils.entityRemoveMeta(
          ORG_UNIT_ASSIGNED_USERS,
          StateUtils.serializeSearchConfig(params, `${orgUnitId},${roleId}`)
        ),
      });
    });
  });
});
