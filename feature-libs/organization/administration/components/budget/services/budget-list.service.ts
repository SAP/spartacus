import { Injectable } from '@angular/core';
import { EntitiesModel, PaginationModel } from '@spartacus/core';
import {
  Budget,
  BudgetService,
} from '@spartacus/organization/administration/core';
import { TableService } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ListService } from '../../shared/list/list.service';
import { OrganizationTableType } from '../../shared/organization.model';

/**
 * Service to populate Budget data to `Table` data. Budget
 * data is driven by the table configuration, using the `OrganizationTables.BUDGET`.
 */
@Injectable({
  providedIn: 'root',
})
export class BudgetListService extends ListService<Budget> {
  protected tableType = OrganizationTableType.BUDGET;

  constructor(
    protected tableService: TableService,
    protected budgetService: BudgetService
  ) {
    super(tableService);
  }

  protected load(
    pagination: PaginationModel
  ): Observable<EntitiesModel<Budget>> {
    return this.budgetService.getList(pagination).pipe(
      filter((list) => Boolean(list)),
      map((raw) => this.convertBudgets(raw))
    );
  }

  /**
   * Populates budget data to a convenient table data model, so that we
   * can skip specific conversion in the view logic where possible.
   */
  protected convertBudgets({
    pagination,
    sorts,
    values,
  }: EntitiesModel<Budget>): EntitiesModel<Budget> {
    const budgetModels: EntitiesModel<Budget> = {
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
