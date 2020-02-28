import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {
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
  Budget,
  CostCenterService,
  RouterState,
} from '@spartacus/core';
import { AbstractListingComponent } from '../../abstract-listing/abstract-listing.component';

@Component({
  selector: 'cx-cost-center-assign-budgets',
  templateUrl: './cost-center-assign-budgets.component.html',
})
export class CostCenterAssignBudgetsComponent extends AbstractListingComponent
  implements OnInit {
  constructor(
    protected routingService: RoutingService,
    protected costCenterService: CostCenterService,
    protected cxDate: CxDatePipe
  ) {
    super(routingService);
  }

  cxRoute = 'costCenterAssignBudgets';
  budgetsList$: Observable<any>;
  params: { code: string };

  protected costCenterCode$ = this.routingService
    .getRouterState()
    .pipe(map((routingData: RouterState) => routingData.state.params['code']));

  ngOnInit(): void {
    this.costCenterCode$
      .pipe(take(1))
      .subscribe(code => (this.params = { code }));

    this.budgetsList$ = this.queryParams$.pipe(
      withLatestFrom(this.costCenterCode$),
      tap(([queryParams, code]) =>
        this.costCenterService.loadBudgets(code, queryParams)
      ),
      switchMap(([queryParams, code]) =>
        this.costCenterService.getBudgets(code, queryParams).pipe(
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

  toggle({ row, value }) {
    if (value) {
      this.assign(row.code);
    } else {
      this.unassign(row.code);
    }
  }

  assign(budgetCode) {
    this.costCenterService.assignBudget(this.params.code, budgetCode);
  }

  unassign(budgetCode) {
    this.costCenterService.unassignBudget(this.params.code, budgetCode);
  }
}
