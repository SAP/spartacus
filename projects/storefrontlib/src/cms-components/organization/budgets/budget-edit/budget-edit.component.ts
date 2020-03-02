import { Component, OnInit } from '@angular/core';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { Budget, BudgetService, RoutingService } from '@spartacus/core';

@Component({
  selector: 'cx-budget-edit',
  templateUrl: './budget-edit.component.html',
})
export class BudgetEditComponent implements OnInit {
  budget$: Observable<Budget>;
  budgetCode$: Observable<string> = this.routingService
    .getRouterState()
    .pipe(map(routingData => routingData.state.params['code']));

  constructor(
    protected routingService: RoutingService,
    protected budgetsService: BudgetService
  ) {}

  ngOnInit(): void {
    this.budget$ = this.budgetCode$.pipe(
      tap(code => this.budgetsService.loadBudget(code)),
      switchMap(code => this.budgetsService.get(code))
    );
  }

  updateBudget(budget: Budget) {
    this.budgetCode$
      .pipe(take(1))
      .subscribe(budgetCode => this.budgetsService.update(budgetCode, budget));
    this.routingService.go({
      cxRoute: 'budgetDetails',
      params: budget,
    });
  }
}
