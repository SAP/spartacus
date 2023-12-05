import { B2BUser, EntitiesModel, PaginationModel } from '@spartacus/core';
import { OrgUnitService } from '@spartacus/organization/administration/core';
import { TableService } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { SubListService } from '../../../shared/sub-list/sub-list.service';
import { OrganizationTableType } from '../../../shared/organization.model';
import * as i0 from "@angular/core";
export declare class UnitCostCenterListService extends SubListService<B2BUser> {
    protected tableService: TableService;
    protected unitService: OrgUnitService;
    protected tableType: OrganizationTableType;
    protected _domainType: OrganizationTableType;
    constructor(tableService: TableService, unitService: OrgUnitService);
    protected load(_pagination: PaginationModel, code: string): Observable<EntitiesModel<B2BUser>>;
    static ɵfac: i0.ɵɵFactoryDeclaration<UnitCostCenterListService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<UnitCostCenterListService>;
}
