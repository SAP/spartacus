import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  ReturnRequestList,
  OrderReturnRequestService,
  TranslationService,
} from '@spartacus/core';
import { Observable, combineLatest } from 'rxjs';
import { tap, map } from 'rxjs/operators';

@Component({
  selector: 'cx-order-return-requests',
  templateUrl: './order-return-requests.component.html',
})
export class OrderReturnRequestsComponent implements OnInit, OnDestroy {
  constructor(
    private returnRequestService: OrderReturnRequestService,
    private translation: TranslationService
  ) {}

  returnRequests$: Observable<ReturnRequestList>;
  isLoaded$: Observable<boolean>;
  tabTitleParam$: Observable<number>;

  private PAGE_SIZE = 5;

  sortType: string;

  ngOnInit(): void {
    this.returnRequests$ = this.returnRequestService
      .getOrderReturnRequestList(this.PAGE_SIZE)
      .pipe(
        tap((requestList: ReturnRequestList) => {
          if (requestList.pagination) {
            this.sortType = requestList.pagination.sort;
          }
        })
      );

    this.tabTitleParam$ = this.returnRequests$.pipe(
      map(returnRequests => returnRequests.pagination.totalResults)
    );
  }

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
