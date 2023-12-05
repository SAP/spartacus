import { B2BUser, EntitiesModel, PaginationModel } from '@spartacus/core';
import { OrgUnitService } from '@spartacus/organization/administration/core';
import { TableService } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { OrganizationTableType } from '../../../../shared/organization.model';
import { SubListService } from '../../../../shared/sub-list/sub-list.service';
import * as i0 from "@angular/core";
export declare class UnitUserListService extends SubListService<B2BUser> {
    protected tableService: TableService;
    protected unitService: OrgUnitService;
    protected tableType: OrganizationTableType;
    protected _domainType: OrganizationTableType;
    constructor(tableService: TableService, unitService: OrgUnitService);
    protected load(pagination: PaginationModel, code: string): Observable<EntitiesModel<B2BUser> | undefined>;
    static ɵfac: i0.ɵɵFactoryDeclaration<UnitUserListService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<UnitUserListService>;
}
