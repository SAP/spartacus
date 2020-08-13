import { Component } from '@angular/core';
import { Table } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { RoutingParamService } from '../../../routing-param.service';
import { BudgetCostCenterListService } from './budget-cost-center-list.service';

@Component({
  selector: 'cx-budget-cost-center-list',
  templateUrl: './budget-cost-center-list.component.html',
})
export class BudgetCostCenterListComponent {
  code$: Observable<string> = this.paramRoutingService.params$.pipe(
    map((params) => params['budgetKey'])
  );

  dataTable$: Observable<Table> = this.code$.pipe(
    switchMap((code) => this.budgetCostCenterListService.getTable(code))
  );

  constructor(
    protected paramRoutingService: RoutingParamService,
    protected budgetCostCenterListService: BudgetCostCenterListService
  ) {}
}
