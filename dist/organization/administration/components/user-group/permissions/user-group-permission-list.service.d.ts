import { EntitiesModel, PaginationModel } from '@spartacus/core';
import { OrganizationItemStatus, Permission, PermissionService, UserGroup, UserGroupService } from '@spartacus/organization/administration/core';
import { TableService } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { OrganizationTableType } from '../../shared/organization.model';
import { SubListService } from '../../shared/sub-list/sub-list.service';
import * as i0 from "@angular/core";
export declare class UserGroupPermissionListService extends SubListService<Permission> {
    protected tableService: TableService;
    protected userGroupService: UserGroupService;
    protected permissionService: PermissionService;
    protected tableType: OrganizationTableType;
    protected _domainType: OrganizationTableType;
    constructor(tableService: TableService, userGroupService: UserGroupService, permissionService: PermissionService);
    /**
     *
     * @override
     * Loads all b2b users.
     *
     * @param code The user group code.
     */
    protected load(pagination: PaginationModel, code: string): Observable<EntitiesModel<Permission> | undefined>;
    /**
     * @override
     * Assign user to the user group.
     */
    assign(userGroupCode: string, permissionCode: string): Observable<OrganizationItemStatus<UserGroup>>;
    /**
     * @override
     * Unassigns the user from the user group.
     */
    unassign(userGroupCode: string, permissionCode: string): Observable<OrganizationItemStatus<UserGroup>>;
    static ɵfac: i0.ɵɵFactoryDeclaration<UserGroupPermissionListService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<UserGroupPermissionListService>;
}
