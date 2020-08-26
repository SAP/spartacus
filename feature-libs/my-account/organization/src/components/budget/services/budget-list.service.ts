import { Injectable } from '@angular/core';
import { EntitiesModel } from '@spartacus/core';
import { TableService, TableStructure } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Budget } from '../../../core/model';
import { BudgetService } from '../../../core/services/budget.service';
import { OrganizationListService } from '../../shared/organization-list/organization-list.service';
import { OrganizationTableType } from '../../shared/organization.model';

/**
 * UI model for the budget.
 */
export interface BudgetModel {
  code?: string;
  name?: string;
  unit?: any;
  currency?: string;
  active?: boolean;
  budget?: string;
  startDate?: string;
  endDate?: string;
}

/**
 * Service to populate Budget data to `Table` data. Budget
 * data is driven by the table configuration, using the `OrganizationTables.BUDGET`.
 */
@Injectable({
  providedIn: 'root',
})
export class BudgetListService extends OrganizationListService<BudgetModel> {
  protected tableType = OrganizationTableType.BUDGET;

  constructor(
    protected tableService: TableService,
    protected budgetService: BudgetService
  ) {
    super(tableService);
  }

  protected load(
    structure: TableStructure,
    _params?
  ): Observable<EntitiesModel<BudgetModel>> {
    const paginationConfig = structure.options?.pagination;
    return this.budgetService
      .getList(paginationConfig)
      .pipe(map((raw) => this.convertBudgets(raw)));
  }

  /**
   * Populates budget data to a convenient table data model, so that we
   * can skip specific conversion in the view logic where possible.
   */
  protected convertBudgets({
    pagination,
    sorts,
    values,
  }: EntitiesModel<Budget>): EntitiesModel<BudgetModel> {
    const budgetModels: EntitiesModel<BudgetModel> = {
      pagination,
      sorts,
      values: values.map((value: any) => ({
        ...value,
        currency: value.currency?.isocode,
        unit: value.orgUnit,
      })),
    };
    return budgetModels;
  }
}
