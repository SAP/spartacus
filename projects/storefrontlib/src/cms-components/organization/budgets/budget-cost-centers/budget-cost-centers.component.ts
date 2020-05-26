import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map, switchMap, tap } from 'rxjs/operators';
import {
  BudgetService,
  RoutingService,
  CostCenter,
  Budget,
} from '@spartacus/core';

@Component({
  selector: 'cx-budget-cost-centers',
  templateUrl: './budget-cost-centers.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BudgetCostCentersComponent implements OnInit {
  data$: Observable<CostCenter[]>;
  code$: Observable<string> = this.routingService
    .getRouterState()
    .pipe(map((routingData) => routingData.state.params['code']));

  constructor(
    protected routingService: RoutingService,
    protected budgetsService: BudgetService
  ) {}

  ngOnInit(): void {
    this.data$ = this.code$.pipe(
      tap((code) => this.budgetsService.loadBudget(code)),
      switchMap((code) => this.budgetsService.get(code)),
      filter(Boolean),
      map((budget: Budget) => budget.costCenters ?? [])
    );
  }
}
