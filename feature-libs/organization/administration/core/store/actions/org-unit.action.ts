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

export const LOAD_ORG_UNIT = '[B2BUnit] Load B2BUnit Data';
export const LOAD_ORG_UNIT_FAIL = '[B2BUnit] Load B2BUnit Data Fail';
export const LOAD_ORG_UNIT_SUCCESS = '[B2BUnit] Load B2BUnit Data Success';

export const LOAD_UNIT_NODE = '[B2BUnitNode] Load B2BUnitNode Data';
export const LOAD_UNIT_NODE_FAIL = '[B2BUnitNode] Load B2BUnitNode Data Fail';
export const LOAD_UNIT_NODE_SUCCESS =
  '[B2BUnitNode] Load B2BUnitNode Data Success';

export const LOAD_UNIT_NODES = '[B2BUnitNode] Load B2BUnitNodes';
export const LOAD_UNIT_NODES_FAIL = '[B2BUnitNode] Load B2BUnitNodes Fail';
export const LOAD_UNIT_NODES_SUCCESS =
  '[B2BUnitNode] Load B2BUnitNodes Success';

export const CREATE_ORG_UNIT = '[B2BUnit] Create B2BUnitNode';
export const CREATE_ORG_UNIT_FAIL = '[B2BUnit] Create B2BUnitNode Fail';
export const CREATE_ORG_UNIT_SUCCESS = '[B2BUnit] Create B2BUnitNode Success';

export const UPDATE_ORG_UNIT = '[B2BUnit] Update B2BUnitNode';
export const UPDATE_ORG_UNIT_FAIL = '[B2BUnit] Update B2BUnitNode Fail';
export const UPDATE_ORG_UNIT_SUCCESS = '[B2BUnit] Update B2BUnitNode Success';

export const LOAD_UNIT_TREE = '[B2BUnitNode] Load Tree';
export const LOAD_UNIT_TREE_FAIL = '[B2BUnitNode] Load Tree Fail';
export const LOAD_UNIT_TREE_SUCCESS = '[B2BUnitNode] Load Tree Success';

export const LOAD_APPROVAL_PROCESSES =
  '[B2BApprovalProcess] Load Approval Processes';
export const LOAD_APPROVAL_PROCESSES_FAIL =
  '[B2BApprovalProcess] Load Approval Processes Fail';
export const LOAD_APPROVAL_PROCESSES_SUCCESS =
  '[B2BApprovalProcess] Load Approval Processes Success';

export const LOAD_ASSIGNED_USERS = '[B2BUnit] Load Users';
export const LOAD_ASSIGNED_USERS_SUCCESS = '[B2BUnit] Load Users success';
export const LOAD_ASSIGNED_USERS_FAIL = '[B2BUnit] Load Users fail';

export const ASSIGN_ROLE = '[B2BUnit] Assign Role';
export const ASSIGN_ROLE_SUCCESS = '[B2BUnit] Assign Role success';
export const ASSIGN_ROLE_FAIL = '[B2BUnit] Assign Role fail';

export const UNASSIGN_ROLE = '[B2BUnit] Unassign Role';
export const UNASSIGN_ROLE_SUCCESS = '[B2BUnit] Unassign Role success';
export const UNASSIGN_ROLE_FAIL = '[B2BUnit] Unassign Role fail';

export const ASSIGN_APPROVER = '[B2BUnit] Assign Approver';
export const ASSIGN_APPROVER_SUCCESS = '[B2BUnit] Assign Approver success';
export const ASSIGN_APPROVER_FAIL = '[B2BUnit] Assign Approver fail';

export const UNASSIGN_APPROVER = '[B2BUnit] Unassign Approver';
export const UNASSIGN_APPROVER_SUCCESS = '[B2BUnit] Unassign Approver success';
export const UNASSIGN_APPROVER_FAIL = '[B2BUnit] Unassign Approver fail';

export const CREATE_ADDRESS = '[B2BUnit] Create address';
export const CREATE_ADDRESS_SUCCESS = '[B2BUnit] Create address success';
export const CREATE_ADDRESS_FAIL = '[B2BUnit] Create address fail';

export const UPDATE_ADDRESS = '[B2BUnit] Update address';
export const UPDATE_ADDRESS_SUCCESS = '[B2BUnit] Update address success';
export const UPDATE_ADDRESS_FAIL = '[B2BUnit] Update address fail';

export const DELETE_ADDRESS = '[B2BUnit] Delete address';
export const DELETE_ADDRESS_SUCCESS = '[B2BUnit] Delete address success';
export const DELETE_ADDRESS_FAIL = '[B2BUnit] Delete address fail';

export const LOAD_ADDRESS_SUCCESS = '[B2BUnit] Load address success';

export const LOAD_ADDRESSES = '[B2BUnit] Load addresses';
export const LOAD_ADDRESSES_SUCCESS = '[B2BUnit] Load addresses success';
export const LOAD_ADDRESSES_FAIL = '[B2BUnit] Load addresses fail';

export const CLEAR_ASSIGNED_USERS = '[B2BUnit] Clear Assigned Users';

export class LoadOrgUnit extends StateUtils.EntityLoadAction {
  readonly type = LOAD_ORG_UNIT;
  constructor(public payload: { userId: string; orgUnitId: string }) {
    super(ORG_UNIT_ENTITIES, payload.orgUnitId);
  }
}

export class LoadOrgUnitFail extends StateUtils.EntityFailAction {
  readonly type = LOAD_ORG_UNIT_FAIL;
  constructor(public payload: { orgUnitId: string; error: any }) {
    super(ORG_UNIT_ENTITIES, payload.orgUnitId, payload.error);
  }
}

export class LoadOrgUnitSuccess extends StateUtils.EntitySuccessAction {
  readonly type = LOAD_ORG_UNIT_SUCCESS;

  constructor(public payload: B2BUnit | B2BUnit[]) {
    super(
      ORG_UNIT_ENTITIES,
      Array.isArray(payload)
        ? payload.map((orgUnit) => orgUnit?.uid)
        : payload?.uid
    );
  }
}

export class LoadOrgUnitNodes extends StateUtils.EntityLoadAction {
  readonly type = LOAD_UNIT_NODES;
  constructor(
    public payload: {
      userId: string;
    }
  ) {
    super(ORG_UNIT_NODE_LIST, ORG_UNIT_NODES);
  }
}

export class LoadOrgUnitNodesFail extends StateUtils.EntityFailAction {
  readonly type = LOAD_UNIT_NODES_FAIL;
  constructor(public payload: any) {
    super(ORG_UNIT_NODE_LIST, ORG_UNIT_NODES, payload.error);
  }
}

export class LoadOrgUnitNodesSuccess extends StateUtils.EntitySuccessAction {
  readonly type = LOAD_UNIT_NODES_SUCCESS;
  constructor(public payload: B2BUnitNode[]) {
    super(ORG_UNIT_NODE_LIST, ORG_UNIT_NODES);
  }
}

export class CreateUnit extends StateUtils.EntityLoadAction {
  readonly type = CREATE_ORG_UNIT;
  constructor(public payload: { userId: string; unit: B2BUnit }) {
    super(ORG_UNIT_ENTITIES, payload.unit.uid);
  }
}

export class CreateUnitFail extends StateUtils.EntityFailAction {
  readonly type = CREATE_ORG_UNIT_FAIL;
  constructor(public payload: { unitCode: string; error: any }) {
    super(ORG_UNIT_ENTITIES, payload.unitCode, payload.error);
  }
}

export class CreateUnitSuccess extends StateUtils.EntitySuccessAction {
  readonly type = CREATE_ORG_UNIT_SUCCESS;
  constructor(public payload: B2BUnit) {
    super(ORG_UNIT_ENTITIES, payload.uid, payload);
  }
}

export class UpdateUnit extends StateUtils.EntityLoadAction {
  readonly type = UPDATE_ORG_UNIT;
  constructor(
    public payload: { userId: string; unitCode: string; unit: B2BUnit }
  ) {
    super(ORG_UNIT_ENTITIES, payload.unit.uid);
  }
}

export class UpdateUnitFail extends StateUtils.EntityFailAction {
  readonly type = UPDATE_ORG_UNIT_FAIL;
  constructor(public payload: { unitCode: string; error: any }) {
    super(ORG_UNIT_ENTITIES, payload.unitCode, payload.error);
  }
}

export class UpdateUnitSuccess extends StateUtils.EntitySuccessAction {
  readonly type = UPDATE_ORG_UNIT_SUCCESS;
  constructor(public payload: B2BUnit) {
    super(ORG_UNIT_ENTITIES, payload.uid, payload);
  }
}

export class LoadTree extends StateUtils.EntityLoadAction {
  readonly type = LOAD_UNIT_TREE;
  constructor(public payload: { userId: string }) {
    super(ORG_UNIT_TREE_ENTITY, ORG_UNIT_TREE);
  }
}

export class LoadTreeFail extends StateUtils.EntityFailAction {
  readonly type = LOAD_UNIT_TREE_FAIL;
  constructor(public payload: { error: any }) {
    super(ORG_UNIT_TREE_ENTITY, ORG_UNIT_TREE, payload.error);
  }
}

export class LoadTreeSuccess extends StateUtils.EntitySuccessAction {
  readonly type = LOAD_UNIT_TREE_SUCCESS;

  constructor(public payload: B2BUnitNode) {
    super(ORG_UNIT_TREE_ENTITY, ORG_UNIT_TREE);
  }
}

export class LoadApprovalProcesses extends StateUtils.EntityLoadAction {
  readonly type = LOAD_APPROVAL_PROCESSES;
  constructor(public payload: { userId: string }) {
    super(ORG_UNIT_APPROVAL_PROCESSES_ENTITIES, ORG_UNIT_APPROVAL_PROCESSES);
  }
}

export class LoadApprovalProcessesFail extends StateUtils.EntityFailAction {
  readonly type = LOAD_APPROVAL_PROCESSES_FAIL;
  constructor(public payload: { error: any }) {
    super(
      ORG_UNIT_APPROVAL_PROCESSES_ENTITIES,
      ORG_UNIT_APPROVAL_PROCESSES,
      payload.error
    );
  }
}

export class LoadApprovalProcessesSuccess extends StateUtils.EntitySuccessAction {
  readonly type = LOAD_APPROVAL_PROCESSES_SUCCESS;

  constructor(public payload: B2BApprovalProcess[]) {
    super(ORG_UNIT_APPROVAL_PROCESSES_ENTITIES, ORG_UNIT_APPROVAL_PROCESSES);
  }
}

export class LoadAssignedUsers extends StateUtils.EntityLoadAction {
  readonly type = LOAD_ASSIGNED_USERS;
  constructor(
    public payload: {
      userId: string;
      orgUnitId: string;
      roleId: string;
      params: SearchConfig;
    }
  ) {
    super(
      ORG_UNIT_ASSIGNED_USERS,
      StateUtils.serializeSearchConfig(
        payload.params,
        `${payload.orgUnitId},${payload.roleId}`
      )
    );
  }
}

export class ClearAssignedUsers extends StateUtils.EntityRemoveAction {
  readonly type = CLEAR_ASSIGNED_USERS;
  constructor(
    public payload: {
      orgUnitId: string;
      roleId: string;
      params: SearchConfig;
    }
  ) {
    super(
      ORG_UNIT_ASSIGNED_USERS,
      StateUtils.serializeSearchConfig(
        payload.params,
        `${payload.orgUnitId},${payload.roleId}`
      )
    );
  }
}

export class LoadAssignedUsersFail extends StateUtils.EntityFailAction {
  readonly type = LOAD_ASSIGNED_USERS_FAIL;
  constructor(
    public payload: {
      orgUnitId: string;
      roleId: string;
      params: SearchConfig;
      error: any;
    }
  ) {
    super(
      ORG_UNIT_ASSIGNED_USERS,
      StateUtils.serializeSearchConfig(
        payload.params,
        `${payload.orgUnitId},${payload.roleId}`
      ),
      payload.error
    );
  }
}

export class LoadAssignedUsersSuccess extends StateUtils.EntitySuccessAction {
  readonly type = LOAD_ASSIGNED_USERS_SUCCESS;
  constructor(
    public payload: {
      orgUnitId: string;
      roleId: string;
      page: ListModel;
      params: SearchConfig;
    }
  ) {
    super(
      ORG_UNIT_ASSIGNED_USERS,
      StateUtils.serializeSearchConfig(
        payload.params,
        `${payload.orgUnitId},${payload.roleId}`
      )
    );
  }
}

export class AssignRole extends StateUtils.EntityLoadAction {
  readonly type = ASSIGN_ROLE;
  constructor(
    public payload: {
      userId: string;
      orgCustomerId: string;
      roleId: string;
    }
  ) {
    super(B2B_USER_ENTITIES, payload.orgCustomerId);
  }
}

export class AssignRoleFail extends StateUtils.EntityFailAction {
  readonly type = ASSIGN_ROLE_FAIL;
  constructor(
    public payload: {
      orgCustomerId: string;
      error: any;
    }
  ) {
    super(B2B_USER_ENTITIES, payload.orgCustomerId, payload.error);
  }
}

export class AssignRoleSuccess extends StateUtils.EntitySuccessAction {
  readonly type = ASSIGN_ROLE_SUCCESS;
  constructor(
    public payload: { uid: string; roleId: string; selected: boolean }
  ) {
    super(B2B_USER_ENTITIES, payload.uid, payload);
  }
}

export class UnassignRole extends StateUtils.EntityLoadAction {
  readonly type = UNASSIGN_ROLE;
  constructor(
    public payload: {
      userId: string;
      orgCustomerId: string;
      roleId: string;
    }
  ) {
    super(B2B_USER_ENTITIES, payload.orgCustomerId);
  }
}

export class UnassignRoleFail extends StateUtils.EntityFailAction {
  readonly type = UNASSIGN_ROLE_FAIL;
  constructor(
    public payload: {
      orgCustomerId: string;
      error: any;
    }
  ) {
    super(B2B_USER_ENTITIES, payload.orgCustomerId, payload.error);
  }
}

export class UnassignRoleSuccess extends StateUtils.EntitySuccessAction {
  readonly type = UNASSIGN_ROLE_SUCCESS;
  constructor(
    public payload: { uid: string; roleId: string; selected: boolean }
  ) {
    super(B2B_USER_ENTITIES, payload.uid, payload);
  }
}

export class AssignApprover extends StateUtils.EntityLoadAction {
  readonly type = ASSIGN_APPROVER;
  constructor(
    public payload: {
      userId: string;
      orgUnitId: string;
      orgCustomerId: string;
      roleId: string;
    }
  ) {
    super(B2B_USER_ENTITIES, payload.orgCustomerId);
  }
}

export class AssignApproverFail extends StateUtils.EntityFailAction {
  readonly type = ASSIGN_APPROVER_FAIL;
  constructor(
    public payload: {
      orgCustomerId: string;
      error: any;
    }
  ) {
    super(B2B_USER_ENTITIES, payload.orgCustomerId, payload.error);
  }
}

export class AssignApproverSuccess extends StateUtils.EntitySuccessAction {
  readonly type = ASSIGN_APPROVER_SUCCESS;
  constructor(
    public payload: { uid: string; roleId: string; selected: boolean }
  ) {
    super(B2B_USER_ENTITIES, payload.uid, payload);
  }
}

export class UnassignApprover extends StateUtils.EntityLoadAction {
  readonly type = UNASSIGN_APPROVER;
  constructor(
    public payload: {
      userId: string;
      orgUnitId: string;
      orgCustomerId: string;
      roleId: string;
    }
  ) {
    super(B2B_USER_ENTITIES, payload.orgCustomerId);
  }
}

export class UnassignApproverFail extends StateUtils.EntityFailAction {
  readonly type = UNASSIGN_APPROVER_FAIL;
  constructor(
    public payload: {
      orgCustomerId: string;
      error: any;
    }
  ) {
    super(B2B_USER_ENTITIES, payload.orgCustomerId, payload.error);
  }
}

export class UnassignApproverSuccess extends StateUtils.EntitySuccessAction {
  readonly type = UNASSIGN_APPROVER_SUCCESS;
  constructor(
    public payload: { uid: string; roleId: string; selected: boolean }
  ) {
    super(B2B_USER_ENTITIES, payload.uid, payload);
  }
}

export class CreateAddress extends StateUtils.EntityLoadAction {
  readonly type = CREATE_ADDRESS;
  constructor(
    public payload: { userId: string; orgUnitId: string; address: Address }
  ) {
    super(ADDRESS_ENTITIES, payload.address.id);
  }
}

export class CreateAddressFail extends StateUtils.EntityFailAction {
  readonly type = CREATE_ADDRESS_FAIL;
  constructor(public payload: { addressId: string; error: any }) {
    super(ADDRESS_ENTITIES, payload.addressId, payload.error);
  }
}

export class CreateAddressSuccess extends StateUtils.EntitySuccessAction {
  readonly type = CREATE_ADDRESS_SUCCESS;
  constructor(public payload: Address) {
    super(ADDRESS_ENTITIES, payload.id, payload);
  }
}

export class UpdateAddress extends StateUtils.EntityLoadAction {
  readonly type = UPDATE_ADDRESS;
  constructor(
    public payload: {
      userId: string;
      orgUnitId: string;
      addressId: string;
      address: Address;
    }
  ) {
    super(ADDRESS_ENTITIES, payload.address.id);
  }
}

export class UpdateAddressFail extends StateUtils.EntityFailAction {
  readonly type = UPDATE_ADDRESS_FAIL;
  constructor(public payload: { addressId: string; error: any }) {
    super(ADDRESS_ENTITIES, payload.addressId, payload.error);
  }
}

export class UpdateAddressSuccess extends StateUtils.EntitySuccessAction {
  readonly type = UPDATE_ADDRESS_SUCCESS;
  constructor(public payload: Address) {
    super(ADDRESS_ENTITIES, payload.id, payload);
  }
}

export class DeleteAddress extends StateUtils.EntityLoadAction {
  readonly type = DELETE_ADDRESS;
  constructor(
    public payload: {
      userId: string;
      orgUnitId: string;
      addressId: string;
    }
  ) {
    super(ADDRESS_ENTITIES, payload.addressId);
  }
}

export class DeleteAddressFail extends StateUtils.EntityFailAction {
  readonly type = DELETE_ADDRESS_FAIL;
  constructor(public payload: { addressId: string; error: any }) {
    super(ADDRESS_ENTITIES, payload.addressId, payload.error);
  }
}

export class DeleteAddressSuccess extends StateUtils.EntityRemoveAction {
  readonly type = DELETE_ADDRESS_SUCCESS;
  constructor(public payload: Address) {
    super(ADDRESS_ENTITIES, payload.id);
  }
}

export class LoadAddressSuccess extends StateUtils.EntitySuccessAction {
  readonly type = LOAD_ADDRESS_SUCCESS;
  constructor(public payload: Address | Address[]) {
    super(
      ADDRESS_ENTITIES,
      Array.isArray(payload)
        ? payload.map((address) => address?.id)
        : payload?.id
    );
  }
}

export class LoadAddresses extends StateUtils.EntityLoadAction {
  readonly type = LOAD_ADDRESSES;
  constructor(public payload: { userId: string; orgUnitId: string }) {
    super(ADDRESS_LIST, payload.orgUnitId);
  }
}

export class LoadAddressesFail extends StateUtils.EntityFailAction {
  readonly type = LOAD_ADDRESSES_FAIL;
  constructor(public payload: { orgUnitId: string; error: any }) {
    super(ADDRESS_LIST, payload.orgUnitId, payload.error);
  }
}

export class LoadAddressesSuccess extends StateUtils.EntitySuccessAction {
  readonly type = LOAD_ADDRESSES_SUCCESS;
  constructor(
    public payload: {
      page: ListModel;
      orgUnitId: string;
    }
  ) {
    super(ADDRESS_LIST, payload.orgUnitId);
  }
}

export type OrgUnitAction =
  | LoadOrgUnitNodes
  | LoadOrgUnitNodesFail
  | LoadOrgUnitNodesSuccess
  | LoadOrgUnit
  | LoadOrgUnitFail
  | LoadOrgUnitSuccess
  | CreateUnit
  | CreateUnitFail
  | CreateUnitSuccess
  | UpdateUnit
  | UpdateUnitFail
  | UpdateUnitSuccess
  | LoadTree
  | LoadTreeSuccess
  | LoadTreeFail
  | LoadApprovalProcesses
  | LoadApprovalProcessesSuccess
  | LoadApprovalProcessesFail
  | AssignRole
  | AssignRoleSuccess
  | AssignRoleFail
  | UnassignRole
  | UnassignRoleSuccess
  | UnassignRoleFail
  | AssignApprover
  | AssignApproverSuccess
  | AssignApproverFail
  | UnassignApprover
  | UnassignApproverSuccess
  | UnassignApproverFail
  | CreateAddress
  | CreateAddressSuccess
  | CreateAddressFail
  | UpdateAddress
  | UpdateAddressSuccess
  | UpdateAddressFail
  | DeleteAddress
  | DeleteAddressSuccess
  | DeleteAddressFail
  | LoadAddresses
  | LoadAddressesFail
  | LoadAddressesSuccess
  | LoadAddressSuccess
  | ClearAssignedUsers;
