import { Injectable } from '@angular/core';
import { EntitiesModel } from '@spartacus/core';
import { TableService, TableStructure } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Budget } from '../../../../core/model/budget.model';
import { CostCenterService } from '../../../../core/services/cost-center.service';
import { OrganizationSubListService } from '../../../shared/organization-sub-list/organization-sub-list.service';
import { OrganizationTableType } from '../../../shared/organization.model';

@Injectable({
  providedIn: 'root',
})
export class CostCenterAssignBudgetListService extends OrganizationSubListService<
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
    const activeValues = new Map();
    return this.costCenterService
      .getBudgets(code, structure.options?.pagination)
      .pipe(tap((list) => this.notify(activeValues, list.values)));
  }

  protected notify(list: Map<string, boolean>, values: Budget[]) {
    values.forEach((value) => {
      if (list.has(value.code) && list.get(value.code) !== value.selected) {
        this.notification$.next(
          value.selected
            ? 'costCenter.budget.assigned'
            : 'costCenter.budget.unassigned'
        );
      }
      list.set(value.code, value.selected);
    });
  }
}
