import { Component, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import {
  // ReplenishmentOrder,
  ReplenishmentOrderList,
  UserReplenishmentOrderService,
} from '@spartacus/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'cx-replenishment-order-history',
  templateUrl: './replenishment-order-history.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReplenishmentOrderHistoryComponent implements OnDestroy {
  constructor(
    private userReplenishmentOrderService: UserReplenishmentOrderService
  ) {}

  private PAGE_SIZE = 5;
  sortType: string;

  // repelnishmet orders
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

  // private fetchOrders(event: { sortCode: string; currentPage: number }): void {
  //     this.userReplenishmentOrderService.loadReplenishmentOrderList(
  //         this.PAGE_SIZE,
  //         event.currentPage,
  //         event.sortCode
  //     );
  // }

  ngOnDestroy(): void {
    this.userReplenishmentOrderService.clearReplenishmentOrderList();
  }
}
