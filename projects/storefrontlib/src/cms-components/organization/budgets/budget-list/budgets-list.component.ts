import { Component, OnDestroy, OnInit } from '@angular/core';
import { combineLatest, Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import {
  BudgetService,
  Budget,
  BudgetListModel,
  RoutingService,
  TranslationService,
} from '@spartacus/core';

@Component({
  selector: 'cx-budgets-list',
  templateUrl: './budgets-list.component.html',
})
export class BudgetsListComponent implements OnInit, OnDestroy {
  constructor(
    private routing: RoutingService,
    private budgetsService: BudgetService,
    private translation: TranslationService
  ) {}

  budgetsList$: Observable<BudgetListModel>;
  isLoaded$: Observable<boolean>;

  private PAGE_SIZE = 5;

  sortType: string;

  ngOnInit(): void {
    this.budgetsList$ = this.budgetsService
      .getList({pageSize: this.PAGE_SIZE})
      .pipe(
        tap((budgetsList: BudgetListModel) => {
          console.log(budgetsList)
          if (budgetsList && budgetsList.pagination) {
            this.sortType = budgetsList.pagination.sort;
          }
        })
      );

    // this.isLoaded$ = this.budgetsService.getBudgetsProcess().pipe(map(process => process.success));
    this.isLoaded$ = of(false)
  }

  ngOnDestroy(): void {
    // this.budgetsService.clearBudgetList();
  }

  changeSortCode(sortCode: string): void {
    const event: { sortCode: string; currentPage: number } = {
      sortCode,
      currentPage: 0,
    };
    this.sortType = sortCode;
    this.fetchBudgets(event);
  }

  pageChange(page: number): void {
    const event: { sortCode: string; currentPage: number } = {
      sortCode: this.sortType,
      currentPage: page,
    };
    this.fetchBudgets(event);
  }

  goToBudgetDetail(budget: Budget): void {
    this.routing.go({
      cxRoute: 'budgetDetails',
      params: budget,
    });
  }

  getSortLabels(): Observable<{ byDate: string; byBudgetNumber: string }> {
    return combineLatest([
      this.translation.translate('sorting.date'),
      this.translation.translate('sorting.budgetNumber'),
    ]).pipe(
      map(([textByDate, textByBudgetNumber]) => {
        return {
          byDate: textByDate,
          byBudgetNumber: textByBudgetNumber,
        };
      })
    );
  }

  private fetchBudgets(event: { sortCode: string; currentPage: number }): void {
    this.budgetsService.loadBudgets({
     pageSize: this.PAGE_SIZE,
     currentPage: event.currentPage,
     sort: event.sortCode
  });
  }
}
