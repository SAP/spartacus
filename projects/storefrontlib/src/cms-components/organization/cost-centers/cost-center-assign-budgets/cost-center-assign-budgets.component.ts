import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import {
  distinctUntilChanged,
  filter,
  map,
  switchMap,
  take,
  tap,
  withLatestFrom,
} from 'rxjs/operators';

import {
  RoutingService,
  CxDatePipe,
  EntitiesModel,
  θshallowEqualObjects as shallowEqualObjects,
  Budget,
  CostCenterService,
} from '@spartacus/core';
import { BudgetListComponent } from '../../budgets/budget-list/budget-list.component';

@Component({
  selector: 'cx-cost-center-assign-budgets',
  templateUrl: './cost-center-assign-budgets.component.html',
})
export class CostCenterAssignBudgetsComponent extends BudgetListComponent {
  constructor(
    protected routingService: RoutingService,
    protected costCenterService: CostCenterService,
    protected cxDate: CxDatePipe
  ) {
    super(routingService, costCenterService, cxDate);
  }

  budgetsList$: Observable<any>;

  costCenterCode$: Observable<
    string
  > = this.routingService
    .getRouterState()
    .pipe(map(routingData => routingData.state.params['costCenterCode']));

  ngOnInit(): void {
    this.params$ = this.routingService
      .getRouterState()
      .pipe(map(routingData => routingData.state.queryParams));

    this.budgetsList$ = this.params$.pipe(
      map(params => ({
        ...this.defaultParams,
        ...params,
      })),
      distinctUntilChanged(shallowEqualObjects),
      map(this.normalizeParams),
      tap(params => this.costCenterService.loadBudgets(params)),
      withLatestFrom(this.costCenterCode$),
      switchMap(([params, code]) =>
        this.costCenterService.getBudgets(code, params).pipe(
          filter(Boolean),
          map((budgetsList: EntitiesModel<Budget>) => ({
            sorts: budgetsList.sorts,
            pagination: budgetsList.pagination,
            budgetsList: budgetsList.values.map(budget => ({
              assign: budget.selected,
              code: budget.code,
              name: budget.name,
              amount: `${budget.budget} ${budget.currency &&
                budget.currency.symbol}`,
              startEndDate: `${this.cxDate.transform(
                budget.startDate
              )} - ${this.cxDate.transform(budget.endDate)}`,
              parentUnit: budget.orgUnit && budget.orgUnit.name,
              orgUnitId: budget.orgUnit && budget.orgUnit.uid,
            })),
          }))
        )
      )
    );
  }
}
