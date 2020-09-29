import { Injectable } from '@angular/core';
import { EntitiesModel } from '@spartacus/core';
import { Budget } from '@spartacus/my-account/organization/core';
import { TableStructure } from '@spartacus/storefront';
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
    structure: TableStructure,
    code: string
  ): Observable<EntitiesModel<Budget>> {
    return super
      .load(structure, code)
      .pipe(map((budgets) => this.filterSelected(budgets)));
  }
}
