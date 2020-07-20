import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import {
  OrderApprovalService,
  OrderHistoryList,
  TranslationService,
  UserOrderService,
} from '@spartacus/core';
import { combineLatest, Observable } from 'rxjs';
import { filter, map, take, tap } from 'rxjs/operators';

@Component({
  selector: 'cx-order-approval-list',
  templateUrl: './order-approval-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderApprovalListComponent implements OnDestroy {
  constructor(
    private userOrderService: UserOrderService,
    private orderApprovalService: OrderApprovalService,
    private translation: TranslationService
  ) {}

  private PAGE_SIZE = 5;
  sortType: string;

  orderApprovals$ = this.orderApprovalService.getList({ pageSize: 5 }).pipe(
    tap((approvalList) =>
      tap((orders: OrderHistoryList) => {
        if (orders.pagination) {
          this.sortType = approvalList.pagination.sort;
        }
      })
    )
  );

  orders$: Observable<
    OrderHistoryList
  > = this.userOrderService.getOrderHistoryList(this.PAGE_SIZE).pipe(
    tap((orders: OrderHistoryList) => {
      if (orders.pagination) {
        this.sortType = orders.pagination.sort;
      }
    })
  );

  isLoaded$: Observable<
    boolean
  > = this.userOrderService.getOrderHistoryListLoaded();

  /**
   * When "Order Return" feature is enabled, this component becomes one tab in
   * TabParagraphContainerComponent. This can be read from TabParagraphContainer.
   */
  tabTitleParam$: Observable<number> = this.orders$.pipe(
    map((order) => order.pagination.totalResults),
    filter((totalResults) => totalResults !== undefined),
    take(1)
  );

  ngOnDestroy(): void {
    this.userOrderService.clearOrderList();
  }

  changeSortCode(sortCode: string): void {
    const event: { sortCode: string; currentPage: number } = {
      sortCode,
      currentPage: 0,
    };
    this.sortType = sortCode;
    this.fetchApprovals(event);
  }

  pageChange(page: number): void {
    const event: { sortCode: string; currentPage: number } = {
      sortCode: this.sortType,
      currentPage: page,
    };
    this.fetchApprovals(event);
  }

  getSortLabels(): Observable<{ byDate: string; byOrderNumber: string }> {
    return combineLatest([
      this.translation.translate('sorting.date'),
      this.translation.translate('sorting.orderNumber'),
    ]).pipe(
      map(([textByDate, textByOrderNumber]) => {
        return {
          byDate: textByDate,
          byOrderNumber: textByOrderNumber,
        };
      })
    );
  }

  private fetchApprovals(event: {
    sortCode: string;
    currentPage: number;
  }): void {
    this.orderApprovalService.loadOrderApprovals({
      pageSize: this.PAGE_SIZE,
      currentPage: event.currentPage,
      sort: event.sortCode,
    });

    this.orderApprovals$ = this.orderApprovalService.getList({
      pageSize: this.PAGE_SIZE,
      currentPage: event.currentPage,
      sort: event.sortCode,
    });
  }
}
