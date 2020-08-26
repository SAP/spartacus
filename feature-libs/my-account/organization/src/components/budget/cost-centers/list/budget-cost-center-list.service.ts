import { Injectable } from '@angular/core';
import { CostCenter, EntitiesModel } from '@spartacus/core';
import { TableService, TableStructure } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Budget } from '../../../../core/model/budget.model';
import { BudgetService } from '../../../../core/services/budget.service';
import { OrganizationListService } from '../../../shared/organization-list/organization-list.service';
import { OrganizationTableType } from '../../../shared/organization.model';

/**
 * Service to populate Cost Center Budget data to `Table` data. The cost center
 * data is driven by the table configuration, using the `OrganizationTables.BUDGET_COST_CENTERS`.
 */
@Injectable({
  providedIn: 'root',
})
export class BudgetCostCenterListService extends OrganizationListService<
  Budget
> {
  protected tableType = OrganizationTableType.BUDGET_COST_CENTERS;

  constructor(
    protected tableService: TableService,
    protected budgetService: BudgetService
  ) {
    super(tableService);
  }

  protected load(
    _structure: TableStructure,
    code: string
  ): Observable<EntitiesModel<CostCenter>> {
    return this.budgetService
      .getCostCenters(code)
      .pipe(map((costCenter) => this.filterSelected(costCenter)));
  }

  /**
   * As we can't filter with the backend API, we do this client side.
   */
  protected filterSelected({
    pagination,
    sorts,
    values,
  }: EntitiesModel<CostCenter>): EntitiesModel<CostCenter> {
    return {
      pagination,
      sorts,
      values: values.filter((value) => value.active),
    };
  }
}
