import { Component } from '@angular/core';
import { Table } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { CurrentBudgetService } from '../../services/current-budget.service';
import { BudgetCostCenterListService } from './budget-cost-center-list.service';

@Component({
  selector: 'cx-budget-cost-center-list',
  templateUrl: './budget-cost-center-list.component.html',
})
export class BudgetCostCenterListComponent {
  code$ = this.currentBudgetService.key$;
  dataTable$: Observable<Table> = this.code$.pipe(
    switchMap((code) => this.budgetCostCenterListService.getTable(code))
  );

  constructor(
    protected budgetCostCenterListService: BudgetCostCenterListService,
    protected currentBudgetService: CurrentBudgetService
  ) {}
}
