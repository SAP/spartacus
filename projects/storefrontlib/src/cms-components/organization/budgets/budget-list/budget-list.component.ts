import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map, switchMap, tap } from 'rxjs/operators';

import {
  BudgetService,
  RoutingService,
  CxDatePipe,
  EntitiesModel,
  Budget,
} from '@spartacus/core';
import { AbstractListingComponent } from '../../abstract-listing/abstract-listing.component';

@Component({
  selector: 'cx-budget-list',
  templateUrl: './budget-list.component.html',
})
export class BudgetListComponent extends AbstractListingComponent
  implements OnInit {
  constructor(
    protected routingService: RoutingService,
    protected budgetsService: BudgetService,
    protected cxDate: CxDatePipe
  ) {
    super(routingService);
  }

  cxRoute = 'budgets';
  budgetsList$: Observable<any>;

  ngOnInit(): void {
    this.budgetsList$ = this.queryParams$.pipe(
      tap(queryParams => this.budgetsService.loadBudgets(queryParams)),
      switchMap(queryParams =>
        this.budgetsService.getList(queryParams).pipe(
          filter(Boolean),
          map((budgetsList: EntitiesModel<Budget>) => ({
            sorts: budgetsList.sorts,
            pagination: budgetsList.pagination,
            budgetsList: budgetsList.values.map(budget => ({
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
