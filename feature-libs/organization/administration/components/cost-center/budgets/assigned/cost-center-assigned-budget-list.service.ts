import { Injectable } from '@angular/core';
import { EntitiesModel, PaginationModel } from '@spartacus/core';
import { Budget } from '@spartacus/organization/administration/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { OrganizationTableType } from '../../../shared/organization.model';
import { CostCenterBudgetListService } from '../cost-center-budget-list.service';

@Injectable({
  providedIn: 'root',
})
export class CostCenterAssignedBudgetListService extends CostCenterBudgetListService {
  protected tableType = OrganizationTableType.COST_CENTER_ASSIGNED_BUDGETS;

  protected load(
    pagination: PaginationModel,
    code: string
  ): Observable<EntitiesModel<Budget>> {
    return super
      .load(pagination, code)
      .pipe(map((budgets) => this.filterSelected(budgets)));
  }
}
