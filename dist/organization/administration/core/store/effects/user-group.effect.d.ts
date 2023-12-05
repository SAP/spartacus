import { Actions } from '@ngrx/effects';
import { LoggerService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { UserGroupConnector } from '../../connectors/user-group/user-group.connector';
import { B2BUserActions, OrganizationActions, PermissionActions, UserGroupActions } from '../actions/index';
import * as i0 from "@angular/core";
export declare class UserGroupEffects {
    private actions$;
    private userGroupConnector;
    protected logger: LoggerService;
    loadUserGroup$: Observable<UserGroupActions.LoadUserGroupSuccess | UserGroupActions.LoadUserGroupFail>;
    loadUserGroups$: Observable<UserGroupActions.LoadUserGroupsSuccess | UserGroupActions.LoadUserGroupSuccess | UserGroupActions.LoadUserGroupsFail>;
    loadAvailableOrderApprovalPermissions$: Observable<UserGroupActions.LoadPermissionsSuccess | PermissionActions.LoadPermissionSuccess | UserGroupActions.LoadPermissionsFail>;
    loadAvailableOrgCustomers$: Observable<UserGroupActions.LoadAvailableOrgCustomersSuccess | B2BUserActions.LoadB2BUserSuccess | UserGroupActions.LoadAvailableOrgCustomersFail>;
    createUserGroup$: Observable<UserGroupActions.CreateUserGroupSuccess | UserGroupActions.CreateUserGroupFail | OrganizationActions.OrganizationClearData>;
    updateUserGroup$: Observable<UserGroupActions.UpdateUserGroupSuccess | UserGroupActions.UpdateUserGroupFail | OrganizationActions.OrganizationClearData>;
    deleteUserGroup$: Observable<UserGroupActions.DeleteUserGroupSuccess | UserGroupActions.DeleteUserGroupFail | OrganizationActions.OrganizationClearData>;
    assignPermissionToUserGroup$: Observable<UserGroupActions.AssignPermissionSuccess | UserGroupActions.AssignPermissionFail | OrganizationActions.OrganizationClearData>;
    assignMemberUnitUserGroup$: Observable<UserGroupActions.AssignMemberSuccess | UserGroupActions.AssignMemberFail | OrganizationActions.OrganizationClearData>;
    unassignMemberFromUserGroup$: Observable<UserGroupActions.UnassignMemberSuccess | UserGroupActions.UnassignMemberFail | OrganizationActions.OrganizationClearData>;
    unassignPermissionFromUserGroup$: Observable<UserGroupActions.UnassignPermissionSuccess | UserGroupActions.UnassignPermissionFail | OrganizationActions.OrganizationClearData>;
    unassignAllMembersFromUserGroup$: Observable<UserGroupActions.UnassignAllMembersSuccess | UserGroupActions.UnassignAllMembersFail | OrganizationActions.OrganizationClearData>;
    constructor(actions$: Actions, userGroupConnector: UserGroupConnector);
    static ɵfac: i0.ɵɵFactoryDeclaration<UserGroupEffects, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<UserGroupEffects>;
}
