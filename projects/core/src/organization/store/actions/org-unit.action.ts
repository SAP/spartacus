import { B2BUnit, B2BUnitNode } from '../../../model/org-unit.model';
import {
  EntityFailAction,
  EntityLoadAction,
  EntitySuccessAction,
} from '../../../state/utils/entity-loader/entity-loader.action';
import {
  ORG_UNIT_NODE_ENTITIES,
  ORG_UNIT_NODE_LIST,
  ORG_UNIT_ENTITIES,
  ORG_UNIT_TREE_ENTITY,
} from '../organization-state';
import { ALL } from '../../utils/serializer';
import { ListModel } from '../../../model/misc.model';

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
    super(ORG_UNIT_ENTITIES, payload.map(orgUnit => orgUnit.uid));
  }
}

export class LoadOrgUnitNode extends EntityLoadAction {
  readonly type = LOAD_UNIT_NODE;
  constructor(public payload: { userId: string; orgUnitId: string }) {
    super(ORG_UNIT_NODE_ENTITIES, payload.orgUnitId);
  }
}

export class LoadOrgUnitNodeFail extends EntityFailAction {
  readonly type = LOAD_UNIT_NODE_FAIL;
  constructor(public payload: { orgUnitId: string; error: any }) {
    super(ORG_UNIT_NODE_ENTITIES, payload.orgUnitId, payload.error);
  }
}

export class LoadOrgUnitNodeSuccess extends EntitySuccessAction {
  readonly type = LOAD_UNIT_NODE_SUCCESS;

  constructor(public payload: B2BUnitNode[]) {
    super(ORG_UNIT_NODE_ENTITIES, payload.map(orgUnit => orgUnit.id));
  }
}

export class LoadOrgUnitNodes extends EntityLoadAction {
  readonly type = LOAD_UNIT_NODES;
  constructor(
    public payload: {
      userId: string;
    }
  ) {
    super(ORG_UNIT_NODE_LIST, ALL);
  }
}

export class LoadOrgUnitNodesFail extends EntityFailAction {
  readonly type = LOAD_UNIT_NODES_FAIL;
  constructor(public payload: any) {
    super(ORG_UNIT_NODE_LIST, ALL, payload.error);
  }
}

export class LoadOrgUnitNodesSuccess extends EntitySuccessAction {
  readonly type = LOAD_UNIT_NODES_SUCCESS;
  constructor(public payload: { page: ListModel }) {
    super(ORG_UNIT_NODE_LIST, ALL);
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
    super(ORG_UNIT_TREE_ENTITY, 'tree');
  }
}

export class LoadTreeFail extends EntityFailAction {
  readonly type = LOAD_UNIT_TREE_FAIL;
  constructor(public payload: { error: any }) {
    super(ORG_UNIT_TREE_ENTITY, 'tree', payload.error);
  }
}

export class LoadTreeSuccess extends EntitySuccessAction {
  readonly type = LOAD_UNIT_TREE_SUCCESS;

  constructor(public payload: B2BUnitNode) {
    super(ORG_UNIT_TREE_ENTITY, 'tree');
  }
}

export type OrgUnitAction =
  | LoadOrgUnitNode
  | LoadOrgUnitNodeFail
  | LoadOrgUnitNodeSuccess
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
  | LoadTreeFail;
