import { CostCenter, EntitiesModel, PaginationModel } from '@spartacus/core';
import { CostCenterService } from '@spartacus/organization/administration/core';
import { TableService } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { ListService } from '../../shared/list/list.service';
import { OrganizationTableType } from '../../shared/organization.model';
import * as i0 from "@angular/core";
/**
 * The UI model for the cost center, which is a slightly flattened version
 * of the core cost center model.
 */
export interface CostCenterModel {
    code?: string;
    name?: string;
    unit?: any;
    currency?: string;
    active?: boolean;
}
/**
 * Service to populate Cost Center data to `Table` data. The cost center
 * data is driven by the table configuration, using the `OrganizationTables.COST_CENTER`.
 */
export declare class CostCenterListService extends ListService<CostCenterModel> {
    protected tableService: TableService;
    protected costCenterService: CostCenterService;
    protected tableType: OrganizationTableType;
    constructor(tableService: TableService, costCenterService: CostCenterService);
    protected load(pagination: PaginationModel): Observable<EntitiesModel<CostCenterModel>>;
    /**
     * Populates the cost center data to a convenient table data model, so that we
     * can skip specific conversion in the view logic where possible.
     */
    protected convertCostCenters({ pagination, sorts, values, }: EntitiesModel<CostCenter>): EntitiesModel<CostCenterModel>;
    static ɵfac: i0.ɵɵFactoryDeclaration<CostCenterListService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<CostCenterListService>;
}
