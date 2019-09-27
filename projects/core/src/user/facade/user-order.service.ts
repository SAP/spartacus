import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { AuthService } from '../../auth/facade/auth.service';
import { ConsignmentTracking } from '../../model/consignment-tracking.model';
import { Order, OrderHistoryList } from '../../model/order.model';
import { StateWithProcess } from '../../process/store/process-state';
import { UserActions } from '../store/actions/index';
import { UsersSelectors } from '../store/selectors/index';
import { StateWithUser } from '../store/user-state';

@Injectable({
  providedIn: 'root',
})
export class UserOrderService {
  constructor(
    store: Store<StateWithUser | StateWithProcess<void>>,
    // tslint:disable-next-line:unified-signatures
    authService: AuthService
  );
  /**
   * @deprecated since version 1.2
   *  Use constructor(store: Store<StateWithUser | StateWithProcess<void>>,
   *  authService: AuthService) instead
   */
  constructor(store: Store<StateWithUser | StateWithProcess<void>>);
  constructor(
    protected store: Store<StateWithUser | StateWithProcess<void>>,
    protected authService?: AuthService
  ) {}

  /**
   * Returns an order's detail
   */
  getOrderDetails(): Observable<Order> {
    return this.store.pipe(select(UsersSelectors.getOrderDetails));
  }

  /**
   * Retrieves order's details
   *
   * @param orderCode an order code
   */
  loadOrderDetails(orderCode: string): void {
    this.authService
      .getOccUserId()
      .pipe(take(1))
      .subscribe(occUserId =>
        this.store.dispatch(
          new UserActions.LoadOrderDetails({
            userId: occUserId,
            orderCode: orderCode,
          })
        )
      )
      .unsubscribe();
  }

  /**
   * Clears order's details
   */
  clearOrderDetails(): void {
    this.store.dispatch(new UserActions.ClearOrderDetails());
  }

  /**
   * Returns order history list
   */
  getOrderHistoryList(pageSize: number): Observable<OrderHistoryList> {
    return this.store.pipe(
      select(UsersSelectors.getOrdersState),
      tap(orderListState => {
        const attemptedLoad =
          orderListState.loading ||
          orderListState.success ||
          orderListState.error;
        if (!attemptedLoad) {
          this.loadOrderList(pageSize);
        }
      }),
      map(orderListState => orderListState.value)
    );
  }

  /**
   * Returns a loaded flag for order history list
   */
  getOrderHistoryListLoaded(): Observable<boolean> {
    return this.store.pipe(select(UsersSelectors.getOrdersLoaded));
  }

  /**
   * Retrieves an order list
   * @param pageSize page size
   * @param currentPage current page
   * @param sort sort
   */
  loadOrderList(pageSize: number, currentPage?: number, sort?: string): void {
    this.authService
      .getOccUserId()
      .pipe(take(1))
      .subscribe(occUserId =>
        this.store.dispatch(
          new UserActions.LoadUserOrders({
            userId: occUserId,
            pageSize: pageSize,
            currentPage: currentPage,
            sort: sort,
          })
        )
      )
      .unsubscribe();
  }

  /**
   * Cleaning order list
   */
  clearOrderList(): void {
    this.store.dispatch(new UserActions.ClearUserOrders());
  }

  /**
   *  Returns a consignment tracking detail
   */
  getConsignmentTracking(): Observable<ConsignmentTracking> {
    return this.store.pipe(select(UsersSelectors.getConsignmentTracking));
  }

  /**
   * Retrieves consignment tracking details
   * @param orderCode an order code
   * @param consignmentCode a consignment code
   */
  loadConsignmentTracking(orderCode: string, consignmentCode: string): void {
    this.store.dispatch(
      new UserActions.LoadConsignmentTracking({
        orderCode: orderCode,
        consignmentCode: consignmentCode,
      })
    );
  }

  /**
   * Cleaning consignment tracking
   */
  clearConsignmentTracking(): void {
    this.store.dispatch(new UserActions.ClearConsignmentTracking());
  }
}
