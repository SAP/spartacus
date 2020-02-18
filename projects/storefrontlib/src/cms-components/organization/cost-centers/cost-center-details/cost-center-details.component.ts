import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map, switchMap, take, tap } from 'rxjs/operators';

import { CostCenter, CostCenterService, RoutingService } from '@spartacus/core';

@Component({
  selector: 'cx-costCenter-details',
  templateUrl: './cost-center-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CostCenterDetailsComponent implements OnInit {
  constructor(
    protected routingService: RoutingService,
    protected costCentersService: CostCenterService
  ) {}

  costCenter$: Observable<CostCenter>;
  budgets$;
  costCenterCode$: Observable<
    string
  > = this.routingService
    .getRouterState()
    .pipe(map(routingData => routingData.state.params['costCenterCode']));

  ngOnInit(): void {
    this.costCenter$ = this.costCenterCode$.pipe(
      tap(code => this.costCentersService.loadCostCenter(code)),
      switchMap(code => this.costCentersService.get(code)),
      filter(Boolean)
    );
    this.budgets$ = this.costCenterCode$.pipe(
      tap(code => this.costCentersService.loadBudgets(code, {})),
      switchMap(code => this.costCentersService.getBudgets(code, {})),
      filter(Boolean),
      tap(console.log)
    );
  }

  update(costCenter: CostCenter) {
    this.costCenterCode$
      .pipe(take(1))
      .subscribe(costCenterCode =>
        this.costCentersService.update(costCenterCode, costCenter)
      );
  }
}
