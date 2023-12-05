import { Store } from '@ngrx/store';
import { B2BUser, B2BUserRight, B2BUserRole, EntitiesModel, SearchConfig, UserIdService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { OrganizationItemStatus } from '../model/organization-item-status';
import { Permission } from '../model/permission.model';
import { UserGroup } from '../model/user-group.model';
import { StateWithOrganization } from '../store/organization-state';
import * as i0 from "@angular/core";
export declare class B2BUserService {
    protected store: Store<StateWithOrganization>;
    protected userIdService: UserIdService;
    constructor(store: Store<StateWithOrganization>, userIdService: UserIdService);
    load(orgCustomerId: string): void;
    loadList(params: SearchConfig): void;
    private getB2BUserValue;
    get(orgCustomerId: string): Observable<B2BUser>;
    getList(params: SearchConfig): Observable<EntitiesModel<B2BUser> | undefined>;
    getErrorState(orgCustomerId: string): Observable<boolean>;
    create(orgCustomer: B2BUser): void;
    update(orgCustomerId: string, orgCustomer: B2BUser): void;
    getLoadingStatus(orgCustomerId: string): Observable<OrganizationItemStatus<B2BUser>>;
    loadApprovers(orgCustomerId: string, params: SearchConfig): void;
    getApprovers(orgCustomerId: string, params: SearchConfig): Observable<EntitiesModel<B2BUser> | undefined>;
    assignApprover(orgCustomerId: string, approverId: string): void;
    unassignApprover(orgCustomerId: string, approverId: string): void;
    loadPermissions(orgCustomerId: string, params: SearchConfig): void;
    getPermissions(orgCustomerId: string, params: SearchConfig): Observable<EntitiesModel<Permission> | undefined>;
    assignPermission(orgCustomerId: string, permissionId: string): void;
    unassignPermission(orgCustomerId: string, permissionId: string): void;
    loadUserGroups(orgCustomerId: string, params: SearchConfig): void;
    getUserGroups(orgCustomerId: string, params: SearchConfig): Observable<EntitiesModel<UserGroup> | undefined>;
    assignUserGroup(orgCustomerId: string, userGroupId: string): void;
    unassignUserGroup(orgCustomerId: string, userGroupId: string): void;
    /**
     * Get list of all roles for B2BUser sorted by increasing privileges.
     *
     * This list is not driven by the backend (lack of API), but reflects roles
     * from the backend: `b2badmingroup`, `b2bcustomergroup`, `b2bmanagergroup` and `b2bapprovergroup`.
     *
     * If you reconfigure those roles in the backend or extend the list, you should change
     * this implementation accordingly.
     */
    getAllRoles(): B2BUserRole[];
    /**
     * Get list of all rights for B2BUser.
     *
     * This list is not driven by the backend (lack of API), but reflects rights
     * from the backend: `unitorderviewer'.
     *
     * If you reconfigure those rights in the backend or extend the list, you should change
     * this implementation accordingly.
     */
    getAllRights(): B2BUserRight[];
    private getB2BUserApproverList;
    private getB2BUserPermissionList;
    private getB2BUserUserGroupList;
    private getB2BUserState;
    private getUserList;
    isUpdatingUserAllowed(): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<B2BUserService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<B2BUserService>;
}
