import { Component, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import {
  ReplenishmentOrder,
  ReplenishmentOrderList,
  RoutingService,
  TranslationService,
  UserReplenishmentOrderService,
} from '@spartacus/core';
import { combineLatest, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'cx-replenishment-order-history',
  templateUrl: './replenishment-order-history.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReplenishmentOrderHistoryComponent implements OnDestroy {
  constructor(
    private routing: RoutingService,
    private userReplenishmentOrderService: UserReplenishmentOrderService,
    private translation: TranslationService
  ) {}

  private PAGE_SIZE = 5;
  sortType: string;

  // repelnishment orders
  replenishmentOrders$: Observable<
    ReplenishmentOrderList
  > = this.userReplenishmentOrderService
    .getReplenishmentOrderHistoryList(this.PAGE_SIZE)
    .pipe(
      tap((replenishmentOrders: ReplenishmentOrderList) => {
        if (replenishmentOrders.pagination) {
          this.sortType = replenishmentOrders.pagination.sort;
        }
      })
    );

  isLoaded$: Observable<
    boolean
  > = this.userReplenishmentOrderService.getReplenishmentOrderHistoryListSuccess();

  ngOnDestroy(): void {
    this.userReplenishmentOrderService.clearReplenishmentOrderList();
  }

  changeSortCode(sortCode: string): void {
    const event: { sortCode: string; currentPage: number } = {
      sortCode,
      currentPage: 0,
    };
    this.sortType = sortCode;
    this.fetchReplenishmentOrders(event);
  }

  pageChange(page: number): void {
    const event: { sortCode: string; currentPage: number } = {
      sortCode: this.sortType,
      currentPage: page,
    };
    this.fetchReplenishmentOrders(event);
  }

  goToOrderDetail(order: ReplenishmentOrder): void {
    this.routing.go({
      cxRoute: 'replenishmentOrderDetails',
      params: order,
    });
  }

  getSortLabels(): Observable<{
    byDate: string;
    byReplenishmentNumber: string;
    byNextOrderDate: string;
  }> {
    return combineLatest([
      this.translation.translate('sorting.date'),
      this.translation.translate('sorting.replenishmentNumber'),
      this.translation.translate('sorting.nextOrderDate'),
    ]).pipe(
      map(([textByDate, textByOrderNumber, textbyNextOrderDate]) => {
        return {
          byDate: textByDate,
          byReplenishmentNumber: textByOrderNumber,
          byNextOrderDate: textbyNextOrderDate,
        };
      })
    );
  }

  private fetchReplenishmentOrders(event: {
    sortCode: string;
    currentPage: number;
  }): void {
    this.userReplenishmentOrderService.loadReplenishmentOrderList(
      this.PAGE_SIZE,
      event.currentPage,
      event.sortCode
    );
  }
}
