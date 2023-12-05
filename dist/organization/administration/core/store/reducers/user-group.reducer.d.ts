import { ListModel, StateUtils } from '@spartacus/core';
import { UserGroup } from '../../model/user-group.model';
export declare const userGroupInitialState: UserGroup | undefined;
export declare const userGroupsInitialState: ListModel | undefined;
export declare function userGroupEntitiesReducer(state: UserGroup | undefined, action: StateUtils.LoaderAction): UserGroup | undefined;
export declare function userGroupsListReducer(state: ListModel | undefined, action: StateUtils.LoaderAction): ListModel | undefined;
export declare function userGroupAvailableOrderApprovalPermissionsListReducer(state: ListModel | undefined, action: StateUtils.LoaderAction): ListModel | undefined;
export declare function userGroupAvailablOrgCustomersListReducer(state: ListModel | undefined, action: StateUtils.LoaderAction): ListModel | undefined;
