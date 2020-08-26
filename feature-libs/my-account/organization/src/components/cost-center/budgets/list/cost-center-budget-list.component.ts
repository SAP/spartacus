import { Component } from '@angular/core';
import { Table } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Budget } from '../../../../core/model';
import { CurrentCostCenterService } from '../../services/current-cost-center.service';
import { CostCenterBudgetListService } from './cost-center-budget-list.service';

@Component({
  selector: 'cx-cost-center-budget-list',
  templateUrl: './cost-center-budget-list.component.html',
})
export class CostCenterBudgetListComponent {
  /**
   * The code of the current cost center.
   */
  code$ = this.currentCostCenterService$.key$;

  dataTable$: Observable<Table> = this.code$.pipe(
    switchMap((code) => this.costCenterBudgetListService.getTable(code))
  );

  constructor(
    protected currentCostCenterService$: CurrentCostCenterService,
    protected costCenterBudgetListService: CostCenterBudgetListService
  ) {}

  unassign(costCenterCode: string, model: Budget) {
    this.costCenterBudgetListService.unassign(costCenterCode, model);
  }
}
