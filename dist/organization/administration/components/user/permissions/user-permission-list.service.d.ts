import { B2BUser, EntitiesModel, PaginationModel } from '@spartacus/core';
import { B2BUserService, OrganizationItemStatus, Permission, PermissionService } from '@spartacus/organization/administration/core';
import { TableService } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { OrganizationTableType } from '../../shared/organization.model';
import { SubListService } from '../../shared/sub-list/sub-list.service';
import * as i0 from "@angular/core";
export declare class UserPermissionListService extends SubListService<Permission> {
    protected tableService: TableService;
    protected userService: B2BUserService;
    protected permissionService: PermissionService;
    protected tableType: OrganizationTableType;
    protected _domainType: OrganizationTableType;
    constructor(tableService: TableService, userService: B2BUserService, permissionService: PermissionService);
    protected load(pagination: PaginationModel, code: string): Observable<EntitiesModel<B2BUser> | undefined>;
    /**
     * @override
     * Assign permission to the user.
     */
    assign(userCode: string, code: string): Observable<OrganizationItemStatus<Permission>>;
    /**
     * @override
     * Unassign the permission from the user.
     */
    unassign(userCode: string, code: string): Observable<OrganizationItemStatus<Permission>>;
    static ɵfac: i0.ɵɵFactoryDeclaration<UserPermissionListService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<UserPermissionListService>;
}
