import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

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

  ngOnInit(): void {
    this.budget$ = this.routingService.getRouterState().pipe(
      map(routingData => routingData.state.params['budgetCode']),
      switchMap(code => this.budgetsService.get(code))
    );
  }
}
