import { EntitiesModel } from '@spartacus/core';
import { B2BUnitNode, B2BUnitTreeNode, OrgUnitService } from '@spartacus/organization/administration/core';
import { TableService } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { ListService } from '../../shared/list/list.service';
import { OrganizationTableType } from '../../shared/organization.model';
import { UnitItemService } from './unit-item.service';
import { UnitTreeService } from './unit-tree.service';
import * as i0 from "@angular/core";
/**
 * Service to populate Unit data to `Table` data. Unit
 * data is driven by the table configuration, using the `OrganizationTables.UNIT`.
 */
export declare class UnitListService extends ListService<B2BUnitTreeNode> {
    protected tableService: TableService;
    protected unitService: OrgUnitService;
    protected unitItemService: UnitItemService;
    protected unitTreeService: UnitTreeService;
    protected tableType: OrganizationTableType;
    constructor(tableService: TableService, unitService: OrgUnitService, unitItemService: UnitItemService, unitTreeService: UnitTreeService);
    protected load(): Observable<EntitiesModel<B2BUnitTreeNode> | undefined>;
    protected convertListItem(unit: B2BUnitNode | undefined, depthLevel?: number, pagination?: {
        totalResults: number;
    }): EntitiesModel<B2BUnitTreeNode> | undefined;
    key(): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<UnitListService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<UnitListService>;
}
