import { B2BUnitNode } from '../../../model/org-unit.model';
import {
  EntityFailAction,
  EntityLoadAction,
  EntitySuccessAction,
} from '../../../state/utils/entity-loader/entity-loader.action';
import { ORG_UNIT_ENTITIES, ORG_UNIT_LISTS } from '../organization-state';
import { LIST } from '../../model/search-config';

export const LOAD_ORG_UNIT = '[B2BUnitNode] Load B2BUnitNode Data';
export const LOAD_ORG_UNIT_FAIL = '[B2BUnitNode] Load B2BUnitNode Data Fail';
export const LOAD_ORG_UNIT_SUCCESS =
  '[B2BUnitNode] Load B2BUnitNode Data Success';

export const LOAD_ORG_UNITS = '[B2BUnitNode] Load B2BUnitNodes';
export const LOAD_ORG_UNITS_FAIL = '[B2BUnitNode] Load B2BUnitNodes Fail';
export const LOAD_ORG_UNITS_SUCCESS = '[B2BUnitNode] Load B2BUnitNodes Success';

export const CREATE_ORG_UNIT = '[B2BUnitNode] Create B2BUnitNode';
export const CREATE_ORG_UNIT_FAIL = '[B2BUnitNode] Create B2BUnitNode Fail';
export const CREATE_ORG_UNIT_SUCCESS =
  '[B2BUnitNode] Create B2BUnitNode Success';

export const UPDATE_ORG_UNIT = '[B2BUnitNode] Update B2BUnitNode';
export const UPDATE_ORG_UNIT_FAIL = '[B2BUnitNode] Update B2BUnitNode Fail';
export const UPDATE_ORG_UNIT_SUCCESS =
  '[B2BUnitNode] Update B2BUnitNode Success';

export class LoadOrgUnit extends EntityLoadAction {
  readonly type = LOAD_ORG_UNIT;
  constructor(public payload: { userId: string; orgUnitId: string }) {
    super(ORG_UNIT_ENTITIES, payload.orgUnitId);
  }
}

export class LoadOrgUnitFail extends EntityFailAction {
  readonly type = LOAD_ORG_UNIT_FAIL;
  constructor(orgUnitId: string, public payload: any) {
    super(ORG_UNIT_ENTITIES, orgUnitId, payload);
  }
}

export class LoadOrgUnitSuccess extends EntitySuccessAction {
  readonly type = LOAD_ORG_UNIT_SUCCESS;

  constructor(public payload: B2BUnitNode[]) {
    super(ORG_UNIT_ENTITIES, payload.map(orgUnit => orgUnit.id));
  }
}

export class LoadOrgUnits extends EntityLoadAction {
  readonly type = LOAD_ORG_UNITS;
  constructor(
    public payload: {
      userId: string;
    }
  ) {
    super(ORG_UNIT_LISTS, LIST);
  }
}

export class LoadOrgUnitsFail extends EntityFailAction {
  readonly type = LOAD_ORG_UNITS_FAIL;
  constructor(public payload: any) {
    super(ORG_UNIT_LISTS, LIST, payload.error);
  }
}

export class LoadOrgUnitsSuccess extends EntitySuccessAction {
  readonly type = LOAD_ORG_UNITS_SUCCESS;
  // TODO   constructor(public payload: {orgUnitPage}) {
  constructor(public payload: any) {
    super(ORG_UNIT_LISTS, LIST);
  }
}

export type OrgUnitAction =
  | LoadOrgUnit
  | LoadOrgUnitFail
  | LoadOrgUnitSuccess
  | LoadOrgUnits
  | LoadOrgUnitsFail
  | LoadOrgUnitsSuccess;
