import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {
  distinctUntilChanged,
  filter,
  map,
  switchMap,
  take,
  tap,
} from 'rxjs/operators';

import {
  BudgetService,
  RoutingService,
  CxDatePipe,
  EntitiesModel,
  B2BSearchConfig,
  θdiff as diff,
  θshallowEqualObjects as shallowEqualObjects,
  Budget,
} from '@spartacus/core';

@Component({
  selector: 'cx-budget-list',
  templateUrl: './budget-list.component.html',
})
export class BudgetListComponent implements OnInit {
  constructor(
    protected routingService: RoutingService,
    protected budgetsService: BudgetService,
    protected cxDate: CxDatePipe
  ) {}

  budgetsList$: Observable<any>;
  protected queryParams$: Observable<B2BSearchConfig>;

  protected cxRoute = 'budgets';
  protected defaultQueryParams$: B2BSearchConfig = {
    sort: 'byName',
    currentPage: 0,
    pageSize: 5,
  };

  ngOnInit(): void {
    this.queryParams$ = this.routingService
      .getRouterState()
      .pipe(map(routingData => routingData.state.queryParams));

    this.budgetsList$ = this.queryParams$.pipe(
      map(queryParams => ({
        ...this.defaultQueryParams$,
        ...queryParams,
      })),
      distinctUntilChanged(shallowEqualObjects),
      map(this.normalizeQueryParams),
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

  changeSortCode(sort: string): void {
    this.updateQueryParams({ sort });
  }

  pageChange(currentPage: number): void {
    this.updateQueryParams({ currentPage });
  }

  protected updateQueryParams(newQueryParams: Partial<B2BSearchConfig>): void {
    this.queryParams$
      .pipe(
        map(queryParams =>
          diff(this.defaultQueryParams$, { ...queryParams, ...newQueryParams })
        ),
        take(1)
      )
      .subscribe((queryParams: Partial<B2BSearchConfig>) => {
        this.routingService.go(
          {
            cxRoute: this.cxRoute,
          },
          { ...queryParams }
        );
      });
  }

  protected normalizeQueryParams({
    sort,
    currentPage,
    pageSize,
  }): B2BSearchConfig {
    return {
      sort,
      currentPage: parseInt(currentPage, 10),
      pageSize: parseInt(pageSize, 10),
    };
  }
}
