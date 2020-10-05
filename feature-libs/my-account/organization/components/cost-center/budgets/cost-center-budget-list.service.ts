import { Injectable } from '@angular/core';
import { EntitiesModel, PaginationModel } from '@spartacus/core';
import {
  Budget,
  CostCenterService,
} from '@spartacus/my-account/organization/core';
import { TableService } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { OrganizationSubListService } from '../../shared/organization-sub-list/organization-sub-list.service';
import { OrganizationTableType } from '../../shared/organization.model';

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
    pagination: PaginationModel,
    code: string
  ): Observable<EntitiesModel<Budget>> {
    return this.costCenterService.getBudgets(code, pagination);
  }

  /**
   * @override
   * Assign budget to the cost center.
   */
  assign(costCenterCode: string, budgetCode: string) {
    this.costCenterService.assignBudget(costCenterCode, budgetCode);
  }

  /**
   * @override
   * Unassign the budget from the cost center.
   */
  unassign(costCenterCode: string, budgetCode: string) {
    this.costCenterService.unassignBudget(costCenterCode, budgetCode);
  }
}
