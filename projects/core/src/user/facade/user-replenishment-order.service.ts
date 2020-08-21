import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { map, tap } from 'rxjs/operators';
import { StateWithProcess } from '../../process/store/process-state';
import { OrderHistoryList } from '../../model/order.model';
import { AuthService } from '../../auth/facade/auth.service';
import { StateWithUser } from '../store/user-state';
import { UserActions } from '../store/actions/index';
import { UsersSelectors } from '../store/selectors/index';

@Injectable({
  providedIn: 'root',
})
export class UserReplenishmentOrderService {
  constructor(
    protected store: Store<StateWithUser | StateWithProcess<void>>,
    protected authService: AuthService
  ) {}

  /**
   * Returns replenishment order history list
   */
    getReplenishmentOrderHistoryList(pageSize: number): Observable<OrderHistoryList> {
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
    return this.store.pipe(select(UsersSelectors.getReplenishmentOrdersLoaded));
  }

  /**
   * Retrieves an replenishment order list
   * @param pageSize page size
   * @param currentPage current page
   * @param sort sort
   */
  loadReplenishmentOrderList(pageSize: number, currentPage ?: number, sort ?: string): void {
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
