import { Injectable } from '@angular/core';
import { B2BSearchConfig, Budget, CostCenterService } from '@spartacus/core';
import { Table, TableService, TableStructure } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
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

  protected load(
    structure: TableStructure,
    code: string
  ): Observable<Table<Budget>> {
    const config: B2BSearchConfig = structure.pagination;
    return this.costCenterService
      .getBudgets(code, config)
      .pipe(map((raw) => this.populateData(structure, raw)));
  }

  toggleAssign(costCenterCode: string, budgetCode: string, assign: boolean) {
    if (assign) {
      this.costCenterService.assignBudget(costCenterCode, budgetCode);
    } else {
      this.costCenterService.unassignBudget(costCenterCode, budgetCode);
    }
  }
}
