import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import {
  BudgetListModel,
  RoutingService,
  // TranslationService,
} from '@spartacus/core';

@Component({
  selector: 'cx-table',
  templateUrl: './table.component.html',
})
export class TableComponent implements OnInit, OnDestroy {
  constructor(
    private routing: RoutingService,
    // private translation: TranslationService
  ) {}

  @Input()
  pageSize = 5;

  @Input()
  budgetsList$: Observable<BudgetListModel>;

  @Input()
  sortType$: BehaviorSubject<string>;

  @Input()
  currentPage$: BehaviorSubject<number> ;

  @Input()
  isLoaded$: Observable<boolean>;

  @Input()
  cxRoute: string;

  @Input()
  header: string;

  ngOnInit(): void {

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

  goToDetail(params): void {
    this.routing.go({
      cxRoute: this.cxRoute,
      params,
    });
  }

  // getSortLabels(): Observable<{ byUnitName: string; byName: string; byCode: string; byValue: string }> {
  //   return combineLatest([
  //     this.translation.translate('budgetsList.sorting.byUnitName'),
  //     this.translation.translate('budgetsList.sorting.byName'),
  //     this.translation.translate('budgetsList.sorting.byCode'),
  //     this.translation.translate('budgetsList.sorting.byValue'),
  //   ]).pipe(
  //     map(([textByUnitName, textByName, textByCode, textByValue]) => {
  //       return {
  //         byUnitName: textByUnitName,
  //         byName: textByName,
  //         byCode: textByCode,
  //         byValue: textByValue,
  //       };
  //     })
  //   );
  // }

  // private fetchBudgets(): void {
  //   this.budgetsService.loadBudgets({
  //     pageSize: this.PAGE_SIZE,
  //     currentPage: this.currentPage,
  //     sort: this.sortType,
  //   });
  // }
}
