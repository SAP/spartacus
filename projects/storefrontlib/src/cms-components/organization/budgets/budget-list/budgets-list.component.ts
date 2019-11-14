import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

import {
  BudgetService,
  Budget,
  BudgetListModel,
  RoutingService,
  TranslationService,
  CxDatePipe,
} from '@spartacus/core';

@Component({
  selector: 'cx-budgets-list',
  templateUrl: './budgets-list.component.html',
})
export class BudgetsListComponent implements OnInit, OnDestroy {
  constructor(
    private routing: RoutingService,
    private budgetsService: BudgetService,
    private translation: TranslationService,
    private cxDate: CxDatePipe
  ) {}
  private PAGE_SIZE = 5;
  cxRoute = 'budgetDetails';
  budgetsList$: Observable<any>;
  sortType$: BehaviorSubject<string> = new BehaviorSubject('byName');
  currentPage$: BehaviorSubject<number> = new BehaviorSubject(0);
  isLoaded$: Observable<boolean>;

  ngOnInit(): void {
    this.budgetsList$ = combineLatest([this.sortType$, this.currentPage$]).pipe(
      switchMap(([sort, currentPage]) =>
        this.budgetsService
          .getList({
            pageSize: this.PAGE_SIZE,
            sort,
            currentPage,
          })
          .pipe(
            tap((budgetsList: BudgetListModel) => {
              // will be shorter after use chain operator
              if (
                budgetsList &&
                budgetsList.pagination &&
                budgetsList.pagination.sort !== sort
              ) {
                this.sortType$.next(budgetsList.pagination.sort);
              }
              if (
                budgetsList &&
                budgetsList.pagination &&
                budgetsList.pagination.currentPage !== currentPage
              ) {
                this.currentPage$.next(budgetsList.pagination.currentPage);
              }
            }),
            map((budgetsList: BudgetListModel) => ({
              sorts: budgetsList.sorts,
              pagination: budgetsList.pagination,
              list: budgetsList.budgets.map(budget => ({
                code: budget.code,
                name: budget.name,
                amount: `${budget.budget} ${budget.currency.symbol}`,
                startEndDate: `${this.cxDate.transform(
                  budget.startDate
                )} - ${this.cxDate.transform(budget.endDate)}`,
                costCenter: budget.costCenters && budget.costCenters[0],
                parentUnit: budget.orgUnit.name,
              })),
            }))
          )
      )
    );

    // this.isLoaded$ = this.budgetsService.getBudgetsProcess().pipe(map(process => process.success));
    this.isLoaded$ = of(false);
  }

  ngOnDestroy(): void {
    // this.budgetsService.clearBudgetList();
  }

  changeSortCode(sortCode: string): void {
    this.sortType$.next(sortCode);
  }

  pageChange(page: number): void {
    this.currentPage$.next(page);
  }

  goToBudgetDetail(budget: Budget): void {
    this.routing.go({
      cxRoute: 'budgetDetails',
      params: budget,
    });
  }

  getColumns(): Observable<{
    code: string;
    name: string;
    amount: string;
    startEndDate: string;
    costCenter: string;
    parentUnit: string;
  }> {
    return combineLatest([
      this.translation.translate('budgetsList.code'),
      this.translation.translate('budgetsList.name'),
      this.translation.translate('budgetsList.amount'),
      this.translation.translate('budgetsList.startEndDate'),
      this.translation.translate('budgetsList.costCenter'),
      this.translation.translate('budgetsList.parentUnit'),
    ]).pipe(
      map(([code, name, amount, startEndDate, costCenter, parentUnit]) => ({
        code,
        name,
        amount,
        startEndDate,
        costCenter,
        parentUnit,
      }))
    );
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

  // private fetchBudgets(): void {
  //   this.budgetsService.loadBudgets({
  //     pageSize: this.PAGE_SIZE,
  //     currentPage: this.currentPage,
  //     sort: this.sortType,
  //   });
  // }
}
