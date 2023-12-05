import { ListModel, SearchConfig, StateUtils } from '@spartacus/core';
import { UserGroup } from '../../model/user-group.model';
export declare const LOAD_USER_GROUP = "[UserGroup] Load UserGroup Data";
export declare const LOAD_USER_GROUP_FAIL = "[UserGroup] Load UserGroup Data Fail";
export declare const LOAD_USER_GROUP_SUCCESS = "[UserGroup] Load UserGroup Data Success";
export declare const LOAD_USER_GROUPS = "[UserGroup] Load UserGroups";
export declare const LOAD_USER_GROUPS_FAIL = "[UserGroup] Load UserGroups Fail";
export declare const LOAD_USER_GROUPS_SUCCESS = "[UserGroup] Load UserGroups Success";
export declare const LOAD_USER_GROUP_PERMISSIONS = "[UserGroup] Load Permissions Data";
export declare const LOAD_USER_GROUP_PERMISSIONS_FAIL = "[UserGroup] Load Permissions Data Fail";
export declare const LOAD_USER_GROUP_PERMISSIONS_SUCCESS = "[UserGroup] Load Permissions Data Success";
export declare const LOAD_USER_GROUP_AVAILABLE_CUSTOMERS = "[UserGroup] Load Customers Data";
export declare const LOAD_USER_GROUP_AVAILABLE_CUSTOMERS_FAIL = "[UserGroup] Load Customers Data Fail";
export declare const LOAD_USER_GROUP_AVAILABLE_CUSTOMERS_SUCCESS = "[UserGroup] Load Customers Data Success";
export declare const CREATE_USER_GROUP = "[UserGroup] Create UserGroup";
export declare const CREATE_USER_GROUP_FAIL = "[UserGroup] Create UserGroup Fail";
export declare const CREATE_USER_GROUP_SUCCESS = "[UserGroup] Create UserGroup Success";
export declare const USER_GROUP_ASSIGN_MEMBER = "[UserGroup] Assign Member";
export declare const USER_GROUP_ASSIGN_MEMBER_FAIL = "[UserGroup] Assign Member Fail";
export declare const USER_GROUP_ASSIGN_MEMBER_SUCCESS = "[UserGroup] Assign Member Success";
export declare const USER_GROUP_ASSIGN_PERMISSION = "[UserGroup] Assign Permissions";
export declare const USER_GROUP_ASSIGN_PERMISSION_FAIL = "[UserGroup] Assign Permissions Fail";
export declare const USER_GROUP_ASSIGN_PERMISSION_SUCCESS = "[UserGroup] Assign Permissions Success";
export declare const UPDATE_USER_GROUP = "[UserGroup] Update UserGroup";
export declare const UPDATE_USER_GROUP_FAIL = "[UserGroup] Update UserGroup Fail";
export declare const UPDATE_USER_GROUP_SUCCESS = "[UserGroup] Update UserGroup Success";
export declare const DELETE_USER_GROUP = "[UserGroup] Delete UserGroup";
export declare const DELETE_USER_GROUP_FAIL = "[UserGroup] Delete UserGroup Fail";
export declare const DELETE_USER_GROUP_SUCCESS = "[UserGroup] Delete UserGroup Success";
export declare const USER_GROUP_UNASSIGN_ALL_MEMBERS = "[UserGroup] Unassign Members";
export declare const USER_GROUP_UNASSIGN_ALL_MEMBERS_FAIL = "[UserGroup] Unassign Members Fail";
export declare const USER_GROUP_UNASSIGN_ALL_MEMBERS_SUCCESS = "[UserGroup] Unassign Members Success";
export declare const USER_GROUP_UNASSIGN_MEMBER = "[UserGroup] Unassign Member";
export declare const USER_GROUP_UNASSIGN_MEMBER_FAIL = "[UserGroup] Unassign Member Fail";
export declare const USER_GROUP_UNASSIGN_MEMBER_SUCCESS = "[UserGroup] Unassign Member Success";
export declare const USER_GROUP_UNASSIGN_PERMISSION = "[UserGroup] Unassign Permission";
export declare const USER_GROUP_UNASSIGN_PERMISSION_FAIL = "[UserGroup] Unassign Permission Fail";
export declare const USER_GROUP_UNASSIGN_PERMISSION_SUCCESS = "[UserGroup] Unassign Permission Success";
export declare class LoadUserGroup extends StateUtils.EntityLoadAction {
    payload: {
        userId: string;
        userGroupId: string;
    };
    readonly type = "[UserGroup] Load UserGroup Data";
    constructor(payload: {
        userId: string;
        userGroupId: string;
    });
}
export declare class LoadUserGroupFail extends StateUtils.EntityFailAction {
    payload: {
        userGroupId: string;
        error: any;
    };
    readonly type = "[UserGroup] Load UserGroup Data Fail";
    constructor(payload: {
        userGroupId: string;
        error: any;
    });
}
export declare class LoadUserGroupSuccess extends StateUtils.EntitySuccessAction {
    payload: UserGroup | UserGroup[];
    readonly type = "[UserGroup] Load UserGroup Data Success";
    constructor(payload: UserGroup | UserGroup[]);
}
export declare class LoadUserGroups extends StateUtils.EntityLoadAction {
    payload: {
        userId: string;
        params: SearchConfig;
    };
    readonly type = "[UserGroup] Load UserGroups";
    constructor(payload: {
        userId: string;
        params: SearchConfig;
    });
}
export declare class LoadUserGroupsFail extends StateUtils.EntityFailAction {
    payload: {
        params: SearchConfig;
        error: any;
    };
    readonly type = "[UserGroup] Load UserGroups Fail";
    constructor(payload: {
        params: SearchConfig;
        error: any;
    });
}
export declare class LoadUserGroupsSuccess extends StateUtils.EntitySuccessAction {
    payload: {
        page: ListModel;
        params: SearchConfig;
    };
    readonly type = "[UserGroup] Load UserGroups Success";
    constructor(payload: {
        page: ListModel;
        params: SearchConfig;
    });
}
export declare class LoadPermissions extends StateUtils.EntityLoadAction {
    payload: {
        userId: string;
        userGroupId: string;
        params: SearchConfig;
    };
    readonly type = "[UserGroup] Load Permissions Data";
    constructor(payload: {
        userId: string;
        userGroupId: string;
        params: SearchConfig;
    });
}
export declare class LoadPermissionsFail extends StateUtils.EntityFailAction {
    payload: {
        userGroupId: string;
        params: SearchConfig;
        error: any;
    };
    readonly type = "[UserGroup] Load Permissions Data Fail";
    constructor(payload: {
        userGroupId: string;
        params: SearchConfig;
        error: any;
    });
}
export declare class LoadPermissionsSuccess extends StateUtils.EntitySuccessAction {
    payload: {
        userGroupId: string;
        page: ListModel;
        params: SearchConfig;
    };
    readonly type = "[UserGroup] Load Permissions Data Success";
    constructor(payload: {
        userGroupId: string;
        page: ListModel;
        params: SearchConfig;
    });
}
export declare class LoadAvailableOrgCustomers extends StateUtils.EntityLoadAction {
    payload: {
        userId: string;
        userGroupId: string;
        params: SearchConfig;
    };
    readonly type = "[UserGroup] Load Customers Data";
    constructor(payload: {
        userId: string;
        userGroupId: string;
        params: SearchConfig;
    });
}
export declare class LoadAvailableOrgCustomersFail extends StateUtils.EntityFailAction {
    payload: {
        userGroupId: string;
        params: SearchConfig;
        error: any;
    };
    readonly type = "[UserGroup] Load Customers Data Fail";
    constructor(payload: {
        userGroupId: string;
        params: SearchConfig;
        error: any;
    });
}
export declare class LoadAvailableOrgCustomersSuccess extends StateUtils.EntitySuccessAction {
    payload: {
        userGroupId: string;
        page: ListModel;
        params: SearchConfig;
    };
    readonly type = "[UserGroup] Load Customers Data Success";
    constructor(payload: {
        userGroupId: string;
        page: ListModel;
        params: SearchConfig;
    });
}
export declare class CreateUserGroup extends StateUtils.EntityLoadAction {
    payload: {
        userId: string;
        userGroup: UserGroup;
    };
    readonly type = "[UserGroup] Create UserGroup";
    constructor(payload: {
        userId: string;
        userGroup: UserGroup;
    });
}
export declare class CreateUserGroupFail extends StateUtils.EntityFailAction {
    payload: {
        userGroupId: string;
        error: any;
    };
    readonly type = "[UserGroup] Create UserGroup Fail";
    constructor(payload: {
        userGroupId: string;
        error: any;
    });
}
export declare class CreateUserGroupSuccess extends StateUtils.EntitySuccessAction {
    payload: UserGroup;
    readonly type = "[UserGroup] Create UserGroup Success";
    constructor(payload: UserGroup);
}
export declare class AssignMember extends StateUtils.EntityLoadAction {
    payload: {
        userId: string;
        userGroupId: string;
        customerId: string;
    };
    readonly type = "[UserGroup] Assign Member";
    constructor(payload: {
        userId: string;
        userGroupId: string;
        customerId: string;
    });
}
export declare class AssignMemberFail extends StateUtils.EntityFailAction {
    payload: {
        userGroupId: string;
        customerId: string;
        error: any;
    };
    readonly type = "[UserGroup] Assign Member Fail";
    constructor(payload: {
        userGroupId: string;
        customerId: string;
        error: any;
    });
}
export declare class AssignMemberSuccess extends StateUtils.EntitySuccessAction {
    payload: {
        customerId: string;
        selected: boolean;
    };
    readonly type = "[UserGroup] Assign Member Success";
    constructor(payload: {
        customerId: string;
        selected: boolean;
    });
}
export declare class AssignPermission extends StateUtils.EntityLoadAction {
    payload: {
        userId: string;
        userGroupId: string;
        permissionUid: string;
    };
    readonly type = "[UserGroup] Assign Permissions";
    constructor(payload: {
        userId: string;
        userGroupId: string;
        permissionUid: string;
    });
}
export declare class AssignPermissionFail extends StateUtils.EntityFailAction {
    payload: {
        userGroupId: string;
        permissionUid: string;
        error: any;
    };
    readonly type = "[UserGroup] Assign Permissions Fail";
    constructor(payload: {
        userGroupId: string;
        permissionUid: string;
        error: any;
    });
}
export declare class AssignPermissionSuccess extends StateUtils.EntitySuccessAction {
    payload: {
        permissionUid: string;
        selected: boolean;
    };
    readonly type = "[UserGroup] Assign Permissions Success";
    constructor(payload: {
        permissionUid: string;
        selected: boolean;
    });
}
export declare class UpdateUserGroup extends StateUtils.EntityLoadAction {
    payload: {
        userId: string;
        userGroupId: string;
        userGroup: UserGroup;
    };
    readonly type = "[UserGroup] Update UserGroup";
    constructor(payload: {
        userId: string;
        userGroupId: string;
        userGroup: UserGroup;
    });
}
export declare class UpdateUserGroupFail extends StateUtils.EntityFailAction {
    payload: {
        userGroupId: string;
        error: any;
    };
    readonly type = "[UserGroup] Update UserGroup Fail";
    constructor(payload: {
        userGroupId: string;
        error: any;
    });
}
export declare class UpdateUserGroupSuccess extends StateUtils.EntitySuccessAction {
    payload: UserGroup;
    readonly type = "[UserGroup] Update UserGroup Success";
    constructor(payload: UserGroup);
}
export declare class DeleteUserGroup extends StateUtils.EntityLoadAction {
    payload: {
        userId: string;
        userGroupId: string;
    };
    readonly type = "[UserGroup] Delete UserGroup";
    constructor(payload: {
        userId: string;
        userGroupId: string;
    });
}
export declare class DeleteUserGroupFail extends StateUtils.EntityFailAction {
    payload: {
        userGroupId: string;
        error: any;
    };
    readonly type = "[UserGroup] Delete UserGroup Fail";
    constructor(payload: {
        userGroupId: string;
        error: any;
    });
}
export declare class DeleteUserGroupSuccess extends StateUtils.EntitySuccessAction {
    payload: UserGroup;
    readonly type = "[UserGroup] Delete UserGroup Success";
    constructor(payload: UserGroup);
}
export declare class UnassignMember extends StateUtils.EntityLoadAction {
    payload: {
        userId: string;
        userGroupId: string;
        customerId: string;
    };
    readonly type = "[UserGroup] Unassign Member";
    constructor(payload: {
        userId: string;
        userGroupId: string;
        customerId: string;
    });
}
export declare class UnassignMemberFail extends StateUtils.EntityFailAction {
    payload: {
        userGroupId: string;
        customerId: string;
        error: any;
    };
    readonly type = "[UserGroup] Unassign Member Fail";
    constructor(payload: {
        userGroupId: string;
        customerId: string;
        error: any;
    });
}
export declare class UnassignMemberSuccess extends StateUtils.EntitySuccessAction {
    payload: {
        customerId: string;
        selected: boolean;
    };
    readonly type = "[UserGroup] Unassign Member Success";
    constructor(payload: {
        customerId: string;
        selected: boolean;
    });
}
export declare class UnassignAllMembers extends StateUtils.EntityLoadAction {
    payload: {
        userId: string;
        userGroupId: string;
    };
    readonly type = "[UserGroup] Unassign Members";
    constructor(payload: {
        userId: string;
        userGroupId: string;
    });
}
export declare class UnassignAllMembersFail extends StateUtils.EntityFailAction {
    payload: {
        userGroupId: string;
        error: any;
    };
    readonly type = "[UserGroup] Unassign Members Fail";
    constructor(payload: {
        userGroupId: string;
        error: any;
    });
}
export declare class UnassignAllMembersSuccess extends StateUtils.EntitySuccessAction {
    payload: UserGroup;
    readonly type = "[UserGroup] Unassign Members Success";
    constructor(payload: UserGroup);
}
export declare class UnassignPermission extends StateUtils.EntityLoadAction {
    payload: {
        userId: string;
        userGroupId: string;
        permissionUid: string;
    };
    readonly type = "[UserGroup] Unassign Permission";
    constructor(payload: {
        userId: string;
        userGroupId: string;
        permissionUid: string;
    });
}
export declare class UnassignPermissionFail extends StateUtils.EntityFailAction {
    payload: {
        userGroupId: string;
        permissionUid: string;
        error: any;
    };
    readonly type = "[UserGroup] Unassign Permission Fail";
    constructor(payload: {
        userGroupId: string;
        permissionUid: string;
        error: any;
    });
}
export declare class UnassignPermissionSuccess extends StateUtils.EntitySuccessAction {
    payload: {
        permissionUid: string;
        selected: boolean;
    };
    readonly type = "[UserGroup] Unassign Permission Success";
    constructor(payload: {
        permissionUid: string;
        selected: boolean;
    });
}
export type UserGroupAction = LoadUserGroup | LoadUserGroupFail | LoadUserGroupSuccess | LoadUserGroups | LoadUserGroupsFail | LoadUserGroupsSuccess | LoadPermissions | LoadPermissionsFail | LoadPermissionsSuccess | LoadAvailableOrgCustomers | LoadAvailableOrgCustomersFail | LoadAvailableOrgCustomersSuccess | CreateUserGroup | CreateUserGroupFail | CreateUserGroupSuccess | AssignMember | AssignMemberFail | AssignMemberSuccess | AssignPermission | AssignPermissionFail | AssignPermissionSuccess | UpdateUserGroup | UpdateUserGroupFail | UpdateUserGroupSuccess | DeleteUserGroup | DeleteUserGroupFail | DeleteUserGroupSuccess | UnassignMember | UnassignMemberFail | UnassignMemberSuccess | UnassignAllMembers | UnassignAllMembersFail | UnassignAllMembersSuccess | UnassignPermission | UnassignPermissionFail | UnassignPermissionSuccess;
