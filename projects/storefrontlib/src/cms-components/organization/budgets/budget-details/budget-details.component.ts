import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map, switchMap, take, tap } from 'rxjs/operators';

import { Budget, BudgetService, RoutingService } from '@spartacus/core';

@Component({
  selector: 'cx-budget-details',
  templateUrl: './budget-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BudgetDetailsComponent implements OnInit {
  constructor(
    protected routingService: RoutingService,
    protected budgetsService: BudgetService
  ) {}

  budget$: Observable<Budget>;
  budgetCode$: Observable<string> = this.routingService
    .getRouterState()
    .pipe(map(routingData => routingData.state.params['budgetCode']));

  ngOnInit(): void {
    this.budget$ = this.budgetCode$.pipe(
      tap(code => this.budgetsService.loadBudget(code)),
      switchMap(code => this.budgetsService.get(code)),
      filter(Boolean)
    );
  }

  update(budget: Budget) {
    this.budgetCode$
      .pipe(take(1))
      .subscribe(budgetCode => this.budgetsService.update(budgetCode, budget));
  }
}
