import {
  EntityFailAction,
  EntityLoadAction,
  EntitySuccessAction,
} from '../../../state/utils/entity-loader/entity-loader.action';
import { B2BSearchConfig } from '../../model/search-config';
import { serializeB2BSearchConfig } from '../../utils/serializer';
import {
  ORG_UNIT_USER_GROUP_ENTITIES,
  ORG_UNIT_USER_GROUP_LIST,
} from '../organization-state';
import { ListModel } from '../../../model/misc.model';
import { OrgUnitUserGroup } from 'projects/core/src/model/org-unit-user-group.model';

export const LOAD_ORG_UNIT_USER_GROUP =
  '[OrgUnitUserGroup] Load OrgUnitUserGroup Data';
export const LOAD_ORG_UNIT_USER_GROUP_FAIL =
  '[OrgUnitUserGroup] Load OrgUnitUserGroup Data Fail';
export const LOAD_ORG_UNIT_USER_GROUP_SUCCESS =
  '[OrgUnitUserGroup] Load OrgUnitUserGroup Data Success';

export const LOAD_ORG_UNIT_USER_GROUPS =
  '[OrgUnitUserGroup] Load OrgUnitUserGroups';
export const LOAD_ORG_UNIT_USER_GROUPS_FAIL =
  '[OrgUnitUserGroup] Load OrgUnitUserGroups Fail';
export const LOAD_ORG_UNIT_USER_GROUPS_SUCCESS =
  '[OrgUnitUserGroup] Load OrgUnitUserGroups Success';

export const CREATE_ORG_UNIT_USER_GROUP =
  '[OrgUnitUserGroup] Create OrgUnitUserGroup';
export const CREATE_ORG_UNIT_USER_GROUP_FAIL =
  '[OrgUnitUserGroup] Create OrgUnitUserGroup Fail';
export const CREATE_ORG_UNIT_USER_GROUP_SUCCESS =
  '[OrgUnitUserGroup] Create OrgUnitUserGroup Success';

export const UPDATE_ORG_UNIT_USER_GROUP =
  '[OrgUnitUserGroup] Update OrgUnitUserGroup';
export const UPDATE_ORG_UNIT_USER_GROUP_FAIL =
  '[OrgUnitUserGroup] Update OrgUnitUserGroup Fail';
export const UPDATE_ORG_UNIT_USER_GROUP_SUCCESS =
  '[OrgUnitUserGroup] Update OrgUnitUserGroup Success';

export class LoadOrgUnitUserGroup extends EntityLoadAction {
  readonly type = LOAD_ORG_UNIT_USER_GROUP;
  constructor(
    public payload: { userId: string; orgUnitUserGroupCode: string }
  ) {
    super(ORG_UNIT_USER_GROUP_ENTITIES, payload.orgUnitUserGroupCode);
  }
}

export class LoadOrgUnitUserGroupFail extends EntityFailAction {
  readonly type = LOAD_ORG_UNIT_USER_GROUP_FAIL;
  constructor(public payload: { orgUnitUserGroupCode: string; error: any }) {
    super(
      ORG_UNIT_USER_GROUP_ENTITIES,
      payload.orgUnitUserGroupCode,
      payload.error
    );
  }
}

export class LoadOrgUnitUserGroupSuccess extends EntitySuccessAction {
  readonly type = LOAD_ORG_UNIT_USER_GROUP_SUCCESS;
  constructor(public payload: OrgUnitUserGroup[]) {
    super(
      ORG_UNIT_USER_GROUP_ENTITIES,
      payload.map(orgUnitUserGroup => orgUnitUserGroup.code)
    );
  }
}

export class LoadOrgUnitUserGroups extends EntityLoadAction {
  readonly type = LOAD_ORG_UNIT_USER_GROUPS;
  constructor(
    public payload: {
      userId: string;
      params: B2BSearchConfig;
    }
  ) {
    super(ORG_UNIT_USER_GROUP_LIST, serializeB2BSearchConfig(payload.params));
  }
}

export class LoadOrgUnitUserGroupsFail extends EntityFailAction {
  readonly type = LOAD_ORG_UNIT_USER_GROUPS_FAIL;
  constructor(public payload: { params: B2BSearchConfig; error: any }) {
    super(
      ORG_UNIT_USER_GROUP_LIST,
      serializeB2BSearchConfig(payload.params),
      payload.error
    );
  }
}

export class LoadOrgUnitUserGroupsSuccess extends EntitySuccessAction {
  readonly type = LOAD_ORG_UNIT_USER_GROUPS_SUCCESS;
  constructor(
    public payload: {
      page: ListModel;
      params: B2BSearchConfig;
    }
  ) {
    super(ORG_UNIT_USER_GROUP_LIST, serializeB2BSearchConfig(payload.params));
  }
}

export class CreateOrgUnitUserGroup extends EntityLoadAction {
  readonly type = CREATE_ORG_UNIT_USER_GROUP;
  constructor(
    public payload: { userId: string; orgUnitUserGroup: OrgUnitUserGroup }
  ) {
    super(ORG_UNIT_USER_GROUP_ENTITIES, payload.orgUnitUserGroup.code);
  }
}

export class CreateOrgUnitUserGroupFail extends EntityFailAction {
  readonly type = CREATE_ORG_UNIT_USER_GROUP_FAIL;
  constructor(public payload: { orgUnitUserGroupCode: string; error: any }) {
    super(
      ORG_UNIT_USER_GROUP_ENTITIES,
      payload.orgUnitUserGroupCode,
      payload.error
    );
  }
}

export class CreateOrgUnitUserGroupSuccess extends EntitySuccessAction {
  readonly type = CREATE_ORG_UNIT_USER_GROUP_SUCCESS;
  constructor(public payload: OrgUnitUserGroup) {
    super(ORG_UNIT_USER_GROUP_ENTITIES, payload.code, payload);
  }
}

export class UpdateOrgUnitUserGroup extends EntityLoadAction {
  readonly type = UPDATE_ORG_UNIT_USER_GROUP;
  constructor(
    public payload: {
      userId: string;
      orgUnitUserGroupCode: string;
      orgUnitUserGroup: OrgUnitUserGroup;
    }
  ) {
    super(ORG_UNIT_USER_GROUP_ENTITIES, payload.orgUnitUserGroup.code);
  }
}

export class UpdateOrgUnitUserGroupFail extends EntityFailAction {
  readonly type = UPDATE_ORG_UNIT_USER_GROUP_FAIL;
  constructor(public payload: { orgUnitUserGroupCode: string; error: any }) {
    super(
      ORG_UNIT_USER_GROUP_ENTITIES,
      payload.orgUnitUserGroupCode,
      payload.error
    );
  }
}

export class UpdateOrgUnitUserGroupSuccess extends EntitySuccessAction {
  readonly type = UPDATE_ORG_UNIT_USER_GROUP_SUCCESS;
  constructor(public payload: OrgUnitUserGroup) {
    super(ORG_UNIT_USER_GROUP_ENTITIES, payload.code, payload);
  }
}

export type OrgUnitUserGroupAction =
  | LoadOrgUnitUserGroup
  | LoadOrgUnitUserGroupFail
  | LoadOrgUnitUserGroupSuccess
  | LoadOrgUnitUserGroups
  | LoadOrgUnitUserGroupsFail
  | LoadOrgUnitUserGroupsSuccess
  | CreateOrgUnitUserGroup
  | CreateOrgUnitUserGroupFail
  | CreateOrgUnitUserGroupSuccess
  | UpdateOrgUnitUserGroup
  | UpdateOrgUnitUserGroupFail
  | UpdateOrgUnitUserGroupSuccess;
