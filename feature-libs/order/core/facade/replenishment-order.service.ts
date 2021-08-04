import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import {
  ProcessSelectors,
  ReplenishmentOrder,
  ReplenishmentOrderList,
  StateWithProcess,
  UserIdService,
} from '@spartacus/core';
import { ReplenishmentOrderFacade } from '@spartacus/order/root';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { OrderActions } from '../store/actions/index';
import {
  CANCEL_REPLENISHMENT_ORDER_PROCESS_ID,
  StateWithOrder,
} from '../store/order-state';
import { OrderSelectors } from '../store/selectors/index';

@Injectable()
export class ReplenishmentOrderService implements ReplenishmentOrderFacade {
  constructor(
    protected store: Store<StateWithOrder>,
    protected processStateStore: Store<StateWithProcess<void>>,
    protected userIdService: UserIdService
  ) {}

  /**
   * Returns replenishment order details for a given 'current' user
   *
   * @param replenishmentOrderCode a replenishment order code
   */
  loadReplenishmentOrderDetails(replenishmentOrderCode: string): void {
    this.userIdService.takeUserId(true).subscribe(
      (userId) => {
        this.store.dispatch(
          new OrderActions.LoadReplenishmentOrderDetails({
            userId,
            replenishmentOrderCode,
          })
        );
      },
      () => {
        // TODO: for future releases, refactor this part to thrown errors
      }
    );
  }

  /**
   * Returns a replenishment order details
   */
  getReplenishmentOrderDetails(): Observable<ReplenishmentOrder> {
    return this.store.pipe(
      select(OrderSelectors.getReplenishmentOrderDetailsValue)
    );
  }

  /**
   * Returns a replenishment order details loading flag
   */
  getReplenishmentOrderDetailsLoading(): Observable<boolean> {
    return this.store.pipe(
      select(OrderSelectors.getReplenishmentOrderDetailsLoading)
    );
  }

  /**
   * Returns a replenishment order details success flag
   */
  getReplenishmentOrderDetailsSuccess(): Observable<boolean> {
    return this.store.pipe(
      select(OrderSelectors.getReplenishmentOrderDetailsSuccess)
    );
  }

  /**
   * Returns a replenishment order details error flag
   */
  getReplenishmentOrderDetailsError(): Observable<boolean> {
    return this.store.pipe(
      select(OrderSelectors.getReplenishmentOrderDetailsError)
    );
  }

  /**
   * Clears the replenishment orders details state
   */
  clearReplenishmentOrderDetails(): void {
    this.store.dispatch(new OrderActions.ClearReplenishmentOrderDetails());
  }

  /**
   * Cancels a specific replenishment order for a given 'current' user
   *
   * @param replenishmentOrderCode a replenishment order code
   */
  cancelReplenishmentOrder(replenishmentOrderCode: string): void {
    this.userIdService.takeUserId(true).subscribe(
      (userId) => {
        this.store.dispatch(
          new OrderActions.CancelReplenishmentOrder({
            userId,
            replenishmentOrderCode,
          })
        );
      },
      () => {
        // TODO: for future releases, refactor this part to thrown errors
      }
    );
  }

  /**
   * Returns the cancel replenishment order loading flag
   */
  getCancelReplenishmentOrderLoading(): Observable<boolean> {
    return this.processStateStore.pipe(
      select(
        ProcessSelectors.getProcessLoadingFactory(
          CANCEL_REPLENISHMENT_ORDER_PROCESS_ID
        )
      )
    );
  }

  /**
   * Returns the cancel replenishment order success flag
   */
  getCancelReplenishmentOrderSuccess(): Observable<boolean> {
    return this.processStateStore.pipe(
      select(
        ProcessSelectors.getProcessSuccessFactory(
          CANCEL_REPLENISHMENT_ORDER_PROCESS_ID
        )
      )
    );
  }

  /**
   * Returns the cancel replenishment order error flag
   */
  getCancelReplenishmentOrderError(): Observable<boolean> {
    return this.processStateStore.pipe(
      select(
        ProcessSelectors.getProcessErrorFactory(
          CANCEL_REPLENISHMENT_ORDER_PROCESS_ID
        )
      )
    );
  }

  /**
   * Clears the cancel replenishment order processing state
   */
  clearCancelReplenishmentOrderProcessState(): void {
    this.store.dispatch(new OrderActions.ClearCancelReplenishmentOrder());
  }

  /**
   * Returns replenishment order history list
   */
  getReplenishmentOrderHistoryList(
    pageSize: number
  ): Observable<ReplenishmentOrderList | undefined> {
    return this.store.pipe(
      select(OrderSelectors.getReplenishmentOrdersState),
      tap((replenishmentOrderListState) => {
        const attemptedLoad =
          replenishmentOrderListState.loading ||
          replenishmentOrderListState.success ||
          replenishmentOrderListState.error;
        if (!attemptedLoad) {
          this.loadReplenishmentOrderList(pageSize);
        }
      }),
      map((replenishmentOrderListState) => replenishmentOrderListState.value)
    );
  }

  /**
   * Returns a loading flag for replenishment order history list
   */
  getReplenishmentOrderHistoryListLoading(): Observable<boolean> {
    return this.store.pipe(
      select(OrderSelectors.getReplenishmentOrdersLoading)
    );
  }

  /**
   * Returns a error flag for replenishment order history list
   */
  getReplenishmentOrderHistoryListError(): Observable<boolean> {
    return this.store.pipe(select(OrderSelectors.getReplenishmentOrdersError));
  }

  /**
   * Returns a success flag for replenishment order history list
   */
  getReplenishmentOrderHistoryListSuccess(): Observable<boolean> {
    return this.store.pipe(
      select(OrderSelectors.getReplenishmentOrdersSuccess)
    );
  }

  /**
   * Retrieves a replenishment order list
   * @param pageSize page size
   * @param currentPage current page
   * @param sort sort
   */
  loadReplenishmentOrderList(
    pageSize?: number,
    currentPage?: number,
    sort?: string
  ): void {
    this.userIdService.takeUserId(true).subscribe(
      (userId) => {
        this.store.dispatch(
          new OrderActions.LoadUserReplenishmentOrders({
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
   * Cleaning replenishment order list
   */
  clearReplenishmentOrderList(): void {
    this.store.dispatch(new OrderActions.ClearUserReplenishmentOrders());
  }
}
