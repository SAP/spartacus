import { Injectable } from '@angular/core';
import { EntitiesModel } from '@spartacus/core';
import { TableService, TableStructure } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { BaseOrganizationListService } from '../../../shared/base-organization-list.service';
import { OrganizationTableType } from '../../../shared/organization.model';
import {
  Budget,
  CostCenterService,
} from '@spartacus/my-account/organization/core';

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
    return this.costCenterService.getBudgets(code, structure.pagination);
  }

  toggleAssign(costCenterCode: string, budgetCode: string, assign = true) {
    if (assign) {
      this.costCenterService.assignBudget(costCenterCode, budgetCode);
    } else {
      this.costCenterService.unassignBudget(costCenterCode, budgetCode);
    }
  }
}
