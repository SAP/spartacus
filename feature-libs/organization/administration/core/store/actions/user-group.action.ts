import { ListModel, SearchConfig, StateUtils } from '@spartacus/core';
import { UserGroup } from '../../model/user-group.model';
import {
  B2B_USER_ENTITIES,
  PERMISSION_ENTITIES,
  USER_GROUP_AVAILABLE_CUSTOMERS,
  USER_GROUP_ENTITIES,
  USER_GROUP_LIST,
  USER_GROUP_PERMISSIONS,
} from '../organization-state';

export const LOAD_USER_GROUP = '[UserGroup] Load UserGroup Data';
export const LOAD_USER_GROUP_FAIL = '[UserGroup] Load UserGroup Data Fail';
export const LOAD_USER_GROUP_SUCCESS =
  '[UserGroup] Load UserGroup Data Success';

export const LOAD_USER_GROUPS = '[UserGroup] Load UserGroups';
export const LOAD_USER_GROUPS_FAIL = '[UserGroup] Load UserGroups Fail';
export const LOAD_USER_GROUPS_SUCCESS = '[UserGroup] Load UserGroups Success';

export const LOAD_USER_GROUP_PERMISSIONS = '[UserGroup] Load Permissions Data';
export const LOAD_USER_GROUP_PERMISSIONS_FAIL =
  '[UserGroup] Load Permissions Data Fail';
export const LOAD_USER_GROUP_PERMISSIONS_SUCCESS =
  '[UserGroup] Load Permissions Data Success';

export const LOAD_USER_GROUP_AVAILABLE_CUSTOMERS =
  '[UserGroup] Load Customers Data';
export const LOAD_USER_GROUP_AVAILABLE_CUSTOMERS_FAIL =
  '[UserGroup] Load Customers Data Fail';
export const LOAD_USER_GROUP_AVAILABLE_CUSTOMERS_SUCCESS =
  '[UserGroup] Load Customers Data Success';

export const CREATE_USER_GROUP = '[UserGroup] Create UserGroup';
export const CREATE_USER_GROUP_FAIL = '[UserGroup] Create UserGroup Fail';
export const CREATE_USER_GROUP_SUCCESS = '[UserGroup] Create UserGroup Success';

export const USER_GROUP_ASSIGN_MEMBER = '[UserGroup] Assign Member';
export const USER_GROUP_ASSIGN_MEMBER_FAIL = '[UserGroup] Assign Member Fail';
export const USER_GROUP_ASSIGN_MEMBER_SUCCESS =
  '[UserGroup] Assign Member Success';

export const USER_GROUP_ASSIGN_PERMISSION = '[UserGroup] Assign Permissions';
export const USER_GROUP_ASSIGN_PERMISSION_FAIL =
  '[UserGroup] Assign Permissions Fail';
export const USER_GROUP_ASSIGN_PERMISSION_SUCCESS =
  '[UserGroup] Assign Permissions Success';

export const UPDATE_USER_GROUP = '[UserGroup] Update UserGroup';
export const UPDATE_USER_GROUP_FAIL = '[UserGroup] Update UserGroup Fail';
export const UPDATE_USER_GROUP_SUCCESS = '[UserGroup] Update UserGroup Success';

export const DELETE_USER_GROUP = '[UserGroup] Delete UserGroup';
export const DELETE_USER_GROUP_FAIL = '[UserGroup] Delete UserGroup Fail';
export const DELETE_USER_GROUP_SUCCESS = '[UserGroup] Delete UserGroup Success';

export const USER_GROUP_UNASSIGN_ALL_MEMBERS = '[UserGroup] Unassign Members';
export const USER_GROUP_UNASSIGN_ALL_MEMBERS_FAIL =
  '[UserGroup] Unassign Members Fail';
export const USER_GROUP_UNASSIGN_ALL_MEMBERS_SUCCESS =
  '[UserGroup] Unassign Members Success';

export const USER_GROUP_UNASSIGN_MEMBER = '[UserGroup] Unassign Member';
export const USER_GROUP_UNASSIGN_MEMBER_FAIL =
  '[UserGroup] Unassign Member Fail';
export const USER_GROUP_UNASSIGN_MEMBER_SUCCESS =
  '[UserGroup] Unassign Member Success';

export const USER_GROUP_UNASSIGN_PERMISSION = '[UserGroup] Unassign Permission';
export const USER_GROUP_UNASSIGN_PERMISSION_FAIL =
  '[UserGroup] Unassign Permission Fail';
export const USER_GROUP_UNASSIGN_PERMISSION_SUCCESS =
  '[UserGroup] Unassign Permission Success';

export class LoadUserGroup extends StateUtils.EntityLoadAction {
  readonly type = LOAD_USER_GROUP;
  constructor(public payload: { userId: string; userGroupId: string }) {
    super(USER_GROUP_ENTITIES, payload.userGroupId);
  }
}

export class LoadUserGroupFail extends StateUtils.EntityFailAction {
  readonly type = LOAD_USER_GROUP_FAIL;
  constructor(public payload: { userGroupId: string; error: any }) {
    super(USER_GROUP_ENTITIES, payload.userGroupId, payload.error);
  }
}

export class LoadUserGroupSuccess extends StateUtils.EntitySuccessAction {
  readonly type = LOAD_USER_GROUP_SUCCESS;
  constructor(public payload: UserGroup | UserGroup[]) {
    super(
      USER_GROUP_ENTITIES,
      Array.isArray(payload)
        ? payload.map((userGroup) => userGroup?.uid)
        : payload?.uid
    );
  }
}

export class LoadUserGroups extends StateUtils.EntityLoadAction {
  readonly type = LOAD_USER_GROUPS;
  constructor(
    public payload: {
      userId: string;
      params: SearchConfig;
    }
  ) {
    super(USER_GROUP_LIST, StateUtils.serializeSearchConfig(payload.params));
  }
}

export class LoadUserGroupsFail extends StateUtils.EntityFailAction {
  readonly type = LOAD_USER_GROUPS_FAIL;
  constructor(public payload: { params: SearchConfig; error: any }) {
    super(
      USER_GROUP_LIST,
      StateUtils.serializeSearchConfig(payload.params),
      payload.error
    );
  }
}

export class LoadUserGroupsSuccess extends StateUtils.EntitySuccessAction {
  readonly type = LOAD_USER_GROUPS_SUCCESS;
  constructor(
    public payload: {
      page: ListModel;
      params: SearchConfig;
    }
  ) {
    super(USER_GROUP_LIST, StateUtils.serializeSearchConfig(payload.params));
  }
}

export class LoadPermissions extends StateUtils.EntityLoadAction {
  readonly type = LOAD_USER_GROUP_PERMISSIONS;
  constructor(
    public payload: {
      userId: string;
      userGroupId: string;
      params: SearchConfig;
    }
  ) {
    super(
      USER_GROUP_PERMISSIONS,
      StateUtils.serializeSearchConfig(payload.params, payload.userGroupId)
    );
  }
}

export class LoadPermissionsFail extends StateUtils.EntityFailAction {
  readonly type = LOAD_USER_GROUP_PERMISSIONS_FAIL;
  constructor(
    public payload: {
      userGroupId: string;
      params: SearchConfig;
      error: any;
    }
  ) {
    super(
      USER_GROUP_PERMISSIONS,
      StateUtils.serializeSearchConfig(payload.params, payload.userGroupId),
      payload.error
    );
  }
}

export class LoadPermissionsSuccess extends StateUtils.EntitySuccessAction {
  readonly type = LOAD_USER_GROUP_PERMISSIONS_SUCCESS;
  constructor(
    public payload: {
      userGroupId: string;
      page: ListModel;
      params: SearchConfig;
    }
  ) {
    super(
      USER_GROUP_PERMISSIONS,
      StateUtils.serializeSearchConfig(payload.params, payload.userGroupId)
    );
  }
}

export class LoadAvailableOrgCustomers extends StateUtils.EntityLoadAction {
  readonly type = LOAD_USER_GROUP_AVAILABLE_CUSTOMERS;
  constructor(
    public payload: {
      userId: string;
      userGroupId: string;
      params: SearchConfig;
    }
  ) {
    super(
      USER_GROUP_AVAILABLE_CUSTOMERS,
      StateUtils.serializeSearchConfig(payload.params, payload.userGroupId)
    );
  }
}

export class LoadAvailableOrgCustomersFail extends StateUtils.EntityFailAction {
  readonly type = LOAD_USER_GROUP_AVAILABLE_CUSTOMERS_FAIL;
  constructor(
    public payload: {
      userGroupId: string;
      params: SearchConfig;
      error: any;
    }
  ) {
    super(
      USER_GROUP_AVAILABLE_CUSTOMERS,
      StateUtils.serializeSearchConfig(payload.params, payload.userGroupId),
      payload.error
    );
  }
}

export class LoadAvailableOrgCustomersSuccess extends StateUtils.EntitySuccessAction {
  readonly type = LOAD_USER_GROUP_AVAILABLE_CUSTOMERS_SUCCESS;
  constructor(
    public payload: {
      userGroupId: string;
      page: ListModel;
      params: SearchConfig;
    }
  ) {
    super(
      USER_GROUP_AVAILABLE_CUSTOMERS,
      StateUtils.serializeSearchConfig(payload.params, payload.userGroupId)
    );
  }
}

export class CreateUserGroup extends StateUtils.EntityLoadAction {
  readonly type = CREATE_USER_GROUP;
  constructor(public payload: { userId: string; userGroup: UserGroup }) {
    super(USER_GROUP_ENTITIES, payload.userGroup.uid);
  }
}

export class CreateUserGroupFail extends StateUtils.EntityFailAction {
  readonly type = CREATE_USER_GROUP_FAIL;
  constructor(public payload: { userGroupId: string; error: any }) {
    super(USER_GROUP_ENTITIES, payload.userGroupId, payload.error);
  }
}

export class CreateUserGroupSuccess extends StateUtils.EntitySuccessAction {
  readonly type = CREATE_USER_GROUP_SUCCESS;
  constructor(public payload: UserGroup) {
    super(USER_GROUP_ENTITIES, payload.uid, payload);
  }
}

export class AssignMember extends StateUtils.EntityLoadAction {
  readonly type = USER_GROUP_ASSIGN_MEMBER;
  constructor(
    public payload: {
      userId: string;
      userGroupId: string;
      customerId: string;
    }
  ) {
    super(B2B_USER_ENTITIES, payload.customerId);
  }
}

export class AssignMemberFail extends StateUtils.EntityFailAction {
  readonly type = USER_GROUP_ASSIGN_MEMBER_FAIL;
  constructor(
    public payload: {
      userGroupId: string;
      customerId: string;
      error: any;
    }
  ) {
    super(B2B_USER_ENTITIES, payload.customerId, payload.error);
  }
}

export class AssignMemberSuccess extends StateUtils.EntitySuccessAction {
  readonly type = USER_GROUP_ASSIGN_MEMBER_SUCCESS;
  constructor(public payload: { customerId: string; selected: boolean }) {
    super(B2B_USER_ENTITIES, payload.customerId, payload);
  }
}

export class AssignPermission extends StateUtils.EntityLoadAction {
  readonly type = USER_GROUP_ASSIGN_PERMISSION;
  constructor(
    public payload: {
      userId: string;
      userGroupId: string;
      permissionUid: string;
    }
  ) {
    super(PERMISSION_ENTITIES, payload.permissionUid);
  }
}

export class AssignPermissionFail extends StateUtils.EntityFailAction {
  readonly type = USER_GROUP_ASSIGN_PERMISSION_FAIL;
  constructor(
    public payload: {
      userGroupId: string;
      permissionUid: string;
      error: any;
    }
  ) {
    super(PERMISSION_ENTITIES, payload.permissionUid, payload.error);
  }
}

export class AssignPermissionSuccess extends StateUtils.EntitySuccessAction {
  readonly type = USER_GROUP_ASSIGN_PERMISSION_SUCCESS;
  constructor(public payload: { permissionUid: string; selected: boolean }) {
    super(PERMISSION_ENTITIES, payload.permissionUid, payload);
  }
}

export class UpdateUserGroup extends StateUtils.EntityLoadAction {
  readonly type = UPDATE_USER_GROUP;
  constructor(
    public payload: {
      userId: string;
      userGroupId: string;
      userGroup: UserGroup;
    }
  ) {
    super(USER_GROUP_ENTITIES, payload.userGroup.uid);
  }
}

export class UpdateUserGroupFail extends StateUtils.EntityFailAction {
  readonly type = UPDATE_USER_GROUP_FAIL;
  constructor(public payload: { userGroupId: string; error: any }) {
    super(USER_GROUP_ENTITIES, payload.userGroupId, payload.error);
  }
}

export class UpdateUserGroupSuccess extends StateUtils.EntitySuccessAction {
  readonly type = UPDATE_USER_GROUP_SUCCESS;
  constructor(public payload: UserGroup) {
    super(USER_GROUP_ENTITIES, payload.uid, payload);
  }
}

export class DeleteUserGroup extends StateUtils.EntityLoadAction {
  readonly type = DELETE_USER_GROUP;
  constructor(
    public payload: {
      userId: string;
      userGroupId: string;
    }
  ) {
    super(USER_GROUP_ENTITIES, payload.userGroupId);
  }
}

export class DeleteUserGroupFail extends StateUtils.EntityFailAction {
  readonly type = DELETE_USER_GROUP_FAIL;
  constructor(public payload: { userGroupId: string; error: any }) {
    super(USER_GROUP_ENTITIES, payload.userGroupId, payload.error);
  }
}

export class DeleteUserGroupSuccess extends StateUtils.EntitySuccessAction {
  readonly type = DELETE_USER_GROUP_SUCCESS;
  constructor(public payload: UserGroup) {
    super(USER_GROUP_ENTITIES, payload.uid, payload);
  }
}

export class UnassignMember extends StateUtils.EntityLoadAction {
  readonly type = USER_GROUP_UNASSIGN_MEMBER;
  constructor(
    public payload: {
      userId: string;
      userGroupId: string;
      customerId: string;
    }
  ) {
    super(B2B_USER_ENTITIES, payload.customerId);
  }
}

export class UnassignMemberFail extends StateUtils.EntityFailAction {
  readonly type = USER_GROUP_UNASSIGN_MEMBER_FAIL;
  constructor(
    public payload: {
      userGroupId: string;
      customerId: string;
      error: any;
    }
  ) {
    super(B2B_USER_ENTITIES, payload.customerId, payload.error);
  }
}

export class UnassignMemberSuccess extends StateUtils.EntitySuccessAction {
  readonly type = USER_GROUP_UNASSIGN_MEMBER_SUCCESS;
  constructor(public payload: { customerId: string; selected: boolean }) {
    super(B2B_USER_ENTITIES, payload.customerId, payload);
  }
}

export class UnassignAllMembers extends StateUtils.EntityLoadAction {
  readonly type = USER_GROUP_UNASSIGN_ALL_MEMBERS;
  constructor(
    public payload: {
      userId: string;
      userGroupId: string;
    }
  ) {
    super(USER_GROUP_ENTITIES, payload.userGroupId);
  }
}

export class UnassignAllMembersFail extends StateUtils.EntityFailAction {
  readonly type = USER_GROUP_UNASSIGN_ALL_MEMBERS_FAIL;
  constructor(public payload: { userGroupId: string; error: any }) {
    super(USER_GROUP_ENTITIES, payload.userGroupId, payload.error);
  }
}

export class UnassignAllMembersSuccess extends StateUtils.EntitySuccessAction {
  readonly type = USER_GROUP_UNASSIGN_ALL_MEMBERS_SUCCESS;
  constructor(public payload: UserGroup) {
    super(USER_GROUP_ENTITIES, payload.uid, payload);
  }
}

export class UnassignPermission extends StateUtils.EntityLoadAction {
  readonly type = USER_GROUP_UNASSIGN_PERMISSION;
  constructor(
    public payload: {
      userId: string;
      userGroupId: string;
      permissionUid: string;
    }
  ) {
    super(PERMISSION_ENTITIES, payload.permissionUid);
  }
}

export class UnassignPermissionFail extends StateUtils.EntityFailAction {
  readonly type = USER_GROUP_UNASSIGN_PERMISSION_FAIL;
  constructor(
    public payload: {
      userGroupId: string;
      permissionUid: string;
      error: any;
    }
  ) {
    super(PERMISSION_ENTITIES, payload.permissionUid, payload.error);
  }
}

export class UnassignPermissionSuccess extends StateUtils.EntitySuccessAction {
  readonly type = USER_GROUP_UNASSIGN_PERMISSION_SUCCESS;
  constructor(public payload: { permissionUid: string; selected: boolean }) {
    super(PERMISSION_ENTITIES, payload.permissionUid, payload);
  }
}

export type UserGroupAction =
  | LoadUserGroup
  | LoadUserGroupFail
  | LoadUserGroupSuccess
  | LoadUserGroups
  | LoadUserGroupsFail
  | LoadUserGroupsSuccess
  | LoadPermissions
  | LoadPermissionsFail
  | LoadPermissionsSuccess
  | LoadAvailableOrgCustomers
  | LoadAvailableOrgCustomersFail
  | LoadAvailableOrgCustomersSuccess
  | CreateUserGroup
  | CreateUserGroupFail
  | CreateUserGroupSuccess
  | AssignMember
  | AssignMemberFail
  | AssignMemberSuccess
  | AssignPermission
  | AssignPermissionFail
  | AssignPermissionSuccess
  | UpdateUserGroup
  | UpdateUserGroupFail
  | UpdateUserGroupSuccess
  | DeleteUserGroup
  | DeleteUserGroupFail
  | DeleteUserGroupSuccess
  | UnassignMember
  | UnassignMemberFail
  | UnassignMemberSuccess
  | UnassignAllMembers
  | UnassignAllMembersFail
  | UnassignAllMembersSuccess
  | UnassignPermission
  | UnassignPermissionFail
  | UnassignPermissionSuccess;
