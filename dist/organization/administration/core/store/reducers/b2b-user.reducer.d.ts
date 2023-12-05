import { B2BUser, ListModel, StateUtils } from '@spartacus/core';
export declare const b2bUserInitialState: B2BUser | undefined;
export declare const b2bUsersInitialState: ListModel | undefined;
export declare function b2bUserEntitiesReducer(state: B2BUser | undefined, action: StateUtils.LoaderAction): B2BUser | undefined;
export declare function userListReducer(state: ListModel | undefined, action: StateUtils.LoaderAction): ListModel | undefined;
export declare function b2bUserApproverListReducer(state: ListModel | undefined, action: StateUtils.LoaderAction): ListModel | undefined;
export declare function b2bUserPermissionListReducer(state: ListModel | undefined, action: StateUtils.LoaderAction): ListModel | undefined;
export declare function b2bUserUserGroupListReducer(state: ListModel | undefined, action: StateUtils.LoaderAction): ListModel | undefined;
