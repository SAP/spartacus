import { Injectable } from '@angular/core';
import { EntitiesModel } from '@spartacus/core';
import { TableService, TableStructure } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Budget } from '../../../../core/model/budget.model';
import { CostCenterService } from '../../../../core/services/cost-center.service';
import { OrganizationListService } from '../../../shared/organization-list/organization-list.service';
import { OrganizationTableType } from '../../../shared/organization.model';

/**
 * Service to populate Cost Center Budget data to `Table` data. The cost center
 * data is driven by the table configuration, using the `OrganizationTables.COST_CENTER_BUDGETS`.
 */
@Injectable({
  providedIn: 'root',
})
export class CostCenterBudgetListService extends OrganizationListService<
  Budget
> {
  protected tableType = OrganizationTableType.COST_CENTER_BUDGETS;

  constructor(
    protected tableService: TableService,
    protected costCenterService: CostCenterService
  ) {
    super(tableService);
  }

  protected load(
    structure: TableStructure,
    code: string
  ): Observable<EntitiesModel<Budget>> {
    const config = structure.options?.pagination;
    return this.costCenterService
      .getBudgets(code, config)
      .pipe(map((budgets) => this.filterSelected(budgets)));
  }

  /**
   * As we can't filter with the backend API, we do this client side.
   */
  protected filterSelected({
    pagination,
    sorts,
    values,
  }: EntitiesModel<Budget>): EntitiesModel<Budget> {
    return {
      pagination,
      sorts,
      values: values.filter((value) => value.selected),
    };
  }

  unassign(costCenterCode: string, budget: Budget) {
    this.costCenterService.unassignBudget(costCenterCode, budget.code);
  }
}
