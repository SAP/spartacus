import { Injectable } from '@angular/core';
import { EntitiesModel } from '@spartacus/core';
import { TableService, TableStructure } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Budget } from '../../../../core/model/budget.model';
import { CostCenterService } from '../../../../core/services/cost-center.service';
import { OrganizationSubListService } from '../../../shared/organization-sub-list/organization-sub-list.service';
import { OrganizationTableType } from '../../../shared/organization.model';

/**
 * Service to populate Cost Center Budget data to `Table` data. The cost center
 * data is driven by the table configuration, using the `OrganizationTables.COST_CENTER_BUDGETS`.
 */
@Injectable({
  providedIn: 'root',
})
export class CostCenterBudgetListService extends OrganizationSubListService<
  Budget
> {
  protected tableType = OrganizationTableType.COST_CENTER_BUDGETS;
  protected domainType = OrganizationTableType.BUDGET;

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
    sorts,
    values,
  }: EntitiesModel<Budget>): EntitiesModel<Budget> {
    return {
      sorts,
      values: values.filter((value) => value.selected),
    };
  }
}
