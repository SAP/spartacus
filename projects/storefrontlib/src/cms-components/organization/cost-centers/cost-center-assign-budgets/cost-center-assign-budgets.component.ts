import { Component, OnInit } from '@angular/core';
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
  θdiff as diff,
  θshallowEqualObjects as shallowEqualObjects,
  Budget,
  CostCenterService,
  B2BSearchConfig,
} from '@spartacus/core';

@Component({
  selector: 'cx-cost-center-assign-budgets',
  templateUrl: './cost-center-assign-budgets.component.html',
})
export class CostCenterAssignBudgetsComponent implements OnInit {
  constructor(
    protected routingService: RoutingService,
    protected costCenterService: CostCenterService,
    protected cxDate: CxDatePipe
  ) {}

  budgetsList$: Observable<any>;
  protected params$: Observable<B2BSearchConfig>;

  protected defaultParams: B2BSearchConfig = {
    sort: 'byName',
    currentPage: 0,
    pageSize: 5,
  };

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
      withLatestFrom(this.costCenterCode$),
      tap(([params, code]) => this.costCenterService.loadBudgets(code, params)),
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

  changeSortCode(sort: string): void {
    this.updateQueryParams({ sort });
  }

  pageChange(currentPage: number): void {
    this.updateQueryParams({ currentPage });
  }

  protected updateQueryParams(newParams: Partial<B2BSearchConfig>): void {
    this.params$
      .pipe(
        map(params => diff(this.defaultParams, { ...params, ...newParams })),
        take(1)
      )
      .subscribe((params: Partial<B2BSearchConfig>) => {
        this.routingService.go(
          {
            cxRoute: 'budgets',
          },
          { ...params }
        );
      });
  }

  protected normalizeParams({ sort, currentPage, pageSize }): B2BSearchConfig {
    return {
      sort,
      currentPage: parseInt(currentPage, 10),
      pageSize: parseInt(pageSize, 10),
    };
  }
}
