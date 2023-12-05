import { B2BUser, ListModel, SearchConfig, StateUtils } from '@spartacus/core';
export declare const LOAD_B2B_USER = "[B2BUser] Load B2BUser Data";
export declare const LOAD_B2B_USER_FAIL = "[B2BUser] Load B2BUser Data Fail";
export declare const LOAD_B2B_USER_SUCCESS = "[B2BUser] Load B2BUser Data Success";
export declare const CREATE_B2B_USER = "[B2BUser] Create B2BUser Data";
export declare const CREATE_B2B_USER_FAIL = "[B2BUser] Create B2BUser Data Fail";
export declare const CREATE_B2B_USER_SUCCESS = "[B2BUser] Create B2BUser Data Success";
export declare const UPDATE_B2B_USER = "[B2BUser] Update B2BUser Data";
export declare const UPDATE_B2B_USER_FAIL = "[B2BUser] Update B2BUser Data Fail";
export declare const UPDATE_B2B_USER_SUCCESS = "[B2BUser] Update B2BUser Data Success";
export declare const LOAD_B2B_USERS = "[B2BUser] Load B2BUsers";
export declare const LOAD_B2B_USERS_FAIL = "[B2BUser] Load B2BUsers Fail";
export declare const LOAD_B2B_USERS_SUCCESS = "[B2BUser] Load B2BUsers Success";
export declare const LOAD_B2B_USER_APPROVERS = "[B2BUser] Load B2BUser Approvers";
export declare const LOAD_B2B_USER_APPROVERS_FAIL = "[B2BUser] Load B2BUser Approvers Fail";
export declare const LOAD_B2B_USER_APPROVERS_SUCCESS = "[B2BUser] Load B2BUser Approvers Success";
export declare const ASSIGN_B2B_USER_APPROVER = "[B2BUser] Assign B2BUser Approver";
export declare const ASSIGN_B2B_USER_APPROVER_FAIL = "[B2BUser] Assign B2BUser Approver Fail";
export declare const ASSIGN_B2B_USER_APPROVER_SUCCESS = "[B2BUser] Assign B2BUser Approver Success";
export declare const UNASSIGN_B2B_USER_APPROVER = "[B2BUser] Unassign B2BUser Approver";
export declare const UNASSIGN_B2B_USER_APPROVER_FAIL = "[B2BUser] Unassign B2BUser Approver Fail";
export declare const UNASSIGN_B2B_USER_APPROVER_SUCCESS = "[B2BUser] Unassign B2BUser Approver Success";
export declare const LOAD_B2B_USER_PERMISSIONS = "[B2BUser] Load B2BUser Permissions";
export declare const LOAD_B2B_USER_PERMISSIONS_FAIL = "[B2BUser] Load B2BUser Permissions Fail";
export declare const LOAD_B2B_USER_PERMISSIONS_SUCCESS = "[B2BUser] Load B2BUser Permissions Success";
export declare const ASSIGN_B2B_USER_PERMISSION = "[B2BUser] Assign B2BUser Permission";
export declare const ASSIGN_B2B_USER_PERMISSION_FAIL = "[B2BUser] Assign B2BUser Permission Fail";
export declare const ASSIGN_B2B_USER_PERMISSION_SUCCESS = "[B2BUser] Assign B2BUser Permission Success";
export declare const UNASSIGN_B2B_USER_PERMISSION = "[B2BUser] Unassign B2BUser Permission";
export declare const UNASSIGN_B2B_USER_PERMISSION_FAIL = "[B2BUser] Unassign B2BUser Permission Fail";
export declare const UNASSIGN_B2B_USER_PERMISSION_SUCCESS = "[B2BUser] Unassign B2BUser Permission Success";
export declare const LOAD_B2B_USER_USER_GROUPS = "[B2BUser] Load B2BUser User Groups";
export declare const LOAD_B2B_USER_USER_GROUPS_FAIL = "[B2BUser] Load B2BUser User Groups Fail";
export declare const LOAD_B2B_USER_USER_GROUPS_SUCCESS = "[B2BUser] Load B2BUser User Groups Success";
export declare const ASSIGN_B2B_USER_USER_GROUP = "[B2BUser] Assign B2BUser User Group";
export declare const ASSIGN_B2B_USER_USER_GROUP_FAIL = "[B2BUser] Assign B2BUser User Group Fail";
export declare const ASSIGN_B2B_USER_USER_GROUP_SUCCESS = "[B2BUser] Assign B2BUser User Group Success";
export declare const UNASSIGN_B2B_USER_USER_GROUP = "[B2BUser] Unassign B2BUser User Group";
export declare const UNASSIGN_B2B_USER_USER_GROUP_FAIL = "[B2BUser] Unassign B2BUser User Group Fail";
export declare const UNASSIGN_B2B_USER_USER_GROUP_SUCCESS = "[B2BUser] Unassign B2BUser User Group Success";
export declare class LoadB2BUser extends StateUtils.EntityLoadAction {
    payload: {
        userId: string;
        orgCustomerId: string;
    };
    readonly type = "[B2BUser] Load B2BUser Data";
    constructor(payload: {
        userId: string;
        orgCustomerId: string;
    });
}
export declare class LoadB2BUserFail extends StateUtils.EntityFailAction {
    payload: {
        orgCustomerId: string;
        error: any;
    };
    readonly type = "[B2BUser] Load B2BUser Data Fail";
    constructor(payload: {
        orgCustomerId: string;
        error: any;
    });
}
export declare class LoadB2BUserSuccess extends StateUtils.EntitySuccessAction {
    payload: B2BUser | B2BUser[];
    readonly type = "[B2BUser] Load B2BUser Data Success";
    constructor(payload: B2BUser | B2BUser[]);
}
export declare class CreateB2BUser extends StateUtils.EntityLoadAction {
    payload: {
        userId: string;
        orgCustomer: B2BUser;
    };
    readonly type = "[B2BUser] Create B2BUser Data";
    constructor(payload: {
        userId: string;
        orgCustomer: B2BUser;
    });
}
export declare class CreateB2BUserFail extends StateUtils.EntityFailAction {
    payload: {
        orgCustomerId: string;
        error: any;
    };
    readonly type = "[B2BUser] Create B2BUser Data Fail";
    constructor(payload: {
        orgCustomerId: string;
        error: any;
    });
}
export declare class CreateB2BUserSuccess extends StateUtils.EntitySuccessAction {
    payload: B2BUser;
    readonly type = "[B2BUser] Create B2BUser Data Success";
    constructor(payload: B2BUser);
}
export declare class UpdateB2BUser extends StateUtils.EntityLoadAction {
    payload: {
        userId: string;
        orgCustomerId: string;
        orgCustomer: B2BUser;
    };
    readonly type = "[B2BUser] Update B2BUser Data";
    constructor(payload: {
        userId: string;
        orgCustomerId: string;
        orgCustomer: B2BUser;
    });
}
export declare class UpdateB2BUserFail extends StateUtils.EntityFailAction {
    payload: {
        orgCustomerId: string;
        error: any;
    };
    readonly type = "[B2BUser] Update B2BUser Data Fail";
    constructor(payload: {
        orgCustomerId: string;
        error: any;
    });
}
export declare class UpdateB2BUserSuccess extends StateUtils.EntitySuccessAction {
    payload: B2BUser;
    readonly type = "[B2BUser] Update B2BUser Data Success";
    constructor(payload: B2BUser);
}
export declare class LoadB2BUsers extends StateUtils.EntityLoadAction {
    payload: {
        userId: string;
        params: SearchConfig;
    };
    readonly type = "[B2BUser] Load B2BUsers";
    constructor(payload: {
        userId: string;
        params: SearchConfig;
    });
}
export declare class LoadB2BUsersFail extends StateUtils.EntityFailAction {
    payload: {
        params: SearchConfig;
        error: any;
    };
    readonly type = "[B2BUser] Load B2BUsers Fail";
    constructor(payload: {
        params: SearchConfig;
        error: any;
    });
}
export declare class LoadB2BUsersSuccess extends StateUtils.EntitySuccessAction {
    payload: {
        page: ListModel;
        params: SearchConfig;
    };
    readonly type = "[B2BUser] Load B2BUsers Success";
    constructor(payload: {
        page: ListModel;
        params: SearchConfig;
    });
}
export declare class LoadB2BUserApprovers extends StateUtils.EntityLoadAction {
    payload: {
        userId: string;
        orgCustomerId: string;
        params: SearchConfig;
    };
    readonly type = "[B2BUser] Load B2BUser Approvers";
    constructor(payload: {
        userId: string;
        orgCustomerId: string;
        params: SearchConfig;
    });
}
export declare class LoadB2BUserApproversFail extends StateUtils.EntityFailAction {
    payload: {
        orgCustomerId: string;
        params: SearchConfig;
        error: any;
    };
    readonly type = "[B2BUser] Load B2BUser Approvers Fail";
    constructor(payload: {
        orgCustomerId: string;
        params: SearchConfig;
        error: any;
    });
}
export declare class LoadB2BUserApproversSuccess extends StateUtils.EntitySuccessAction {
    payload: {
        orgCustomerId: string;
        page: ListModel;
        params: SearchConfig;
    };
    readonly type = "[B2BUser] Load B2BUser Approvers Success";
    constructor(payload: {
        orgCustomerId: string;
        page: ListModel;
        params: SearchConfig;
    });
}
export declare class AssignB2BUserApprover extends StateUtils.EntityLoadAction {
    payload: {
        userId: string;
        orgCustomerId: string;
        approverId: string;
    };
    readonly type = "[B2BUser] Assign B2BUser Approver";
    constructor(payload: {
        userId: string;
        orgCustomerId: string;
        approverId: string;
    });
}
export declare class AssignB2BUserApproverFail extends StateUtils.EntityFailAction {
    payload: {
        orgCustomerId: string;
        approverId: string;
        error: any;
    };
    readonly type = "[B2BUser] Assign B2BUser Approver Fail";
    constructor(payload: {
        orgCustomerId: string;
        approverId: string;
        error: any;
    });
}
export declare class AssignB2BUserApproverSuccess extends StateUtils.EntitySuccessAction {
    payload: {
        approverId: string;
        selected: boolean;
    };
    readonly type = "[B2BUser] Assign B2BUser Approver Success";
    constructor(payload: {
        approverId: string;
        selected: boolean;
    });
}
export declare class UnassignB2BUserApprover extends StateUtils.EntityLoadAction {
    payload: {
        userId: string;
        orgCustomerId: string;
        approverId: string;
    };
    readonly type = "[B2BUser] Unassign B2BUser Approver";
    constructor(payload: {
        userId: string;
        orgCustomerId: string;
        approverId: string;
    });
}
export declare class UnassignB2BUserApproverFail extends StateUtils.EntityFailAction {
    payload: {
        orgCustomerId: string;
        approverId: string;
        error: any;
    };
    readonly type = "[B2BUser] Unassign B2BUser Approver Fail";
    constructor(payload: {
        orgCustomerId: string;
        approverId: string;
        error: any;
    });
}
export declare class UnassignB2BUserApproverSuccess extends StateUtils.EntitySuccessAction {
    payload: {
        approverId: string;
        selected: boolean;
    };
    readonly type = "[B2BUser] Unassign B2BUser Approver Success";
    constructor(payload: {
        approverId: string;
        selected: boolean;
    });
}
export declare class LoadB2BUserPermissions extends StateUtils.EntityLoadAction {
    payload: {
        userId: string;
        orgCustomerId: string;
        params: SearchConfig;
    };
    readonly type = "[B2BUser] Load B2BUser Permissions";
    constructor(payload: {
        userId: string;
        orgCustomerId: string;
        params: SearchConfig;
    });
}
export declare class LoadB2BUserPermissionsFail extends StateUtils.EntityFailAction {
    payload: {
        orgCustomerId: string;
        params: SearchConfig;
        error: any;
    };
    readonly type = "[B2BUser] Load B2BUser Permissions Fail";
    constructor(payload: {
        orgCustomerId: string;
        params: SearchConfig;
        error: any;
    });
}
export declare class LoadB2BUserPermissionsSuccess extends StateUtils.EntitySuccessAction {
    payload: {
        orgCustomerId: string;
        page: ListModel;
        params: SearchConfig;
    };
    readonly type = "[B2BUser] Load B2BUser Permissions Success";
    constructor(payload: {
        orgCustomerId: string;
        page: ListModel;
        params: SearchConfig;
    });
}
export declare class AssignB2BUserPermission extends StateUtils.EntityLoadAction {
    payload: {
        userId: string;
        orgCustomerId: string;
        permissionId: string;
    };
    readonly type = "[B2BUser] Assign B2BUser Permission";
    constructor(payload: {
        userId: string;
        orgCustomerId: string;
        permissionId: string;
    });
}
export declare class AssignB2BUserPermissionFail extends StateUtils.EntityFailAction {
    payload: {
        orgCustomerId: string;
        permissionId: string;
        error: any;
    };
    readonly type = "[B2BUser] Assign B2BUser Permission Fail";
    constructor(payload: {
        orgCustomerId: string;
        permissionId: string;
        error: any;
    });
}
export declare class AssignB2BUserPermissionSuccess extends StateUtils.EntitySuccessAction {
    payload: {
        permissionId: string;
        selected: boolean;
    };
    readonly type = "[B2BUser] Assign B2BUser Permission Success";
    constructor(payload: {
        permissionId: string;
        selected: boolean;
    });
}
export declare class UnassignB2BUserPermission extends StateUtils.EntityLoadAction {
    payload: {
        userId: string;
        orgCustomerId: string;
        permissionId: string;
    };
    readonly type = "[B2BUser] Unassign B2BUser Permission";
    constructor(payload: {
        userId: string;
        orgCustomerId: string;
        permissionId: string;
    });
}
export declare class UnassignB2BUserPermissionFail extends StateUtils.EntityFailAction {
    payload: {
        orgCustomerId: string;
        permissionId: string;
        error: any;
    };
    readonly type = "[B2BUser] Unassign B2BUser Permission Fail";
    constructor(payload: {
        orgCustomerId: string;
        permissionId: string;
        error: any;
    });
}
export declare class UnassignB2BUserPermissionSuccess extends StateUtils.EntitySuccessAction {
    payload: {
        permissionId: string;
        selected: boolean;
    };
    readonly type = "[B2BUser] Unassign B2BUser Permission Success";
    constructor(payload: {
        permissionId: string;
        selected: boolean;
    });
}
export declare class LoadB2BUserUserGroups extends StateUtils.EntityLoadAction {
    payload: {
        userId: string;
        orgCustomerId: string;
        params: SearchConfig;
    };
    readonly type = "[B2BUser] Load B2BUser User Groups";
    constructor(payload: {
        userId: string;
        orgCustomerId: string;
        params: SearchConfig;
    });
}
export declare class LoadB2BUserUserGroupsFail extends StateUtils.EntityFailAction {
    payload: {
        orgCustomerId: string;
        params: SearchConfig;
        error: any;
    };
    readonly type = "[B2BUser] Load B2BUser User Groups Fail";
    constructor(payload: {
        orgCustomerId: string;
        params: SearchConfig;
        error: any;
    });
}
export declare class LoadB2BUserUserGroupsSuccess extends StateUtils.EntitySuccessAction {
    payload: {
        orgCustomerId: string;
        page: ListModel;
        params: SearchConfig;
    };
    readonly type = "[B2BUser] Load B2BUser User Groups Success";
    constructor(payload: {
        orgCustomerId: string;
        page: ListModel;
        params: SearchConfig;
    });
}
export declare class AssignB2BUserUserGroup extends StateUtils.EntityLoadAction {
    payload: {
        userId: string;
        orgCustomerId: string;
        userGroupId: string;
    };
    readonly type = "[B2BUser] Assign B2BUser User Group";
    constructor(payload: {
        userId: string;
        orgCustomerId: string;
        userGroupId: string;
    });
}
export declare class AssignB2BUserUserGroupFail extends StateUtils.EntityFailAction {
    payload: {
        orgCustomerId: string;
        userGroupId: string;
        error: any;
    };
    readonly type = "[B2BUser] Assign B2BUser User Group Fail";
    constructor(payload: {
        orgCustomerId: string;
        userGroupId: string;
        error: any;
    });
}
export declare class AssignB2BUserUserGroupSuccess extends StateUtils.EntitySuccessAction {
    payload: {
        uid: string;
        selected: boolean;
    };
    readonly type = "[B2BUser] Assign B2BUser User Group Success";
    constructor(payload: {
        uid: string;
        selected: boolean;
    });
}
export declare class UnassignB2BUserUserGroup extends StateUtils.EntityLoadAction {
    payload: {
        userId: string;
        orgCustomerId: string;
        userGroupId: string;
    };
    readonly type = "[B2BUser] Unassign B2BUser User Group";
    constructor(payload: {
        userId: string;
        orgCustomerId: string;
        userGroupId: string;
    });
}
export declare class UnassignB2BUserUserGroupFail extends StateUtils.EntityFailAction {
    payload: {
        orgCustomerId: string;
        userGroupId: string;
        error: any;
    };
    readonly type = "[B2BUser] Unassign B2BUser User Group Fail";
    constructor(payload: {
        orgCustomerId: string;
        userGroupId: string;
        error: any;
    });
}
export declare class UnassignB2BUserUserGroupSuccess extends StateUtils.EntitySuccessAction {
    payload: {
        uid: string;
        selected: boolean;
    };
    readonly type = "[B2BUser] Unassign B2BUser User Group Success";
    constructor(payload: {
        uid: string;
        selected: boolean;
    });
}
export type B2BUserAction = LoadB2BUser | LoadB2BUserFail | LoadB2BUserSuccess | CreateB2BUser | CreateB2BUserFail | CreateB2BUserSuccess | UpdateB2BUser | UpdateB2BUserFail | UpdateB2BUserSuccess | LoadB2BUsers | LoadB2BUsersFail | LoadB2BUsersSuccess | LoadB2BUserApprovers | LoadB2BUserApproversFail | LoadB2BUserApproversSuccess | AssignB2BUserApprover | AssignB2BUserApproverFail | AssignB2BUserApproverSuccess | UnassignB2BUserApprover | UnassignB2BUserApproverFail | UnassignB2BUserApproverSuccess | LoadB2BUserPermissions | LoadB2BUserPermissionsFail | LoadB2BUserPermissionsSuccess | AssignB2BUserPermission | AssignB2BUserPermissionFail | AssignB2BUserPermissionSuccess | UnassignB2BUserPermission | UnassignB2BUserPermissionFail | UnassignB2BUserPermissionSuccess | LoadB2BUserUserGroups | LoadB2BUserUserGroupsFail | LoadB2BUserUserGroupsSuccess | AssignB2BUserUserGroup | AssignB2BUserUserGroupFail | AssignB2BUserUserGroupSuccess | UnassignB2BUserUserGroup | UnassignB2BUserUserGroupFail | UnassignB2BUserUserGroupSuccess;
