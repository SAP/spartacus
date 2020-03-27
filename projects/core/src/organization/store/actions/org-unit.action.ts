import {
  B2BUnit,
  B2BUnitNode,
  B2BApprovalProcess,
  B2BAddress,
} from '../../../model/org-unit.model';
import { ListModel } from '../../../model/misc.model';
import { B2BSearchConfig } from '../../model/search-config';

import {
  EntityFailAction,
  EntityLoadAction,
  EntitySuccessAction,
} from '../../../state/utils/entity-loader/entity-loader.action';
import {
  ORG_UNIT_NODE_LIST,
  ORG_UNIT_ENTITIES,
  ORG_UNIT_TREE_ENTITY,
  ORG_UNIT_APPROVAL_PROCESSES_ENTITIES,
  ORG_UNIT_TREE,
  ORG_UNIT_APPROVAL_PROCESSES,
  ORG_UNIT_NODES,
  ORG_UNIT_ASSIGNED_USERS,
  B2B_USER_ENTITIES,
  ADDRESS_ENTITIES,
} from '../organization-state';
import { serializeB2BSearchConfig } from '../../utils/serializer';

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

export const CREATE_ADDRESS = '[B2BUnit] Create address';
export const CREATE_ADDRESS_SUCCESS = '[B2BUnit] Create address success';
export const CREATE_ADDRESS_FAIL = '[B2BUnit] Create address fail';

export const UPDATE_ADDRESS = '[B2BUnit] Update address';
export const UPDATE_ADDRESS_SUCCESS = '[B2BUnit] Update address success';
export const UPDATE_ADDRESS_FAIL = '[B2BUnit] Update address fail';

export class LoadOrgUnit extends EntityLoadAction {
  readonly type = LOAD_ORG_UNIT;
  constructor(public payload: { userId: string; orgUnitId: string }) {
    super(ORG_UNIT_ENTITIES, payload.orgUnitId);
  }
}

export class LoadOrgUnitFail extends EntityFailAction {
  readonly type = LOAD_ORG_UNIT_FAIL;
  constructor(public payload: { orgUnitId: string; error: any }) {
    super(ORG_UNIT_ENTITIES, payload.orgUnitId, payload.error);
  }
}

export class LoadOrgUnitSuccess extends EntitySuccessAction {
  readonly type = LOAD_ORG_UNIT_SUCCESS;

  constructor(public payload: B2BUnit[]) {
    super(
      ORG_UNIT_ENTITIES,
      payload.map(orgUnit => orgUnit.uid)
    );
  }
}

export class LoadOrgUnitNodes extends EntityLoadAction {
  readonly type = LOAD_UNIT_NODES;
  constructor(
    public payload: {
      userId: string;
    }
  ) {
    super(ORG_UNIT_NODE_LIST, ORG_UNIT_NODES);
  }
}

export class LoadOrgUnitNodesFail extends EntityFailAction {
  readonly type = LOAD_UNIT_NODES_FAIL;
  constructor(public payload: any) {
    super(ORG_UNIT_NODE_LIST, ORG_UNIT_NODES, payload.error);
  }
}

export class LoadOrgUnitNodesSuccess extends EntitySuccessAction {
  readonly type = LOAD_UNIT_NODES_SUCCESS;
  constructor(public payload: B2BUnitNode[]) {
    super(ORG_UNIT_NODE_LIST, ORG_UNIT_NODES);
  }
}

export class CreateUnit extends EntityLoadAction {
  readonly type = CREATE_ORG_UNIT;
  constructor(public payload: { userId: string; unit: B2BUnit }) {
    super(ORG_UNIT_ENTITIES, payload.unit.uid);
  }
}

export class CreateUnitFail extends EntityFailAction {
  readonly type = CREATE_ORG_UNIT_FAIL;
  constructor(public payload: { unitCode: string; error: any }) {
    super(ORG_UNIT_ENTITIES, payload.unitCode, payload.error);
  }
}

export class CreateUnitSuccess extends EntitySuccessAction {
  readonly type = CREATE_ORG_UNIT_SUCCESS;
  constructor(public payload: B2BUnit) {
    super(ORG_UNIT_ENTITIES, payload.uid, payload);
  }
}

export class UpdateUnit extends EntityLoadAction {
  readonly type = UPDATE_ORG_UNIT;
  constructor(
    public payload: { userId: string; unitCode: string; unit: B2BUnit }
  ) {
    super(ORG_UNIT_ENTITIES, payload.unit.uid);
  }
}

export class UpdateUnitFail extends EntityFailAction {
  readonly type = UPDATE_ORG_UNIT_FAIL;
  constructor(public payload: { unitCode: string; error: any }) {
    super(ORG_UNIT_ENTITIES, payload.unitCode, payload.error);
  }
}

export class UpdateUnitSuccess extends EntitySuccessAction {
  readonly type = UPDATE_ORG_UNIT_SUCCESS;
  constructor(public payload: B2BUnit) {
    super(ORG_UNIT_ENTITIES, payload.uid, payload);
  }
}

export class LoadTree extends EntityLoadAction {
  readonly type = LOAD_UNIT_TREE;
  constructor(public payload: { userId: string }) {
    super(ORG_UNIT_TREE_ENTITY, ORG_UNIT_TREE);
  }
}

export class LoadTreeFail extends EntityFailAction {
  readonly type = LOAD_UNIT_TREE_FAIL;
  constructor(public payload: { error: any }) {
    super(ORG_UNIT_TREE_ENTITY, ORG_UNIT_TREE, payload.error);
  }
}

export class LoadTreeSuccess extends EntitySuccessAction {
  readonly type = LOAD_UNIT_TREE_SUCCESS;

  constructor(public payload: B2BUnitNode) {
    super(ORG_UNIT_TREE_ENTITY, ORG_UNIT_TREE);
  }
}

export class LoadApprovalProcesses extends EntityLoadAction {
  readonly type = LOAD_APPROVAL_PROCESSES;
  constructor(public payload: { userId: string }) {
    super(ORG_UNIT_APPROVAL_PROCESSES_ENTITIES, ORG_UNIT_APPROVAL_PROCESSES);
  }
}

export class LoadApprovalProcessesFail extends EntityFailAction {
  readonly type = LOAD_APPROVAL_PROCESSES_FAIL;
  constructor(public payload: { error: any }) {
    super(
      ORG_UNIT_APPROVAL_PROCESSES_ENTITIES,
      ORG_UNIT_APPROVAL_PROCESSES,
      payload.error
    );
  }
}

export class LoadApprovalProcessesSuccess extends EntitySuccessAction {
  readonly type = LOAD_APPROVAL_PROCESSES_SUCCESS;

  constructor(public payload: B2BApprovalProcess[]) {
    super(ORG_UNIT_APPROVAL_PROCESSES_ENTITIES, ORG_UNIT_APPROVAL_PROCESSES);
  }
}

export class LoadAssignedUsers extends EntityLoadAction {
  readonly type = LOAD_ASSIGNED_USERS;
  constructor(
    public payload: {
      userId: string;
      orgUnitId: string;
      roleId: string;
      params: B2BSearchConfig;
    }
  ) {
    super(
      ORG_UNIT_ASSIGNED_USERS,
      serializeB2BSearchConfig(
        payload.params,
        `${payload.orgUnitId},${payload.roleId}`
      )
    );
  }
}

export class LoadAssignedUsersFail extends EntityFailAction {
  readonly type = LOAD_ASSIGNED_USERS_FAIL;
  constructor(
    public payload: {
      orgUnitId: string;
      roleId: string;
      params: B2BSearchConfig;
      error: any;
    }
  ) {
    super(
      ORG_UNIT_ASSIGNED_USERS,
      serializeB2BSearchConfig(
        payload.params,
        `${payload.orgUnitId},${payload.roleId}`
      ),
      payload.error
    );
  }
}

export class LoadAssignedUsersSuccess extends EntitySuccessAction {
  readonly type = LOAD_ASSIGNED_USERS_SUCCESS;
  constructor(
    public payload: {
      orgUnitId: string;
      roleId: string;
      page: ListModel;
      params: B2BSearchConfig;
    }
  ) {
    super(
      ORG_UNIT_ASSIGNED_USERS,
      serializeB2BSearchConfig(
        payload.params,
        `${payload.orgUnitId},${payload.roleId}`
      )
    );
  }
}

export class AssignRole extends EntityLoadAction {
  readonly type = ASSIGN_ROLE;
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

export class AssignRoleFail extends EntityFailAction {
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

export class AssignRoleSuccess extends EntitySuccessAction {
  readonly type = ASSIGN_ROLE_SUCCESS;
  constructor(
    public payload: { uid: string; roleId: string; selected: boolean }
  ) {
    super(B2B_USER_ENTITIES, payload.uid, payload);
  }
}

export class UnassignRole extends EntityLoadAction {
  readonly type = UNASSIGN_ROLE;
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

export class UnassignRoleFail extends EntityFailAction {
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

export class UnassignRoleSuccess extends EntitySuccessAction {
  readonly type = UNASSIGN_ROLE_SUCCESS;
  constructor(
    public payload: { uid: string; roleId: string; selected: boolean }
  ) {
    super(B2B_USER_ENTITIES, payload.uid, payload);
  }
}

export class CreateAddress extends EntityLoadAction {
  readonly type = CREATE_ADDRESS;
  constructor(public payload: { userId: string; address: B2BAddress }) {
    super(ADDRESS_ENTITIES, payload.address.id);
  }
}

export class CreateAddressFail extends EntityFailAction {
  readonly type = CREATE_ADDRESS_FAIL;
  constructor(public payload: { addressId: string; error: any }) {
    super(ADDRESS_ENTITIES, payload.addressId, payload.error);
  }
}

export class CreateAddressSuccess extends EntitySuccessAction {
  readonly type = CREATE_ADDRESS_SUCCESS;
  constructor(public payload: B2BAddress) {
    super(ADDRESS_ENTITIES, payload.id, payload);
  }
}

export class UpdateAddress extends EntityLoadAction {
  readonly type = UPDATE_ADDRESS;
  constructor(public payload: { addressId: string; address: B2BAddress }) {
    super(ADDRESS_ENTITIES, payload.address.id);
  }
}

export class UpdateAddressFail extends EntityFailAction {
  readonly type = UPDATE_ADDRESS_FAIL;
  constructor(public payload: { addressId: string; error: any }) {
    super(ADDRESS_ENTITIES, payload.addressId, payload.error);
  }
}

export class UpdateAddressSuccess extends EntitySuccessAction {
  readonly type = UPDATE_ADDRESS_SUCCESS;
  constructor(public payload: B2BAddress) {
    super(ADDRESS_ENTITIES, payload.id, payload);
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
  | UnassignRoleSuccess
  | CreateAddress
  | CreateAddressSuccess
  | CreateAddressFail
  | UpdateAddress
  | UpdateAddressSuccess
  | UpdateAddressFail;
