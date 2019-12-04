import { Component, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import {
  ReturnRequestList,
  OrderReturnRequestService,
  TranslationService,
} from '@spartacus/core';
import { Observable, combineLatest } from 'rxjs';
import { tap, map, filter, take } from 'rxjs/operators';

@Component({
  selector: 'cx-order-return-request-list',
  templateUrl: './order-return-request-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderReturnRequestListComponent implements OnDestroy {
  constructor(
    private returnRequestService: OrderReturnRequestService,
    private translation: TranslationService
  ) {}

  private PAGE_SIZE = 5;
  sortType: string;

  returnRequests$: Observable<
    ReturnRequestList
  > = this.returnRequestService.getOrderReturnRequestList(this.PAGE_SIZE).pipe(
    tap((requestList: ReturnRequestList) => {
      if (requestList.pagination) {
        this.sortType = requestList.pagination.sort;
      }
    })
  );

  /**
   * When "Order Return" feature is enabled, this component becomes one tab in
   * TabParagraphContainerComponent. This can be read from TabParagraphContainer.
   */
  tabTitleParam$: Observable<number> = this.returnRequests$.pipe(
    map(returnRequests => returnRequests.pagination.totalResults),
    filter(totalResults => totalResults !== undefined),
    take(1)
  );

  ngOnDestroy(): void {
    this.returnRequestService.clearOrderReturnRequestList();
  }

  changeSortCode(sortCode: string): void {
    const event: { sortCode: string; currentPage: number } = {
      sortCode,
      currentPage: 0,
    };
    this.sortType = sortCode;
    this.fetchReturnRequests(event);
  }

  pageChange(page: number): void {
    const event: { sortCode: string; currentPage: number } = {
      sortCode: this.sortType,
      currentPage: page,
    };
    this.fetchReturnRequests(event);
  }

  getSortLabels(): Observable<{ byDate: string; byRMA: string }> {
    return combineLatest([
      this.translation.translate('sorting.date'),
      this.translation.translate('sorting.rma'),
    ]).pipe(
      map(([textByDate, textByRma]) => {
        return {
          byDate: textByDate,
          byRMA: textByRma,
        };
      })
    );
  }

  private fetchReturnRequests(event: {
    sortCode: string;
    currentPage: number;
  }): void {
    this.returnRequestService.loadOrderReturnRequestList(
      this.PAGE_SIZE,
      event.currentPage,
      event.sortCode
    );
  }
}
