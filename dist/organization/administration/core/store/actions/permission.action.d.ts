import { ListModel, OrderApprovalPermissionType, SearchConfig, StateUtils } from '@spartacus/core';
import { Permission } from '../../model/permission.model';
export declare const LOAD_PERMISSION = "[Permission] Load Permission Data";
export declare const LOAD_PERMISSION_FAIL = "[Permission] Load Permission Data Fail";
export declare const LOAD_PERMISSION_SUCCESS = "[Permission] Load Permission Data Success";
export declare const LOAD_PERMISSIONS = "[Permission] Load Permissions";
export declare const LOAD_PERMISSIONS_FAIL = "[Permission] Load Permissions Fail";
export declare const LOAD_PERMISSIONS_SUCCESS = "[Permission] Load Permissions Success";
export declare const CREATE_PERMISSION = "[Permission] Create Permission";
export declare const CREATE_PERMISSION_FAIL = "[Permission] Create Permission Fail";
export declare const CREATE_PERMISSION_SUCCESS = "[Permission] Create Permission Success";
export declare const UPDATE_PERMISSION = "[Permission] Update Permission";
export declare const UPDATE_PERMISSION_FAIL = "[Permission] Update Permission Fail";
export declare const UPDATE_PERMISSION_SUCCESS = "[Permission] Update Permission Success";
export declare const LOAD_PERMISSION_TYPES = "[Permission Types] Load Permission Types";
export declare const LOAD_PERMISSION_TYPES_FAIL = "[Permission Types] Load Permission Types Fail";
export declare const LOAD_PERMISSION_TYPES_SUCCESS = "[Permission Types] Load Permission Types Success";
export declare class LoadPermission extends StateUtils.EntityLoadAction {
    payload: {
        userId: string;
        permissionCode: string;
    };
    readonly type = "[Permission] Load Permission Data";
    constructor(payload: {
        userId: string;
        permissionCode: string;
    });
}
export declare class LoadPermissionFail extends StateUtils.EntityFailAction {
    payload: {
        permissionCode: string;
        error: any;
    };
    readonly type = "[Permission] Load Permission Data Fail";
    constructor(payload: {
        permissionCode: string;
        error: any;
    });
}
export declare class LoadPermissionSuccess extends StateUtils.EntitySuccessAction {
    payload: Permission | Permission[];
    readonly type = "[Permission] Load Permission Data Success";
    constructor(payload: Permission | Permission[]);
}
export declare class LoadPermissions extends StateUtils.EntityLoadAction {
    payload: {
        userId: string;
        params: SearchConfig;
    };
    readonly type = "[Permission] Load Permissions";
    constructor(payload: {
        userId: string;
        params: SearchConfig;
    });
}
export declare class LoadPermissionsFail extends StateUtils.EntityFailAction {
    payload: {
        params: SearchConfig;
        error: any;
    };
    readonly type = "[Permission] Load Permissions Fail";
    constructor(payload: {
        params: SearchConfig;
        error: any;
    });
}
export declare class LoadPermissionsSuccess extends StateUtils.EntitySuccessAction {
    payload: {
        page: ListModel;
        params: SearchConfig;
    };
    readonly type = "[Permission] Load Permissions Success";
    constructor(payload: {
        page: ListModel;
        params: SearchConfig;
    });
}
export declare class CreatePermission extends StateUtils.EntityLoadAction {
    payload: {
        userId: string;
        permission: Permission;
    };
    readonly type = "[Permission] Create Permission";
    constructor(payload: {
        userId: string;
        permission: Permission;
    });
}
export declare class CreatePermissionFail extends StateUtils.EntityFailAction {
    payload: {
        permissionCode: string;
        error: any;
    };
    readonly type = "[Permission] Create Permission Fail";
    constructor(payload: {
        permissionCode: string;
        error: any;
    });
}
export declare class CreatePermissionSuccess extends StateUtils.EntitySuccessAction {
    payload: Permission;
    readonly type = "[Permission] Create Permission Success";
    constructor(payload: Permission);
}
export declare class UpdatePermission extends StateUtils.EntityLoadAction {
    payload: {
        userId: string;
        permissionCode: string;
        permission: Permission;
    };
    readonly type = "[Permission] Update Permission";
    constructor(payload: {
        userId: string;
        permissionCode: string;
        permission: Permission;
    });
}
export declare class UpdatePermissionFail extends StateUtils.EntityFailAction {
    payload: {
        permissionCode: string;
        error: any;
    };
    readonly type = "[Permission] Update Permission Fail";
    constructor(payload: {
        permissionCode: string;
        error: any;
    });
}
export declare class UpdatePermissionSuccess extends StateUtils.EntitySuccessAction {
    payload: Permission;
    readonly type = "[Permission] Update Permission Success";
    constructor(payload: Permission);
}
export declare class LoadPermissionTypes extends StateUtils.EntityLoadAction {
    readonly type = "[Permission Types] Load Permission Types";
    constructor();
}
export declare class LoadPermissionTypesFail extends StateUtils.EntityFailAction {
    payload: any;
    readonly type = "[Permission Types] Load Permission Types Fail";
    constructor(payload: any);
}
export declare class LoadPermissionTypesSuccess extends StateUtils.EntitySuccessAction {
    payload: OrderApprovalPermissionType[];
    readonly type = "[Permission Types] Load Permission Types Success";
    constructor(payload: OrderApprovalPermissionType[]);
}
export type PermissionAction = LoadPermission | LoadPermissionFail | LoadPermissionSuccess | LoadPermissions | LoadPermissionsFail | LoadPermissionsSuccess | CreatePermission | CreatePermissionFail | CreatePermissionSuccess | UpdatePermission | UpdatePermissionFail | UpdatePermissionSuccess | LoadPermissionTypes | LoadPermissionTypesFail | LoadPermissionTypesSuccess;
