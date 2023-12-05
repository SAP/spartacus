import { B2BUser, EntitiesModel, PaginationModel } from '@spartacus/core';
import { B2BUserService, OrganizationItemStatus, UserGroup, UserGroupService } from '@spartacus/organization/administration/core';
import { TableService } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { OrganizationTableType } from '../../shared/organization.model';
import { SubListService } from '../../shared/sub-list/sub-list.service';
import * as i0 from "@angular/core";
export declare class UserGroupUserListService extends SubListService<B2BUser> {
    protected tableService: TableService;
    protected userGroupService: UserGroupService;
    protected userService: B2BUserService;
    protected tableType: OrganizationTableType;
    protected _domainType: OrganizationTableType;
    constructor(tableService: TableService, userGroupService: UserGroupService, userService: B2BUserService);
    /**
     *
     * @override
     * Loads all b2b users.
     *
     * @param code The user group code.
     */
    protected load(pagination: PaginationModel, code: string): Observable<EntitiesModel<B2BUser> | undefined>;
    /**
     * @override
     * Assign user to the user group.
     */
    assign(userGroupCode: string, customerId: string): Observable<OrganizationItemStatus<B2BUser>>;
    /**
     * @override
     * Unassigns the user from the user group.
     */
    unassign(userGroupCode: string, customerId: string): Observable<OrganizationItemStatus<B2BUser>>;
    unassignAllMembers(userGroupCode: string): Observable<OrganizationItemStatus<UserGroup>>;
    static ɵfac: i0.ɵɵFactoryDeclaration<UserGroupUserListService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<UserGroupUserListService>;
}
