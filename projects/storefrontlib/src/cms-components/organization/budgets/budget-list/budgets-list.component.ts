import { Component, OnInit } from '@angular/core';
import { combineLatest, Observable, of } from 'rxjs';
import {
  distinctUntilChanged,
  filter,
  map,
  switchMap,
  take,
} from 'rxjs/operators';

import {
  BudgetService,
  Budget,
  BudgetListModel,
  RoutingService,
  TranslationService,
  CxDatePipe,
  BudgetSearchConfig,
} from '@spartacus/core';
import {
  resolveKeyAndValueBy,
  resolveObjectBy,
} from '../../../../../../core/src/util/resolveObject';
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
    protected translation: TranslationService,
    protected cxDate: CxDatePipe
  ) {}

  cxRoute = 'budgetDetails';
  budgetsList$: Observable<any>;
  isLoaded$: Observable<boolean>;
  params$: Observable<BudgetSearchConfig>;
  defaultParams: BudgetSearchConfig = {
    sort: 'byName',
    currentPage: 0,
    pageSize: 5,
  };

  private columns = {
    code: 'budgetsList.code',
    name: 'budgetsList.name',
    amount: 'budgetsList.amount',
    startEndDate: 'budgetsList.startEndDate',
    parentUnit: 'budgetsList.parentUnit',
  };

  private sortLabels = {
    byUnitName: 'budgetsList.sorting.byUnitName',
    byName: 'budgetsList.sorting.byName',
    byCode: 'budgetsList.sorting.byCode',
    byValue: 'budgetsList.sorting.byValue',
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
      distinctUntilChanged((a, b) => shallowEqualObjects(a, b)),
      map(this.normalizeParams),
      switchMap(params =>
        this.budgetsService.getList(params).pipe(
          filter(budgetsList => Boolean(budgetsList)),
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

    // this.isLoaded$ = this.budgetsService.getBudgetsProcess().pipe(map(process => process.success));
    this.isLoaded$ = of(false);
    // this.getSortLabels2()
    //   .subscribe(console.log)
    //   .unsubscribe();
    // this.getColumns2()
    //   .subscribe(console.log)
    //   .unsubscribe();
  }

  changeSortCode(sort: string): void {
    this.updateQueryParams({ sort });
  }

  pageChange(currentPage: number): void {
    this.updateQueryParams({ currentPage });
  }

  updateQueryParams(newParams: Partial<BudgetSearchConfig>): void {
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
      cxRoute: 'budgetDetails',
      params: budget,
    });
  }

  getColumns(): Observable<Array<{ key: string; value: string }>> {
    return combineLatest([
      this.translation.translate('budgetsList.code'),
      this.translation.translate('budgetsList.name'),
      this.translation.translate('budgetsList.amount'),
      this.translation.translate('budgetsList.startEndDate'),
      this.translation.translate('budgetsList.parentUnit'),
    ]).pipe(
      map(([code, name, amount, startEndDate, parentUnit]) => [
        { key: 'code', value: code },
        { key: 'name', value: name },
        { key: 'amount', value: amount },
        { key: 'startEndDate', value: startEndDate },
        { key: 'parentUnit', value: parentUnit },
      ])
    );
  }

  getColumns2(): Observable<Array<{ key: string; value: string }>> {
    return resolveKeyAndValueBy(this.columns, this.translation.translate); // errors
    // return resolveKeyAndValueBy(this.columns, text => of(text.toUpperCase()); // ok
    // return resolveKeyAndValueBy(this.columns, text => this.translation.translate(text)); // nothing happens
  }

  getSortLabels(): Observable<{
    byUnitName: string;
    byName: string;
    byCode: string;
    byValue: string;
  }> {
    return combineLatest([
      this.translation.translate('budgetsList.sorting.byUnitName'),
      this.translation.translate('budgetsList.sorting.byName'),
      this.translation.translate('budgetsList.sorting.byCode'),
      this.translation.translate('budgetsList.sorting.byValue'),
    ]).pipe(
      map(([byUnitName, byName, byCode, byValue]) => ({
        byUnitName,
        byName,
        byCode,
        byValue,
      }))
    );
  }

  getSortLabels2(): Observable<{
    byUnitName: string;
    byName: string;
    byCode: string;
    byValue: string;
  }> {
    return resolveObjectBy(this.sortLabels, this.translation.translate); // errors
    // return resolveObjectBy(this.sortLabels, text => of(text.toUpperCase()); // ok
    // return resolveObjectBy(this.sortLabels, text => this.translation.translate(text)); // nothing happens
  }

}
