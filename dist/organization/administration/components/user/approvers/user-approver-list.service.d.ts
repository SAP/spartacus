import { B2BUser, EntitiesModel, PaginationModel } from '@spartacus/core';
import { B2BUserService, OrganizationItemStatus } from '@spartacus/organization/administration/core';
import { TableService } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { OrganizationTableType } from '../../shared/organization.model';
import { SubListService } from '../../shared/sub-list/sub-list.service';
import * as i0 from "@angular/core";
export declare class UserApproverListService extends SubListService<B2BUser> {
    protected tableService: TableService;
    protected userService: B2BUserService;
    protected tableType: OrganizationTableType;
    protected _domainType: OrganizationTableType;
    constructor(tableService: TableService, userService: B2BUserService);
    protected load(pagination: PaginationModel, code: string): Observable<EntitiesModel<B2BUser> | undefined>;
    /**
     * @override
     * Assign approver to the user.
     */
    assign(userCode: string, approverId: string): Observable<OrganizationItemStatus<B2BUser>>;
    /**
     * @override
     * Unassign the approver from the user.
     */
    unassign(userCode: string, approverId: string): Observable<OrganizationItemStatus<B2BUser>>;
    static ɵfac: i0.ɵɵFactoryDeclaration<UserApproverListService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<UserApproverListService>;
}
