import { Address, EntitiesModel, PaginationModel } from '@spartacus/core';
import { OrgUnitService } from '@spartacus/organization/administration/core';
import { TableService } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { OrganizationTableType } from '../../../../shared/organization.model';
import { SubListService } from '../../../../shared/sub-list/sub-list.service';
import * as i0 from "@angular/core";
export declare class UnitAddressListService extends SubListService<Address> {
    protected tableService: TableService;
    protected orgUnitService: OrgUnitService;
    protected tableType: OrganizationTableType;
    protected _domainType: OrganizationTableType;
    constructor(tableService: TableService, orgUnitService: OrgUnitService);
    protected load(_pagination: PaginationModel, code: string): Observable<EntitiesModel<Address> | undefined>;
    static ɵfac: i0.ɵɵFactoryDeclaration<UnitAddressListService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<UnitAddressListService>;
}
