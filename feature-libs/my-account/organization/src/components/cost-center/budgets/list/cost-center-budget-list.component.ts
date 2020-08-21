import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RoutingService } from '@spartacus/core';
import { Table } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';
import { CostCenterBudgetListService } from './cost-center-budget-list.service';

@Component({
  selector: 'cx-cost-center-budget-list',
  templateUrl: './cost-center-budget-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CostCenterBudgetListComponent {
  /**
   * The code of the current cost center.
   */
  code$ = this.routingService
    .getParams()
    .pipe(map((params) => params['costCenterKey']));

  dataTable$: Observable<Table> = this.code$.pipe(
    switchMap((code) => this.costCenterBudgetListService.getTable(code))
  );

  constructor(
    protected routingService: RoutingService,
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
