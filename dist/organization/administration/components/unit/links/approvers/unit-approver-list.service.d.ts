import { B2BUser, EntitiesModel, PaginationModel } from '@spartacus/core';
import { B2BUserService, OrganizationItemStatus, OrgUnitService } from '@spartacus/organization/administration/core';
import { TableService } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { OrganizationTableType } from '../../../shared/organization.model';
import { SubListService } from '../../../shared/sub-list/sub-list.service';
import * as i0 from "@angular/core";
export declare class UnitApproverListService extends SubListService<B2BUser> {
    protected tableService: TableService;
    protected unitService: OrgUnitService;
    protected userService: B2BUserService;
    protected tableType: OrganizationTableType;
    protected _domainType: OrganizationTableType;
    constructor(tableService: TableService, unitService: OrgUnitService, userService: B2BUserService);
    protected load(pagination: PaginationModel, code: string): Observable<EntitiesModel<B2BUser> | undefined>;
    /**
     * @override
     * Assign budget to the cost center.
     */
    assign(unitId: string, customerId: string): Observable<OrganizationItemStatus<B2BUser>>;
    /**
     * @override
     * Unassign the budget from the cost center.
     */
    unassign(unitId: string, customerId: string): Observable<OrganizationItemStatus<B2BUser>>;
    static ɵfac: i0.ɵɵFactoryDeclaration<UnitApproverListService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<UnitApproverListService>;
}
