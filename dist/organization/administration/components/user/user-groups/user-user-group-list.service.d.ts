import { EntitiesModel, PaginationModel } from '@spartacus/core';
import { B2BUserService, OrganizationItemStatus, UserGroup, UserGroupService } from '@spartacus/organization/administration/core';
import { TableService } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { OrganizationTableType } from '../../shared/organization.model';
import { SubListService } from '../../shared/sub-list/sub-list.service';
import * as i0 from "@angular/core";
export declare class UserUserGroupListService extends SubListService<UserGroup> {
    protected tableService: TableService;
    protected userService: B2BUserService;
    protected userGroupService: UserGroupService;
    protected tableType: OrganizationTableType;
    protected _domainType: OrganizationTableType;
    constructor(tableService: TableService, userService: B2BUserService, userGroupService: UserGroupService);
    protected load(pagination: PaginationModel, code: string): Observable<EntitiesModel<UserGroup> | undefined>;
    /**
     * @override
     * Assign user group to the user.
     */
    assign(userCode: string, userGroupCode: string): Observable<OrganizationItemStatus<UserGroup>>;
    /**
     * @override
     * Unassign the user group from the user.
     */
    unassign(userCode: string, userGroupCode: string): Observable<OrganizationItemStatus<UserGroup>>;
    static ɵfac: i0.ɵɵFactoryDeclaration<UserUserGroupListService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<UserUserGroupListService>;
}
