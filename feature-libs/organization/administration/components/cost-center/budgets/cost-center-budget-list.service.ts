import { Injectable } from '@angular/core';
import { EntitiesModel, PaginationModel } from '@spartacus/core';
import {
  Budget,
  BudgetService,
  CostCenterService,
} from '@spartacus/organization/administration/core';
import { TableService } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { OrganizationSubListService } from '../../shared/organization-sub-list/organization-sub-list.service';
import { OrganizationTableType } from '../../shared/organization.model';
import { OrganizationItemStatus } from '../../../core/model/organization-item-status';

@Injectable({
  providedIn: 'root',
})
export class CostCenterBudgetListService extends OrganizationSubListService<
  Budget
> {
  protected tableType = OrganizationTableType.COST_CENTER_BUDGETS;
  protected _domainType = OrganizationTableType.BUDGET;

  constructor(
    protected tableService: TableService,
    protected costCenterService: CostCenterService,
    protected budgetService: BudgetService
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
  assign(
    costCenterCode: string,
    budgetCode: string
  ): Observable<OrganizationItemStatus<Budget>> {
    this.costCenterService.assignBudget(costCenterCode, budgetCode);
    return this.budgetService.getLoadingStatus(budgetCode);
  }

  /**
   * @override
   * Unassign the budget from the cost center.
   */
  unassign(
    costCenterCode: string,
    budgetCode: string
  ): Observable<OrganizationItemStatus<Budget>> {
    this.costCenterService.unassignBudget(costCenterCode, budgetCode);
    return this.budgetService.getLoadingStatus(budgetCode);
  }
}
