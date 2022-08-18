import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { RoutingService, UserIdService } from '@spartacus/core';
import { OrderHistoryList } from '@spartacus/order/root';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { UnitOrderFacade } from '../../root/facade/unit-order.facade';
import {
  StateWithUnitOrder,
  UnitOrderActions,
  UnitOrderSelectors,
} from '../store';

@Injectable({ providedIn: 'root' })
export class UnitOrderService implements UnitOrderFacade {
  constructor(
    protected store: Store<StateWithUnitOrder>,
    protected userIdService: UserIdService,
    protected routingService: RoutingService
  ) {}

  /**
   * Returns order history list
   */
  getOrderHistoryList(
    pageSize: number
  ): Observable<OrderHistoryList | undefined> {
    return this.store.pipe(
      select(UnitOrderSelectors.getOrdersState),
      tap((orderListState) => {
        const attemptedLoad =
          orderListState.loading ||
          orderListState.success ||
          orderListState.error;
        if (!attemptedLoad) {
          this.loadOrderList(pageSize);
        }
      }),
      map((orderListState) => orderListState.value)
    );
  }

  /**
   * Returns a loaded flag for order history list
   */
  getOrderHistoryListLoaded(): Observable<boolean> {
    return this.store.pipe(select(UnitOrderSelectors.getOrdersLoaded));
  }

  /**
   * Retrieves an order list
   * @param pageSize page size
   * @param currentPage current page
   * @param sort sort
   */
  loadOrderList(pageSize: number, currentPage?: number, sort?: string): void {
    this.userIdService.takeUserId(true).subscribe(
      (userId) => {
        this.store.dispatch(
          new UnitOrderActions.LoadUnitOrders({
            userId,
            pageSize,
            currentPage,
            sort,
          })
        );
      },
      () => {
        // TODO: for future releases, refactor this part to thrown errors
      }
    );
  }

  /**
   * Cleaning order list
   */
  clearOrderList(): void {
    this.store.dispatch(new UnitOrderActions.ClearUnitOrders());
  }
}
