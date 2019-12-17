import { Component, OnInit } from '@angular/core';
import { map, switchMap, tap } from 'rxjs/operators';
import { Budget, BudgetService, RoutingService } from '@spartacus/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'cx-budget-edit',
  templateUrl: './budget-edit.component.html',
})
export class BudgetEditComponent implements OnInit {
  budget$: Observable<Budget>;

  constructor(
    protected routingService: RoutingService,
    protected budgetsService: BudgetService
  ) {}

  ngOnInit(): void {
    this.budget$ = this.routingService.getRouterState().pipe(
      map(routingData => routingData.state.params['budgetCode']),
      tap(code => this.budgetsService.loadBudget(code)),
      switchMap(code => this.budgetsService.get(code))
    );
  }

  updateBudget(budget) {
    this.budgetsService.update(budget);
  }
}
