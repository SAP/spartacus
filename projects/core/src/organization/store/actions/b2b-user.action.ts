import {
  EntityFailAction,
  EntityLoadAction,
  EntitySuccessAction,
} from '../../../state/utils/entity-loader/entity-loader.action';
import { B2BSearchConfig } from '../../model/search-config';
import { serializeB2BSearchConfig } from '../../utils/serializer';
import { B2B_USER_ENTITIES, USER_LIST, B2B_USER_APPROVERS, B2B_USER_PERMISSIONS, B2B_USER_USER_GROUPS } from '../organization-state';
import { ListModel } from '../../../model/misc.model';
import { B2BUser } from '../../../model/org-unit.model';

export const LOAD_B2B_USER = '[B2BUser] Load B2BUser Data';
export const LOAD_B2B_USER_FAIL = '[B2BUser] Load B2BUser Data Fail';
export const LOAD_B2B_USER_SUCCESS = '[B2BUser] Load B2BUser Data Success';

export const LOAD_B2B_USERS = '[B2BUser] Load B2BUsers';
export const LOAD_B2B_USERS_FAIL = '[B2BUser] Load B2BUsers Fail';
export const LOAD_B2B_USERS_SUCCESS = '[B2BUser] Load B2BUsers Success';

export const LOAD_B2B_USER_APPROVERS = '[B2BUser] Load B2BUser Approvers';
export const LOAD_B2B_USER_APPROVERS_FAIL = '[B2BUser] Load B2BUser Approvers Fail';
export const LOAD_B2B_USER_APPROVERS_SUCCESS = '[B2BUser] Load B2BUser Approvers Success';

export const CREATE_B2B_USER_APPROVER = '[B2BUser] Create B2BUser Approver';
export const CREATE_B2B_USER_APPROVER_FAIL = '[B2BUser] Create B2BUser Approver Fail';
export const CREATE_B2B_USER_APPROVER_SUCCESS = '[B2BUser] Create B2BUser Approver Success';

export const DELETE_B2B_USER_APPROVER = '[B2BUser] Delete B2BUser Approver';
export const DELETE_B2B_USER_APPROVER_FAIL = '[B2BUser] Delete B2BUser Approver Fail';
export const DELETE_B2B_USER_APPROVER_SUCCESS = '[B2BUser] Delete B2BUser Approver Success';

export const LOAD_B2B_USER_PERMISSIONS = '[B2BUser] Load B2BUser Permissions';
export const LOAD_B2B_USER_PERMISSIONS_FAIL = '[B2BUser] Load B2BUser Permissions Fail';
export const LOAD_B2B_USER_PERMISSIONS_SUCCESS = '[B2BUser] Load B2BUser Permissions Success';

export const CREATE_B2B_USER_PERMISSION = '[B2BUser] Create B2BUser Permission';
export const CREATE_B2B_USER_PERMISSION_FAIL = '[B2BUser] Create B2BUser Permission Fail';
export const CREATE_B2B_USER_PERMISSION_SUCCESS = '[B2BUser] Create B2BUser Permission Success';

export const DELETE_B2B_USER_PERMISSION = '[B2BUser] Delete B2BUser Permission';
export const DELETE_B2B_USER_PERMISSION_FAIL = '[B2BUser] Delete B2BUser Permission Fail';
export const DELETE_B2B_USER_PERMISSION_SUCCESS = '[B2BUser] Delete B2BUser Permission Success';

export const LOAD_B2B_USER_USER_GROUPS = '[B2BUser] Load B2BUser User Groups';
export const LOAD_B2B_USER_USER_GROUPS_FAIL = '[B2BUser] Load B2BUser User Groups Fail';
export const LOAD_B2B_USER_USER_GROUPS_SUCCESS = '[B2BUser] Load B2BUser User Groups Success';

export const CREATE_B2B_USER_USER_GROUP = '[B2BUser] Create B2BUser User Group';
export const CREATE_B2B_USER_USER_GROUP_FAIL = '[B2BUser] Create B2BUser User Group Fail';
export const CREATE_B2B_USER_USER_GROUP_SUCCESS = '[B2BUser] Create B2BUser User Group Success';

export const DELETE_B2B_USER_USER_GROUP = '[B2BUser] Delete B2BUser User Group';
export const DELETE_B2B_USER_USER_GROUP_FAIL = '[B2BUser] Delete B2BUser User Group Fail';
export const DELETE_B2B_USER_USER_GROUP_SUCCESS = '[B2BUser] Delete B2BUser User Group Success';

export class LoadB2BUser extends EntityLoadAction {
  readonly type = LOAD_B2B_USER;
  constructor(public payload: { userId: string; orgCustomerId: string }) {
    super(B2B_USER_ENTITIES, payload.orgCustomerId);
  }
}

export class LoadB2BUserFail extends EntityFailAction {
  readonly type = LOAD_B2B_USER_FAIL;
  constructor(public payload: { orgCustomerId: string; error: any }) {
    super(B2B_USER_ENTITIES, payload.orgCustomerId, payload.error);
  }
}

export class LoadB2BUserSuccess extends EntitySuccessAction {
  readonly type = LOAD_B2B_USER_SUCCESS;
  constructor(public payload: B2BUser[]) {
    super(
      B2B_USER_ENTITIES,
      payload.map(orgUnitCustomer => orgUnitCustomer.uid)
    );
  }
}

export class LoadB2BUsers extends EntityLoadAction {
  readonly type = LOAD_B2B_USERS;
  constructor(
    public payload: {
      userId: string;
      params: B2BSearchConfig;
    }
  ) {
    super(USER_LIST, serializeB2BSearchConfig(payload.params));
  }
}

export class LoadB2BUsersFail extends EntityFailAction {
  readonly type = LOAD_B2B_USERS_FAIL;
  constructor(public payload: { params: B2BSearchConfig; error: any }) {
    super(USER_LIST, serializeB2BSearchConfig(payload.params), payload.error);
  }
}

export class LoadB2BUsersSuccess extends EntitySuccessAction {
  readonly type = LOAD_B2B_USERS_SUCCESS;
  constructor(
    public payload: {
      page: ListModel;
      params: B2BSearchConfig;
    }
  ) {
    super(USER_LIST, serializeB2BSearchConfig(payload.params));
  }
}

export class LoadB2BUserApprovers extends EntityLoadAction {
  readonly type = LOAD_B2B_USER_APPROVERS;
  constructor(
    public payload: {
      userId: string;
      orgCustomerId: string;
      params: B2BSearchConfig;
    }
  ) {
    super(
      B2B_USER_APPROVERS,
      serializeB2BSearchConfig(payload.params, payload.orgCustomerId)
    );
  }
}

export class LoadB2BUserApproversFail extends EntityFailAction {
  readonly type = LOAD_B2B_USER_APPROVERS_FAIL;
  constructor(
    public payload: {
      orgCustomerId: string;
      params: B2BSearchConfig;
      error: any;
    }
  ) {
    super(
      B2B_USER_APPROVERS,
      serializeB2BSearchConfig(payload.params, payload.orgCustomerId),
      payload.error
    );
  }
}

export class LoadB2BUserApproversSuccess extends EntitySuccessAction {
  readonly type = LOAD_B2B_USER_APPROVERS_SUCCESS;
  constructor(
    public payload: {
      orgCustomerId: string;
      page: ListModel;
      params: B2BSearchConfig;
    }
  ) {
    super(
      B2B_USER_APPROVERS,
      serializeB2BSearchConfig(payload.params, payload.orgCustomerId)
    );
  }
}

export class CreateB2BUserApprover extends EntityLoadAction {
  readonly type = CREATE_B2B_USER_APPROVER;
  constructor(
    public payload: {
      userId: string;
      orgCustomerId: string;
      approverId: string;
    }
  ) {
    super(
      B2B_USER_APPROVERS,
      payload.approverId
    );
  }
}

export class CreateB2BUserApproverFail extends EntityFailAction {
  readonly type = CREATE_B2B_USER_APPROVER_FAIL;
  constructor(
    public payload: {
      orgCustomerId: string;
      approverId: string;
      error: any;
    }
  ) {
    super(
      B2B_USER_APPROVERS,
      payload.approverId,
    );
  }
}

export class CreateB2BUserApproverSuccess extends EntitySuccessAction {
  readonly type = CREATE_B2B_USER_APPROVER_SUCCESS;
  constructor(
    public payload: {
      approverId: string;
      selected: boolean;
    }
  ) {
    super(
      B2B_USER_APPROVERS,
      payload.approverId,
      payload
    );
  }
}

export class DeleteB2BUserApprover extends EntityLoadAction {
  readonly type = DELETE_B2B_USER_APPROVER;
  constructor(
    public payload: {
      userId: string;
      orgCustomerId: string;
      approverId: string;
    }
  ) {
    super(
      B2B_USER_APPROVERS,
      payload.approverId
    );
  }
}

export class DeleteB2BUserApproverFail extends EntityFailAction {
  readonly type = DELETE_B2B_USER_APPROVER_FAIL;
  constructor(
    public payload: {
      orgCustomerId: string;
      approverId: string;
      error: any;
    }
  ) {
    super(
      B2B_USER_APPROVERS,
      payload.approverId
    );
  }
}

export class DeleteB2BUserApproverSuccess extends EntitySuccessAction {
  readonly type = DELETE_B2B_USER_APPROVER_SUCCESS;
  constructor(
    public payload: {
      userId: string;
      orgCustomerId: string;
      approverId: string;
    }
  ) {
    super(
      B2B_USER_APPROVERS,
      payload.approverId
    );
  }
}

export class LoadB2BUserPermissions extends EntityLoadAction {
  readonly type = LOAD_B2B_USER_PERMISSIONS;
  constructor(
    public payload: {
      userId: string;
      orgCustomerId: string;
      params: B2BSearchConfig;
    }
  ) {
    super(
      B2B_USER_PERMISSIONS,
      serializeB2BSearchConfig(payload.params, payload.orgCustomerId)
    );
  }
}

export class LoadB2BUserPermissionsFail extends EntityFailAction {
  readonly type = LOAD_B2B_USER_PERMISSIONS_FAIL;
  constructor(
    public payload: {
      orgCustomerId: string;
      params: B2BSearchConfig;
      error: any;
    }
  ) {
    super(
      B2B_USER_PERMISSIONS,
      serializeB2BSearchConfig(payload.params, payload.orgCustomerId),
      payload.error
    );
  }
}

export class LoadB2BUserPermissionsSuccess extends EntitySuccessAction {
  readonly type = LOAD_B2B_USER_PERMISSIONS_SUCCESS;
  constructor(
    public payload: {
      orgCustomerId: string;
      page: ListModel;
      params: B2BSearchConfig;
    }
  ) {
    super(
      B2B_USER_PERMISSIONS,
      serializeB2BSearchConfig(payload.params, payload.orgCustomerId)
    );
  }
}

export class CreateB2BUserPermission extends EntityLoadAction {
  readonly type = CREATE_B2B_USER_PERMISSION;
  constructor(
    public payload: {
      userId: string;
      orgCustomerId: string;
      permissionId: string;
    }
  ) {
    super(
      B2B_USER_PERMISSIONS,
      payload.permissionId
    );
  }
}

export class CreateB2BUserPermissionFail extends EntityFailAction {
  readonly type = CREATE_B2B_USER_PERMISSION_FAIL;
  constructor(
    public payload: {
      userId: string;
      orgCustomerId: string;
      permissionId: string;
      error: any;
    }
  ) {
    super(
      B2B_USER_PERMISSIONS,
      payload.permissionId
    );
  }
}

export class CreateB2BUserPermissionSuccess extends EntitySuccessAction {
  readonly type = CREATE_B2B_USER_PERMISSION_SUCCESS;
  constructor(
    public payload: {
      userId: string;
      orgCustomerId: string;
      permissionId: string;
    }
  ) {
    super(
      B2B_USER_PERMISSIONS,
      payload.permissionId
    );
  }
}

export class DeleteB2BUserPermission extends EntityLoadAction {
  readonly type = DELETE_B2B_USER_PERMISSION;
  constructor(
    public payload: {
      userId: string;
      orgCustomerId: string;
      permissionId: string;
    }
  ) {
    super(
      B2B_USER_PERMISSIONS,
      payload.permissionId
    );
  }
}

export class DeleteB2BUserPermissionFail extends EntityFailAction {
  readonly type = DELETE_B2B_USER_PERMISSION_FAIL;
  constructor(
    public payload: {
      userId: string;
      orgCustomerId: string;
      permissionId: string;
      error: any;
    }
  ) {
    super(
      B2B_USER_PERMISSIONS,
      payload.permissionId
    );
  }
}

export class DeleteB2BUserPermissionSuccess extends EntitySuccessAction {
  readonly type = DELETE_B2B_USER_PERMISSION_SUCCESS;
  constructor(
    public payload: {
      userId: string;
      orgCustomerId: string;
      permissionId: string;
    }
  ) {
    super(
      B2B_USER_PERMISSIONS,
      payload.permissionId
    );
  }
}

export class LoadB2BUserUserGroups extends EntityLoadAction {
  readonly type = LOAD_B2B_USER_USER_GROUPS;
  constructor(
    public payload: {
      userId: string;
      orgCustomerId: string;
      params: B2BSearchConfig;
    }
  ) {
    super(
      B2B_USER_USER_GROUPS,
      serializeB2BSearchConfig(payload.params, payload.orgCustomerId)
    );
  }
}

export class LoadB2BUserUserGroupsFail extends EntityFailAction {
  readonly type = LOAD_B2B_USER_USER_GROUPS_FAIL;
  constructor(
    public payload: {
      orgCustomerId: string;
      params: B2BSearchConfig;
      error: any;
    }
  ) {
    super(
      B2B_USER_USER_GROUPS,
      serializeB2BSearchConfig(payload.params, payload.orgCustomerId),
      payload.error
    );
  }
}

export class LoadB2BUserUserGroupsSuccess extends EntitySuccessAction {
  readonly type = LOAD_B2B_USER_USER_GROUPS_SUCCESS;
  constructor(
    public payload: {
      orgCustomerId: string;
      page: ListModel;
      params: B2BSearchConfig;
    }
  ) {
    super(
      B2B_USER_USER_GROUPS,
      serializeB2BSearchConfig(payload.params, payload.orgCustomerId)
    );
  }
}

export class CreateB2BUserUserGroup extends EntityLoadAction {
  readonly type = CREATE_B2B_USER_USER_GROUP;
  constructor(
    public payload: {
      userId: string;
      orgCustomerId: string;
      userGroupId: string;
    }
  ) {
    super(
      B2B_USER_USER_GROUPS,
      payload.userGroupId
    );
  }
}

export class CreateB2BUserUserGroupFail extends EntityFailAction {
  readonly type = CREATE_B2B_USER_USER_GROUP_FAIL;
  constructor(
    public payload: {
      userId: string;
      orgCustomerId: string;
      userGroupId: string;
      error: any;
    }
  ) {
    super(
      B2B_USER_USER_GROUPS,
      payload.userGroupId
    );
  }
}

export class CreateB2BUserUserGroupSuccess extends EntitySuccessAction {
  readonly type = CREATE_B2B_USER_USER_GROUP_SUCCESS;
  constructor(
    public payload: {
      userId: string;
      orgCustomerId: string;
      userGroupId: string;
    }
  ) {
    super(
      B2B_USER_USER_GROUPS,
      payload.userGroupId
    );
  }
}

export class DeleteB2BUserUserGroup extends EntityLoadAction {
  readonly type = DELETE_B2B_USER_USER_GROUP;
  constructor(
    public payload: {
      userId: string;
      orgCustomerId: string;
      userGroupId: string;
    }
  ) {
    super(
      B2B_USER_USER_GROUPS,
      payload.userGroupId
    );
  }
}

export class DeleteB2BUserUserGroupFail extends EntityFailAction {
  readonly type = DELETE_B2B_USER_USER_GROUP_FAIL;
  constructor(
    public payload: {
      userId: string;
      orgCustomerId: string;
      userGroupId: string;
      error: any;
    }
  ) {
    super(
      B2B_USER_USER_GROUPS,
      payload.userGroupId
    );
  }
}

export class DeleteB2BUserUserGroupSuccess extends EntitySuccessAction {
  readonly type = DELETE_B2B_USER_USER_GROUP_SUCCESS;
  constructor(
    public payload: {
      userId: string;
      orgCustomerId: string;
      userGroupId: string;
    }
  ) {
    super(
      B2B_USER_USER_GROUPS,
      payload.userGroupId
    );
  }
}

export type B2BUserAction =
  | LoadB2BUser
  | LoadB2BUserFail
  | LoadB2BUserSuccess
  | LoadB2BUsers
  | LoadB2BUsersFail
  | LoadB2BUsersSuccess
  | LoadB2BUserApprovers
  | LoadB2BUserApproversFail
  | LoadB2BUserApproversSuccess
  | CreateB2BUserApprover
  | CreateB2BUserApproverFail
  | CreateB2BUserApproverSuccess
  | DeleteB2BUserApprover
  | DeleteB2BUserApproverFail
  | DeleteB2BUserApproverSuccess
  | LoadB2BUserPermissions
  | LoadB2BUserPermissionsFail
  | LoadB2BUserPermissionsSuccess
  | CreateB2BUserPermission
  | CreateB2BUserPermissionFail
  | CreateB2BUserPermissionSuccess
  | DeleteB2BUserPermission
  | DeleteB2BUserPermissionFail
  | DeleteB2BUserPermissionSuccess
  | LoadB2BUserUserGroups
  | LoadB2BUserUserGroupsFail
  | LoadB2BUserUserGroupsSuccess
  | CreateB2BUserUserGroup
  | CreateB2BUserUserGroupFail
  | CreateB2BUserUserGroupSuccess
  | DeleteB2BUserUserGroup
  | DeleteB2BUserUserGroupFail
  | DeleteB2BUserUserGroupSuccess;
