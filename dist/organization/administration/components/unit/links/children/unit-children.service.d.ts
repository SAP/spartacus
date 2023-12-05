import { EntitiesModel, PaginationModel } from '@spartacus/core';
import { B2BUnitNode, OrgUnitService } from '@spartacus/organization/administration/core';
import { TableService } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { SubListService } from '../../../shared/sub-list/sub-list.service';
import { OrganizationTableType } from '../../../shared/organization.model';
import * as i0 from "@angular/core";
export declare class UnitChildrenService extends SubListService<B2BUnitNode> {
    protected tableService: TableService;
    protected orgUnitService: OrgUnitService;
    protected tableType: OrganizationTableType;
    protected _domainType: OrganizationTableType;
    constructor(tableService: TableService, orgUnitService: OrgUnitService);
    protected load(_pagination: PaginationModel, code: string): Observable<EntitiesModel<B2BUnitNode>>;
    static ɵfac: i0.ɵɵFactoryDeclaration<UnitChildrenService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<UnitChildrenService>;
}
