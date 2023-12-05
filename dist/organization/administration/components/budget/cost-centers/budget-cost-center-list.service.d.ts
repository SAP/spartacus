import { CostCenter, EntitiesModel, PaginationModel } from '@spartacus/core';
import { Budget, BudgetService } from '@spartacus/organization/administration/core';
import { TableService } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { OrganizationTableType } from '../../shared/organization.model';
import { SubListService } from '../../shared/sub-list/sub-list.service';
import * as i0 from "@angular/core";
export declare class BudgetCostCenterListService extends SubListService<Budget> {
    protected tableService: TableService;
    protected budgetService: BudgetService;
    protected tableType: OrganizationTableType;
    protected _domainType: OrganizationTableType;
    constructor(tableService: TableService, budgetService: BudgetService);
    protected load(_pagination: PaginationModel, code: string): Observable<EntitiesModel<CostCenter>>;
    /**
     * As we can't filter with the backend API, we do this client side.
     */
    protected filterSelected({ pagination, sorts, values, }: EntitiesModel<CostCenter>): EntitiesModel<CostCenter>;
    static ɵfac: i0.ɵɵFactoryDeclaration<BudgetCostCenterListService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<BudgetCostCenterListService>;
}
