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
  ORG_UNIT_USER_GROUP_AVAILABLE_ORDER_APPROVAL_PERMISSIONS,
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

export const LOAD_ORG_UNIT_USER_GROUP_AVAILABLE_ORDER_APPROVAL_PERMISSIONS =
  '[OrgUnitUserGroup] Load OrgUnitUserGroup AvailableOrderApprovalPermissions Data';
export const LOAD_ORG_UNIT_USER_GROUP_AVAILABLE_ORDER_APPROVAL_PERMISSIONS_FAIL =
  '[OrgUnitUserGroup] Load OrgUnitUserGroup AvailableOrderApprovalPermissions Data Fail';
export const LOAD_ORG_UNIT_USER_GROUP_AVAILABLE_ORDER_APPROVAL_PERMISSIONS_SUCCESS =
  '[OrgUnitUserGroup] Load OrgUnitUserGroup AvailableOrderApprovalPermissions Data Success';

export const LOAD_ORG_UNIT_USER_GROUP_AVAILABLE_ORG_CUSTOMERS =
  '[OrgUnitUserGroup] Load OrgUnitUserGroup AvailableOrgCustomers Data';
export const LOAD_ORG_UNIT_USER_GROUP_AVAILABLE_ORG_CUSTOMERS_FAIL =
  '[OrgUnitUserGroup] Load OrgUnitUserGroup AvailableOrgCustomers Data Fail';
export const LOAD_ORG_UNIT_USER_GROUP_AVAILABLE_ORG_CUSTOMERS_SUCCESS =
  '[OrgUnitUserGroup] Load OrgUnitUserGroup AvailableOrgCustomers Data Success';

export const CREATE_ORG_UNIT_USER_GROUP =
  '[OrgUnitUserGroup] Create OrgUnitUserGroup';
export const CREATE_ORG_UNIT_USER_GROUP_FAIL =
  '[OrgUnitUserGroup] Create OrgUnitUserGroup Fail';
export const CREATE_ORG_UNIT_USER_GROUP_SUCCESS =
  '[OrgUnitUserGroup] Create OrgUnitUserGroup Success';

export const CREATE_ORG_UNIT_USER_GROUP_MEMBER =
  '[OrgUnitUserGroup] Create OrgUnitUserGroup Member';
export const CREATE_ORG_UNIT_USER_GROUP_MEMBER_FAIL =
  '[OrgUnitUserGroup] Create OrgUnitUserGroup Member Fail';
export const CREATE_ORG_UNIT_USER_GROUP_MEMBER_SUCCESS =
  '[OrgUnitUserGroup] Create OrgUnitUserGroup Member Success';

export const CREATE_ORG_UNIT_USER_GROUP_ORDER_APPROVAL_PERMISSION =
  '[OrgUnitUserGroup] Create OrgUnitUserGroup OrderApprovalPermissions';
export const CREATE_ORG_UNIT_USER_GROUP_ORDER_APPROVAL_PERMISSION_FAIL =
  '[OrgUnitUserGroup] Create OrgUnitUserGroup OrderApprovalPermissions Fail';
export const CREATE_ORG_UNIT_USER_GROUP_ORDER_APPROVAL_PERMISSION_SUCCESS =
  '[OrgUnitUserGroup] Create OrgUnitUserGroup OrderApprovalPermissions Success';

export const UPDATE_ORG_UNIT_USER_GROUP =
  '[OrgUnitUserGroup] Update OrgUnitUserGroup';
export const UPDATE_ORG_UNIT_USER_GROUP_FAIL =
  '[OrgUnitUserGroup] Update OrgUnitUserGroup Fail';
export const UPDATE_ORG_UNIT_USER_GROUP_SUCCESS =
  '[OrgUnitUserGroup] Update OrgUnitUserGroup Success';

export const DELETE_ORG_UNIT_USER_GROUP =
  '[OrgUnitUserGroup] Delete OrgUnitUserGroup';
export const DELETE_ORG_UNIT_USER_GROUP_FAIL =
  '[OrgUnitUserGroup] Delete OrgUnitUserGroup Fail';
export const DELETE_ORG_UNIT_USER_GROUP_SUCCESS =
  '[OrgUnitUserGroup] Delete OrgUnitUserGroup Success';

export const DELETE_ORG_UNIT_USER_GROUP_MEMBERS =
  '[OrgUnitUserGroup] Delete OrgUnitUserGroup Members';
export const DELETE_ORG_UNIT_USER_GROUP_MEMBERS_FAIL =
  '[OrgUnitUserGroup] Delete OrgUnitUserGroup Members Fail';
export const DELETE_ORG_UNIT_USER_GROUP_MEMBERS_SUCCESS =
  '[OrgUnitUserGroup] Delete OrgUnitUserGroup Members Success';

export const DELETE_ORG_UNIT_USER_GROUP_MEMBER =
  '[OrgUnitUserGroup] Delete OrgUnitUserGroup Member';
export const DELETE_ORG_UNIT_USER_GROUP_MEMBER_FAIL =
  '[OrgUnitUserGroup] Delete OrgUnitUserGroup Member Fail';
export const DELETE_ORG_UNIT_USER_GROUP_MEMBER_SUCCESS =
  '[OrgUnitUserGroup] Delete OrgUnitUserGroup Member Success';

export const DELETE_ORG_UNIT_USER_GROUP_ORDER_APPROVAL_PERMISSION =
  '[OrgUnitUserGroup] Delete OrgUnitUserGroup OrderApprovalPermissions';
export const DELETE_ORG_UNIT_USER_GROUP_ORDER_APPROVAL_PERMISSION_FAIL =
  '[OrgUnitUserGroup] Delete OrgUnitUserGroup OrderApprovalPermissions Fail';
export const DELETE_ORG_UNIT_USER_GROUP_ORDER_APPROVAL_PERMISSION_SUCCESS =
  '[OrgUnitUserGroup] Delete OrgUnitUserGroup OrderApprovalPermissions Success';

export class LoadOrgUnitUserGroup extends EntityLoadAction {
  readonly type = LOAD_ORG_UNIT_USER_GROUP;
  constructor(public payload: { userId: string; orgUnitUserGroupUid: string }) {
    super(ORG_UNIT_USER_GROUP_ENTITIES, payload.orgUnitUserGroupUid);
  }
}

export class LoadOrgUnitUserGroupFail extends EntityFailAction {
  readonly type = LOAD_ORG_UNIT_USER_GROUP_FAIL;
  constructor(public payload: { orgUnitUserGroupUid: string; error: any }) {
    super(
      ORG_UNIT_USER_GROUP_ENTITIES,
      payload.orgUnitUserGroupUid,
      payload.error
    );
  }
}

export class LoadOrgUnitUserGroupSuccess extends EntitySuccessAction {
  readonly type = LOAD_ORG_UNIT_USER_GROUP_SUCCESS;
  constructor(public payload: OrgUnitUserGroup[]) {
    super(
      ORG_UNIT_USER_GROUP_ENTITIES,
      payload.map(orgUnitUserGroup => orgUnitUserGroup.uid)
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

export class LoadOrgUnitUserGroupAvailableOrderApprovalPermissions extends EntityLoadAction {
  readonly type = LOAD_ORG_UNIT_USER_GROUP_AVAILABLE_ORDER_APPROVAL_PERMISSIONS;
  constructor(
    public payload: {
      userId: string;
      orgUnitUserGroupUid: string;
      params: B2BSearchConfig;
    }
  ) {
    super(
      ORG_UNIT_USER_GROUP_AVAILABLE_ORDER_APPROVAL_PERMISSIONS,
      payload.orgUnitUserGroupUid
    );
  }
}

export class LoadOrgUnitUserGroupAvailableOrderApprovalPermissionsFail extends EntityFailAction {
  readonly type = LOAD_ORG_UNIT_USER_GROUP_AVAILABLE_ORDER_APPROVAL_PERMISSIONS_FAIL;
  constructor(
    public payload: {
      orgUnitUserGroupUid: string;
      params: B2BSearchConfig;
      error: any;
    }
  ) {
    super(
      ORG_UNIT_USER_GROUP_AVAILABLE_ORDER_APPROVAL_PERMISSIONS,
      payload.orgUnitUserGroupUid,
      payload.error
    );
  }
}

export class LoadOrgUnitUserGroupAvailableOrderApprovalPermissionsSuccess extends EntitySuccessAction {
  readonly type = LOAD_ORG_UNIT_USER_GROUP_AVAILABLE_ORDER_APPROVAL_PERMISSIONS_SUCCESS;
  constructor(
    public payload: {
      orgUnitUserGroupUid: string;
      page: ListModel;
      params: B2BSearchConfig;
    }
  ) {
    super(
      ORG_UNIT_USER_GROUP_AVAILABLE_ORDER_APPROVAL_PERMISSIONS,
      serializeB2BSearchConfig(payload.params, payload.orgUnitUserGroupUid)
    );
  }
}

export class LoadOrgUnitUserGroupAvailableOrgCustomers extends EntityLoadAction {
  readonly type = LOAD_ORG_UNIT_USER_GROUP_AVAILABLE_ORG_CUSTOMERS;
  constructor(public payload: { userId: string; orgUnitUserGroupUid: string }) {
    super(ORG_UNIT_USER_GROUP_ENTITIES, payload.orgUnitUserGroupUid);
  }
}

export class LoadOrgUnitUserGroupAvailableOrgCustomersFail extends EntityFailAction {
  readonly type = LOAD_ORG_UNIT_USER_GROUP_AVAILABLE_ORG_CUSTOMERS;
  constructor(public payload: { orgUnitUserGroupUid: string; error: any }) {
    super(
      ORG_UNIT_USER_GROUP_ENTITIES,
      payload.orgUnitUserGroupUid,
      payload.error
    );
  }
}

export class LoadOrgUnitUserGroupAvailableOrgCustomersSuccess extends EntitySuccessAction {
  readonly type = LOAD_ORG_UNIT_USER_GROUP_AVAILABLE_ORG_CUSTOMERS;
  constructor(public payload: OrgUnitUserGroup[]) {
    super(
      ORG_UNIT_USER_GROUP_ENTITIES,
      payload.map(orgUnitUserGroup => orgUnitUserGroup.uid)
    );
  }
}

export class CreateOrgUnitUserGroup extends EntityLoadAction {
  readonly type = CREATE_ORG_UNIT_USER_GROUP;
  constructor(
    public payload: { userId: string; orgUnitUserGroup: OrgUnitUserGroup }
  ) {
    super(ORG_UNIT_USER_GROUP_ENTITIES, payload.orgUnitUserGroup.uid);
  }
}

export class CreateOrgUnitUserGroupFail extends EntityFailAction {
  readonly type = CREATE_ORG_UNIT_USER_GROUP_FAIL;
  constructor(public payload: { orgUnitUserGroupUid: string; error: any }) {
    super(
      ORG_UNIT_USER_GROUP_ENTITIES,
      payload.orgUnitUserGroupUid,
      payload.error
    );
  }
}

export class CreateOrgUnitUserGroupSuccess extends EntitySuccessAction {
  readonly type = CREATE_ORG_UNIT_USER_GROUP_SUCCESS;
  constructor(public payload: OrgUnitUserGroup) {
    super(ORG_UNIT_USER_GROUP_ENTITIES, payload.uid, payload);
  }
}

export class CreateOrgUnitUserGroupMember extends EntityLoadAction {
  readonly type = CREATE_ORG_UNIT_USER_GROUP_MEMBER;
  constructor(
    public payload: { userId: string; orgUnitUserGroup: OrgUnitUserGroup }
  ) {
    super(ORG_UNIT_USER_GROUP_ENTITIES, payload.orgUnitUserGroup.uid);
  }
}

export class CreateOrgUnitUserGroupMemberFail extends EntityFailAction {
  readonly type = CREATE_ORG_UNIT_USER_GROUP_MEMBER_FAIL;
  constructor(public payload: { orgUnitUserGroupUid: string; error: any }) {
    super(
      ORG_UNIT_USER_GROUP_ENTITIES,
      payload.orgUnitUserGroupUid,
      payload.error
    );
  }
}

export class CreateOrgUnitUserGroupMemberSuccess extends EntitySuccessAction {
  readonly type = CREATE_ORG_UNIT_USER_GROUP_MEMBER_SUCCESS;
  constructor(public payload: OrgUnitUserGroup) {
    super(ORG_UNIT_USER_GROUP_ENTITIES, payload.uid, payload);
  }
}

export class CreateOrgUnitUserGroupOrderApprovalPermissions extends EntityLoadAction {
  readonly type = CREATE_ORG_UNIT_USER_GROUP_ORDER_APPROVAL_PERMISSION;
  constructor(
    public payload: { userId: string; orgUnitUserGroup: OrgUnitUserGroup }
  ) {
    super(ORG_UNIT_USER_GROUP_ENTITIES, payload.orgUnitUserGroup.uid);
  }
}

export class CreateOrgUnitUserGroupOrderApprovalPermissionsFail extends EntityFailAction {
  readonly type = CREATE_ORG_UNIT_USER_GROUP_ORDER_APPROVAL_PERMISSION_FAIL;
  constructor(public payload: { orgUnitUserGroupUid: string; error: any }) {
    super(
      ORG_UNIT_USER_GROUP_ENTITIES,
      payload.orgUnitUserGroupUid,
      payload.error
    );
  }
}

export class CreateOrgUnitUserGroupOrderApprovalPermissionsSuccess extends EntitySuccessAction {
  readonly type = CREATE_ORG_UNIT_USER_GROUP_ORDER_APPROVAL_PERMISSION_SUCCESS;
  constructor(public payload: OrgUnitUserGroup) {
    super(ORG_UNIT_USER_GROUP_ENTITIES, payload.uid, payload);
  }
}

export class UpdateOrgUnitUserGroup extends EntityLoadAction {
  readonly type = UPDATE_ORG_UNIT_USER_GROUP;
  constructor(
    public payload: {
      userId: string;
      orgUnitUserGroupUid: string;
      orgUnitUserGroup: OrgUnitUserGroup;
    }
  ) {
    super(ORG_UNIT_USER_GROUP_ENTITIES, payload.orgUnitUserGroup.uid);
  }
}

export class UpdateOrgUnitUserGroupFail extends EntityFailAction {
  readonly type = UPDATE_ORG_UNIT_USER_GROUP_FAIL;
  constructor(public payload: { orgUnitUserGroupUid: string; error: any }) {
    super(
      ORG_UNIT_USER_GROUP_ENTITIES,
      payload.orgUnitUserGroupUid,
      payload.error
    );
  }
}

export class UpdateOrgUnitUserGroupSuccess extends EntitySuccessAction {
  readonly type = UPDATE_ORG_UNIT_USER_GROUP_SUCCESS;
  constructor(public payload: OrgUnitUserGroup) {
    super(ORG_UNIT_USER_GROUP_ENTITIES, payload.uid, payload);
  }
}

export class DeleteOrgUnitUserGroup extends EntityLoadAction {
  readonly type = DELETE_ORG_UNIT_USER_GROUP;
  constructor(
    public payload: {
      userId: string;
      orgUnitUserGroupUid: string;
      orgUnitUserGroup: OrgUnitUserGroup;
    }
  ) {
    super(ORG_UNIT_USER_GROUP_ENTITIES, payload.orgUnitUserGroup.uid);
  }
}

export class DeleteOrgUnitUserGroupFail extends EntityFailAction {
  readonly type = DELETE_ORG_UNIT_USER_GROUP_FAIL;
  constructor(public payload: { orgUnitUserGroupUid: string; error: any }) {
    super(
      ORG_UNIT_USER_GROUP_ENTITIES,
      payload.orgUnitUserGroupUid,
      payload.error
    );
  }
}

export class DeleteOrgUnitUserGroupSuccess extends EntitySuccessAction {
  readonly type = DELETE_ORG_UNIT_USER_GROUP_SUCCESS;
  constructor(public payload: OrgUnitUserGroup) {
    super(ORG_UNIT_USER_GROUP_ENTITIES, payload.uid, payload);
  }
}

export class DeleteOrgUnitUserGroupMember extends EntityLoadAction {
  readonly type = DELETE_ORG_UNIT_USER_GROUP_MEMBER;
  constructor(
    public payload: {
      userId: string;
      orgUnitUserGroupUid: string;
      orgUnitUserGroup: OrgUnitUserGroup;
    }
  ) {
    super(ORG_UNIT_USER_GROUP_ENTITIES, payload.orgUnitUserGroup.uid);
  }
}

export class DeleteOrgUnitUserGroupMemberFail extends EntityFailAction {
  readonly type = DELETE_ORG_UNIT_USER_GROUP_MEMBER_FAIL;
  constructor(public payload: { orgUnitUserGroupUid: string; error: any }) {
    super(
      ORG_UNIT_USER_GROUP_ENTITIES,
      payload.orgUnitUserGroupUid,
      payload.error
    );
  }
}

export class DeleteOrgUnitUserGroupMemberSuccess extends EntitySuccessAction {
  readonly type = DELETE_ORG_UNIT_USER_GROUP_MEMBER_SUCCESS;
  constructor(public payload: OrgUnitUserGroup) {
    super(ORG_UNIT_USER_GROUP_ENTITIES, payload.uid, payload);
  }
}

export class DeleteOrgUnitUserGroupMembers extends EntityLoadAction {
  readonly type = DELETE_ORG_UNIT_USER_GROUP_MEMBERS;
  constructor(
    public payload: {
      userId: string;
      orgUnitUserGroupUid: string;
      orgUnitUserGroup: OrgUnitUserGroup;
    }
  ) {
    super(ORG_UNIT_USER_GROUP_ENTITIES, payload.orgUnitUserGroup.uid);
  }
}

export class DeleteOrgUnitUserGroupMembersFail extends EntityFailAction {
  readonly type = DELETE_ORG_UNIT_USER_GROUP_MEMBERS_FAIL;
  constructor(public payload: { orgUnitUserGroupUid: string; error: any }) {
    super(
      ORG_UNIT_USER_GROUP_ENTITIES,
      payload.orgUnitUserGroupUid,
      payload.error
    );
  }
}

export class DeleteOrgUnitUserGroupMembersSuccess extends EntitySuccessAction {
  readonly type = DELETE_ORG_UNIT_USER_GROUP_MEMBERS_SUCCESS;
  constructor(public payload: OrgUnitUserGroup) {
    super(ORG_UNIT_USER_GROUP_ENTITIES, payload.uid, payload);
  }
}

export class DeleteOrgUnitUserGroupOrderApprovalPermission extends EntityLoadAction {
  readonly type = DELETE_ORG_UNIT_USER_GROUP_ORDER_APPROVAL_PERMISSION;
  constructor(
    public payload: {
      userId: string;
      orgUnitUserGroupUid: string;
      orgUnitUserGroup: OrgUnitUserGroup;
    }
  ) {
    super(ORG_UNIT_USER_GROUP_ENTITIES, payload.orgUnitUserGroup.uid);
  }
}

export class DeleteOrgUnitUserGroupOrderApprovalPermissionFail extends EntityFailAction {
  readonly type = DELETE_ORG_UNIT_USER_GROUP_ORDER_APPROVAL_PERMISSION_FAIL;
  constructor(public payload: { orgUnitUserGroupUid: string; error: any }) {
    super(
      ORG_UNIT_USER_GROUP_ENTITIES,
      payload.orgUnitUserGroupUid,
      payload.error
    );
  }
}

export class DeleteOrgUnitUserGroupOrderApprovalPermissionSuccess extends EntitySuccessAction {
  readonly type = DELETE_ORG_UNIT_USER_GROUP_ORDER_APPROVAL_PERMISSION_SUCCESS;
  constructor(public payload: OrgUnitUserGroup) {
    super(ORG_UNIT_USER_GROUP_ENTITIES, payload.uid, payload);
  }
}

export type OrgUnitUserGroupAction =
  | LoadOrgUnitUserGroup
  | LoadOrgUnitUserGroupFail
  | LoadOrgUnitUserGroupSuccess
  | LoadOrgUnitUserGroups
  | LoadOrgUnitUserGroupsFail
  | LoadOrgUnitUserGroupsSuccess
  | LoadOrgUnitUserGroupAvailableOrderApprovalPermissions
  | LoadOrgUnitUserGroupAvailableOrderApprovalPermissionsFail
  | LoadOrgUnitUserGroupAvailableOrderApprovalPermissionsSuccess
  | LoadOrgUnitUserGroupAvailableOrgCustomers
  | LoadOrgUnitUserGroupAvailableOrgCustomersFail
  | LoadOrgUnitUserGroupAvailableOrgCustomersSuccess
  | CreateOrgUnitUserGroup
  | CreateOrgUnitUserGroupFail
  | CreateOrgUnitUserGroupSuccess
  | CreateOrgUnitUserGroupMember
  | CreateOrgUnitUserGroupMemberFail
  | CreateOrgUnitUserGroupMemberSuccess
  | CreateOrgUnitUserGroupOrderApprovalPermissions
  | CreateOrgUnitUserGroupOrderApprovalPermissionsFail
  | CreateOrgUnitUserGroupOrderApprovalPermissionsSuccess
  | UpdateOrgUnitUserGroup
  | UpdateOrgUnitUserGroupFail
  | UpdateOrgUnitUserGroupSuccess
  | DeleteOrgUnitUserGroup
  | DeleteOrgUnitUserGroupFail
  | DeleteOrgUnitUserGroupSuccess
  | DeleteOrgUnitUserGroupMember
  | DeleteOrgUnitUserGroupMemberFail
  | DeleteOrgUnitUserGroupMemberSuccess
  | DeleteOrgUnitUserGroupMembers
  | DeleteOrgUnitUserGroupMembersFail
  | DeleteOrgUnitUserGroupMembersSuccess
  | DeleteOrgUnitUserGroupOrderApprovalPermission
  | DeleteOrgUnitUserGroupOrderApprovalPermissionFail
  | DeleteOrgUnitUserGroupOrderApprovalPermissionSuccess;
