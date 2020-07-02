import { Injectable } from '@angular/core';
import { B2BSearchConfig, Budget, CostCenterService } from '@spartacus/core';
import { TableService } from '@spartacus/storefront';
import { first, map } from 'rxjs/operators';
import { BaseOrganizationListService } from '../../../shared/organization-list.service';
import { OrganizationTableType } from '../../../shared/organization.model';

/**
 * Service to populate Cost Center Budget data to `Table` data. The cost center
 * data is driven by the table configuration, using the `OrganizationTables.COST_CENTER_BUDGETS`.
 */
@Injectable({
  providedIn: 'root',
})
export class CostCenterBudgetListService extends BaseOrganizationListService<
  Budget
> {
  protected tableType = OrganizationTableType.COST_CENTER_BUDGETS;

  constructor(
    protected tableService: TableService,
    protected costCenterService: CostCenterService
  ) {
    super(tableService);
  }

  protected load(config: B2BSearchConfig, code: string): void {
    const value =
      config.infiniteScroll && config.currentPage > 0
        ? this.dataset$.value
        : [];

    this.costCenterService
      .getBudgets(code, config)
      .pipe(
        first((d) => Boolean(d)),
        map((data) => data.values),
        map((budgets: Budget[]) => budgets.filter((budget) => budget.selected))
      )
      .subscribe((budgets) => {
        this.dataset$.next([...value, ...budgets]);
      });
  }
}
