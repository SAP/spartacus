import { Component, OnInit } from '@angular/core';
import { Params } from '@angular/router';
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
  RouterState,
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
  params: { code: string };
  protected queryParams$: Observable<B2BSearchConfig>;
  protected costCenterCode$ = this.routingService
    .getRouterState()
    .pipe(
      map(
        (routingData: RouterState) => routingData.state.params['costCenterCode']
      )
    );
  protected cxRoute = 'costCenterAssignBudgets';
  protected defaultQueryParams: B2BSearchConfig = {
    sort: 'byName',
    currentPage: 0,
    pageSize: 5,
  };

  ngOnInit(): void {
    this.queryParams$ = this.routingService.getRouterState().pipe(
      map((routingData: RouterState) => routingData.state.queryParams),
      map((queryParams: Params) => ({
        ...this.defaultQueryParams,
        ...queryParams,
      })),
      distinctUntilChanged(shallowEqualObjects),
      map(this.normalizeQueryParams)
    );

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
          diff(this.defaultQueryParams, { ...queryParams, ...newQueryParams })
        ),
        take(1)
      )
      .subscribe((queryParams: Partial<B2BSearchConfig>) => {
        this.routingService.go(
          {
            cxRoute: this.cxRoute,
            params: this.params,
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
