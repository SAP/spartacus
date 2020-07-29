import { Injectable } from '@angular/core';
import { Budget, CostCenterService, EntitiesModel } from '@spartacus/core';
import { TableService, TableStructure } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseOrganizationListService } from '../../../shared/base-organization-list.service';
import { OrganizationTableType } from '../../../shared/organization.model';

/**
 * Service to populate Cost Center Budget data to `Table` data. The cost center
 * data is driven by the table configuration, using the `OrganizationTables.BUDGET_COST_CENTERS`.
 */
@Injectable({
  providedIn: 'root',
})
export class BudgetCostCenterListService extends BaseOrganizationListService<
  Budget
> {
  protected tableType = OrganizationTableType.BUDGET_COST_CENTERS;

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
    const config = structure.pagination;
    return this.costCenterService
      .getBudgets(code, config)
      .pipe(map((CostCenters) => this.filterSelected(CostCenters)));
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

  unassign(costCenterCode: string, costCenter: Budget) {
    this.costCenterService.unassignBudget(costCenterCode, costCenter.code);
  }
}
