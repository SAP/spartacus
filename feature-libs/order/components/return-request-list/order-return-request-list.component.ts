import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import {
  isNotUndefined,
  ReturnRequestList,
  TranslationService,
} from '@spartacus/core';
import { OrderReturnRequestFacade } from '@spartacus/order/root';
import { combineLatest, Observable } from 'rxjs';
import { filter, map, take, tap } from 'rxjs/operators';

@Component({
  selector: 'cx-order-return-request-list',
  templateUrl: './order-return-request-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderReturnRequestListComponent implements OnDestroy {
  constructor(
    private returnRequestService: OrderReturnRequestFacade,
    private translation: TranslationService
  ) {}

  private PAGE_SIZE = 5;
  sortType: string;

  returnRequests$: Observable<ReturnRequestList | undefined> =
    this.returnRequestService.getOrderReturnRequestList(this.PAGE_SIZE).pipe(
      tap((requestList: ReturnRequestList | undefined) => {
        if (requestList?.pagination?.sort) {
          this.sortType = requestList.pagination.sort;
        }
      })
    );

  /**
   * When "Order Return" feature is enabled, this component becomes one tab in
   * TabParagraphContainerComponent. This can be read from TabParagraphContainer.
   */
  tabTitleParam$: Observable<number> = this.returnRequests$.pipe(
    map((returnRequests) => returnRequests?.pagination?.totalResults),
    filter(isNotUndefined),
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
