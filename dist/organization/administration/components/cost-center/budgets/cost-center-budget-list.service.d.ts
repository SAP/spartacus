import { EntitiesModel, PaginationModel } from '@spartacus/core';
import { Budget, BudgetService, CostCenterService, OrganizationItemStatus } from '@spartacus/organization/administration/core';
import { TableService } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { OrganizationTableType } from '../../shared/organization.model';
import { SubListService } from '../../shared/sub-list/sub-list.service';
import * as i0 from "@angular/core";
export declare class CostCenterBudgetListService extends SubListService<Budget> {
    protected tableService: TableService;
    protected costCenterService: CostCenterService;
    protected budgetService: BudgetService;
    protected tableType: OrganizationTableType;
    protected _domainType: OrganizationTableType;
    constructor(tableService: TableService, costCenterService: CostCenterService, budgetService: BudgetService);
    protected load(pagination: PaginationModel, code: string): Observable<EntitiesModel<Budget> | undefined>;
    /**
     * @override
     * Assign budget to the cost center.
     */
    assign(costCenterCode: string, budgetCode: string): Observable<OrganizationItemStatus<Budget>>;
    /**
     * @override
     * Unassign the budget from the cost center.
     */
    unassign(costCenterCode: string, budgetCode: string): Observable<OrganizationItemStatus<Budget>>;
    static ɵfac: i0.ɵɵFactoryDeclaration<CostCenterBudgetListService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<CostCenterBudgetListService>;
}
