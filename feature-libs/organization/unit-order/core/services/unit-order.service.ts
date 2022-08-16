import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import {
  RoutingService,
  StateWithProcess,
  UserIdService,
} from '@spartacus/core';
import { Order, OrderHistoryList } from '@spartacus/order/root';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import {
  StateWithUnitOrder,
  UnitOrderActions,
  UnitOrderSelectors,
} from '../store';

@Injectable()
export class UnitOrderService {
  constructor(
    protected store: Store<StateWithUnitOrder>,
    protected processStateStore: Store<StateWithProcess<void>>,
    protected userIdService: UserIdService,
    protected routingService: RoutingService
  ) {}

  /**
   * Returns an order's detail
   */
  getOrderDetails(): Observable<Order> {
    return this.store.pipe(select(UnitOrderSelectors.getOrderDetails));
  }

  /**
   * Retrieves order's details
   *
   * @param orderCode an order code
   */
  loadOrderDetails(orderCode: string): void {
    this.userIdService.takeUserId().subscribe((userId) => {
      this.store.dispatch(
        new UnitOrderActions.LoadUnitOrderDetails({
          userId,
          orderCode,
        })
      );
    });
  }

  /**
   * Clears order's details
   */
  clearOrderDetails(): void {
    this.store.dispatch(new UnitOrderActions.ClearUnitOrderDetails());
  }

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
        let replenishmentOrderCode: string | undefined;

        this.routingService
          .getRouterState()
          .pipe(take(1))
          .subscribe((data) => {
            replenishmentOrderCode =
              data?.state?.params?.replenishmentOrderCode;
          })
          .unsubscribe();

        this.store.dispatch(
          new UnitOrderActions.LoadUnitOrders({
            userId,
            pageSize,
            currentPage,
            sort,
            replenishmentOrderCode,
          })
        );
      },
      () => {
        // TODO: for future releases, refactor this part to thrown errors
      }
    );
  }
}
