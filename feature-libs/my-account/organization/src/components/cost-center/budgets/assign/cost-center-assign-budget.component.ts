import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Table } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { CostCenterAssignBudgetListService } from './cost-center-assign-budget.service';

@Component({
  selector: 'cx-cost-center-assign-budget',
  templateUrl: './cost-center-assign-budget.component.html',
})
export class CostCenterAssignBudgetsComponent {
  code$: Observable<string> = this.activateRoute.parent.parent.params.pipe(
    map((params) => params['code'])
  );

  dataTable$: Observable<Table> = this.code$.pipe(
    switchMap((code) => this.assignService.getTable(code))
  );

  constructor(
    // we can't do without the router as the routingService is unable to
    // resolve the parent routing params. `paramsInheritanceStrategy: 'always'`
    // would actually fix that.
    protected activateRoute: ActivatedRoute,
    protected assignService: CostCenterAssignBudgetListService
  ) {}

  toggleAssign(costCenterCode: string, budgetCode: string, checked: boolean) {
    this.assignService.toggleAssign(costCenterCode, budgetCode, checked);
  }
}
