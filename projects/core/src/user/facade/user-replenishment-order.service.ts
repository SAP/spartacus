import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AuthService } from '../../auth/facade/auth.service';
import { ReplenishmentOrder, ReplenishmentOrderList } from '../../model/replenishment-order.model';
import { OCC_USER_ID_ANONYMOUS } from '../../occ/utils/occ-constants';
import { StateWithProcess } from '../../process/store/process-state';
import {
  getProcessErrorFactory,
  getProcessLoadingFactory,
  getProcessSuccessFactory,
} from '../../process/store/selectors/process.selectors';
import { UserActions } from '../store/actions/index';
import { UsersSelectors } from '../store/selectors/index';
import {
  CANCEL_REPLENISHMENT_ORDER_PROCESS_ID,
  StateWithUser,
} from '../store/user-state';

@Injectable({
  providedIn: 'root',
})
export class UserReplenishmentOrderService {
  constructor(
    protected store: Store<StateWithUser | StateWithProcess<void>>,
    protected authService: AuthService
  ) { }

  /**
   * Returns replenishment order details for a given 'current' user
   *
   * @param replenishmentOrderCode a replenishment order code
   */
  loadReplenishmentOrderDetails(replenishmentOrderCode: string): void {
    this.authService.invokeWithUserId((userId) => {
      if (userId !== OCC_USER_ID_ANONYMOUS) {
        this.store.dispatch(
          new UserActions.LoadReplenishmentOrderDetails({
            userId,
            replenishmentOrderCode,
          })
        );
      }
    });
  }

  /**
   * Returns a replenishment order details
   */
  getReplenishmentOrderDetails(): Observable<ReplenishmentOrder> {
    return this.store.pipe(
      select(UsersSelectors.getReplenishmentOrderDetailsValue)
    );
  }

  /**
   * Returns a replenishment order details loading flag
   */
  getReplenishmentOrderDetailsLoading(): Observable<boolean> {
    return this.store.pipe(
      select(UsersSelectors.getReplenishmentOrderDetailsLoading)
    );
  }

  /**
   * Returns a replenishment order details success flag
   */
  getReplenishmentOrderDetailsSuccess(): Observable<boolean> {
    return this.store.pipe(
      select(UsersSelectors.getReplenishmentOrderDetailsSuccess)
    );
  }

  /**
   * Returns a replenishment order details error flag
   */
  getReplenishmentOrderDetailsError(): Observable<boolean> {
    return this.store.pipe(
      select(UsersSelectors.getReplenishmentOrderDetailsError)
    );
  }

  /**
   * Clears the replenishment orders details state
   */
  clearReplenishmentOrderDetails(): void {
    this.store.dispatch(new UserActions.ClearReplenishmentOrderDetails());
  }

  /**
   * Cancels a specific replenishment order for a given 'current' user
   *
   * @param replenishmentOrderCode a replenishment order code
   */
  cancelReplenishmentOrder(replenishmentOrderCode: string): void {
    this.authService.invokeWithUserId((userId) => {
      if (userId !== OCC_USER_ID_ANONYMOUS) {
        this.store.dispatch(
          new UserActions.CancelReplenishmentOrder({
            userId,
            replenishmentOrderCode,
          })
        );
      }
    });
  }

  /**
   * Returns the cancel replenishment order loading flag
   */
  getCancelReplenishmentOrderLoading(): Observable<boolean> {
    return this.store.pipe(
      select(getProcessLoadingFactory(CANCEL_REPLENISHMENT_ORDER_PROCESS_ID))
    );
  }

  /**
   * Returns the cancel replenishment order success flag
   */
  getCancelReplenishmentOrderSuccess(): Observable<boolean> {
    return this.store.pipe(
      select(getProcessSuccessFactory(CANCEL_REPLENISHMENT_ORDER_PROCESS_ID))
    );
  }

  /**
   * Returns the cancel replenishment order error flag
   */
  getCancelReplenishmentOrderError(): Observable<boolean> {
    return this.store.pipe(
      select(getProcessErrorFactory(CANCEL_REPLENISHMENT_ORDER_PROCESS_ID))
    );
  }

  /**
   * Clears the cancel replenishment order processing state
   */
  clearReplenishmentOrderProcessState(): void {
    this.store.dispatch(new UserActions.ClearReplenishmentOrder());
  }

  /**
     * Returns replenishment order history list
     */
  getReplenishmentOrderHistoryList(
    pageSize: number
  ): Observable<ReplenishmentOrderList> {
    return this.store.pipe(
      select(UsersSelectors.getReplenishmentOrdersState),
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
   * Returns a loaded flag for replenishment order history list
   */
  getReplenishmentOrderHistoryListLoaded(): Observable<boolean> {
    console.log(
      'from service ',
      this.store.pipe(select(UsersSelectors.getReplenishmentOrdersLoaded))
    );
    return this.store.pipe(select(UsersSelectors.getReplenishmentOrdersLoaded));
  }

  /**
   * Retrieves an replenishment order list
   * @param pageSize page size
   * @param currentPage current page
   * @param sort sort
   */
  loadReplenishmentOrderList(
    pageSize: number,
    currentPage?: number,
    sort?: string
  ): void {
    this.authService.invokeWithUserId((userId) => {
      this.store.dispatch(
        new UserActions.LoadUserReplenishmentOrders({
          userId,
          pageSize,
          currentPage,
          sort,
        })
      );
    });
  }

  /**
   * Cleaning order list
   */
  clearReplenishmentOrderList(): void {
    this.store.dispatch(new UserActions.ClearUserReplenishmentOrders());
  }

}