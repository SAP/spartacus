import { Injectable } from '@angular/core';
import { EntitiesModel } from '@spartacus/core';
import { TableService, TableStructure } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { Budget } from '../../../../core/model/budget.model';
import { CostCenterService } from '../../../../core/services/cost-center.service';
import { OrganizationListService } from '../../../shared/organization-list/organization-list.service';
import { OrganizationTableType } from '../../../shared/organization.model';

@Injectable({
  providedIn: 'root',
})
export class CostCenterAssignBudgetListService extends OrganizationListService<
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
    structure: TableStructure,
    code: string
  ): Observable<EntitiesModel<Budget>> {
    return this.costCenterService.getBudgets(
      code,
      structure.options?.pagination
    );
  }
}
