import { Component, OnInit } from '@angular/core';
import { map, switchMap } from 'rxjs/operators';
import { Budget, BudgetService, RoutingService } from '@spartacus/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'cx-budget-edit',
  templateUrl: './budget-edit.component.html',
})
export class BudgetEditComponent implements OnInit {
  budget$: Observable<Budget>;
  currentBudget: Budget;

  constructor(
    protected routingService: RoutingService,
    protected budgetsService: BudgetService
  ) {}

  ngOnInit(): void {
    this.budget$ = this.routingService.getRouterState().pipe(
      map(routingData => routingData.state.params['budgetCode']),
      switchMap(code => this.budgetsService.get(code)),
    );
    // this.budget$
    //   .pipe(take(1))
    //   .subscribe(budget => (this.currentBudget = budget));
  }
}
