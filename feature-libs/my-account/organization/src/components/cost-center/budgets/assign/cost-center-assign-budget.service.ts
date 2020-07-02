import { Injectable } from '@angular/core';
import { B2BSearchConfig, Budget, CostCenterService } from '@spartacus/core';
import { TableService } from '@spartacus/storefront';
import { first } from 'rxjs/operators';
import { BaseOrganizationListService } from '../../../shared/organization-list.service';
import { OrganizationTableType } from '../../../shared/organization.model';

@Injectable({
  providedIn: 'root',
})
export class CostCenterAssignBudgetListService extends BaseOrganizationListService<
  Budget
> {
  protected tableType = OrganizationTableType.COST_CENTER_ASSIGN_BUDGET;

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
      .pipe(first((d) => Boolean(d)))
      .subscribe((dataset) => {
        this.dataset$.next([...value, ...dataset.values]);
      });
  }

  toggleAssign(costCenterCode: string, budgetCode: string, assign: boolean) {
    if (assign) {
      this.costCenterService.assignBudget(costCenterCode, budgetCode);
    } else {
      this.costCenterService.unassignBudget(costCenterCode, budgetCode);
    }
  }
}
