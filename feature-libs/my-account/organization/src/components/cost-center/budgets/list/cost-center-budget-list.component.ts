import { Component } from '@angular/core';
import { Table } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { pluck, switchMap, take } from 'rxjs/operators';
import { CurrentCostCenterService } from '../../current-cost-center-code';
import { CostCenterBudgetListService } from './cost-center-budget-list.service';

@Component({
  selector: 'cx-cost-center-budget-list',
  templateUrl: './cost-center-budget-list.component.html',
})
export class CostCenterBudgetListComponent {
  code$ = this.currentCostCenterService$.get().pipe(pluck('code'));

  dataTable$: Observable<Table> = this.code$.pipe(
    switchMap((code) => this.costCenterBudgetListService.getTable(code))
  );

  constructor(
    protected currentCostCenterService$: CurrentCostCenterService,
    protected costCenterBudgetListService: CostCenterBudgetListService
  ) {}

  unassign(model) {
    this.code$
      .pipe(take(1))
      .subscribe((code) =>
        this.costCenterBudgetListService.unassign(code, model)
      );
  }
}
