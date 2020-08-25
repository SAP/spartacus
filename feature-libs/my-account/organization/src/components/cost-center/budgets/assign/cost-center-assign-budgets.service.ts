import { Injectable } from '@angular/core';
import { EntitiesModel } from '@spartacus/core';
import { TableService, TableStructure } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { Budget } from '../../../../core/model/budget.model';
import { CostCenterService } from '../../../../core/services/cost-center.service';
import { BaseOrganizationListService } from '../../../shared/base-organization-list.service';
import { OrganizationTableType } from '../../../shared/organization.model';

@Injectable({
  providedIn: 'root',
})
export class CostCenterAssignBudgetListService extends BaseOrganizationListService<
  Budget
> {
  protected tableType = OrganizationTableType.COST_CENTER_ASSIGN_BUDGETS;

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
    return this.costCenterService.getBudgets(
      code,
      structure.options?.pagination
    );
  }

  toggleAssign(costCenterCode: string, budgetCode: string, assign = true) {
    if (assign) {
      this.costCenterService.assignBudget(costCenterCode, budgetCode);
    } else {
      this.costCenterService.unassignBudget(costCenterCode, budgetCode);
    }
  }
}
