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
  Budget,
  BudgetListModel,
  RoutingService,
  CxDatePipe,
  BudgetSearchConfig,
} from '@spartacus/core';

import {
  diff,
  shallowEqualObjects,
} from '../../../../../../core/src/util/compare-equal-objects';

@Component({
  selector: 'cx-budgets-list',
  templateUrl: './budgets-list.component.html',
})
export class BudgetsListComponent implements OnInit {
  constructor(
    protected routingService: RoutingService,
    protected budgetsService: BudgetService,
    protected cxDate: CxDatePipe
  ) {}

  readonly cxRoute = 'budgetDetails';
  budgetsList$: Observable<any>;
  private params$: Observable<BudgetSearchConfig>;

  protected defaultParams: BudgetSearchConfig = {
    sort: 'byName',
    currentPage: 0,
    pageSize: 5,
  };

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
      tap(params => this.budgetsService.loadBudgets(params)),
      switchMap(params =>
        this.budgetsService.getList(params).pipe(
          filter(Boolean),
          map((budgetsList: BudgetListModel) => ({
            sorts: budgetsList.sorts,
            pagination: budgetsList.pagination,
            budgetsList: budgetsList.budgets.map(budget => ({
              code: budget.code,
              name: budget.name,
              amount: `${budget.budget} ${budget.currency.symbol}`,
              startEndDate: `${this.cxDate.transform(
                budget.startDate
              )} - ${this.cxDate.transform(budget.endDate)}`,
              parentUnit: budget.orgUnit.name,
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

  private updateQueryParams(newParams: Partial<BudgetSearchConfig>): void {
    this.params$
      .pipe(
        map(params => diff(this.defaultParams, { ...params, ...newParams })),
        take(1)
      )
      .subscribe((params: Partial<BudgetSearchConfig>) => {
        this.routingService.go(
          {
            cxRoute: 'budgets',
          },
          { ...params }
        );
      });
  }

  private normalizeParams({ sort, currentPage, pageSize }): BudgetSearchConfig {
    return {
      sort,
      currentPage: parseInt(currentPage, 10),
      pageSize: parseInt(pageSize, 10),
    };
  }

  goToBudgetDetail(budget: Budget): void {
    this.routingService.go({
      cxRoute: this.cxRoute,
      params: budget,
    });
  }
}
