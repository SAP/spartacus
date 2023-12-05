import { EntitiesModel, PaginationModel } from '@spartacus/core';
import { Budget, BudgetService } from '@spartacus/organization/administration/core';
import { TableService } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { ListService } from '../../shared/list/list.service';
import { OrganizationTableType } from '../../shared/organization.model';
import * as i0 from "@angular/core";
/**
 * Service to populate Budget data to `Table` data. Budget
 * data is driven by the table configuration, using the `OrganizationTables.BUDGET`.
 */
export declare class BudgetListService extends ListService<Budget> {
    protected tableService: TableService;
    protected budgetService: BudgetService;
    protected tableType: OrganizationTableType;
    constructor(tableService: TableService, budgetService: BudgetService);
    protected load(pagination: PaginationModel): Observable<EntitiesModel<Budget>>;
    /**
     * Populates budget data to a convenient table data model, so that we
     * can skip specific conversion in the view logic where possible.
     */
    protected convertBudgets({ pagination, sorts, values, }: EntitiesModel<Budget>): EntitiesModel<Budget>;
    static ɵfac: i0.ɵɵFactoryDeclaration<BudgetListService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<BudgetListService>;
}
