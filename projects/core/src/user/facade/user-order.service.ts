import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { ConsignmentTracking } from '../../model/consignment-tracking.model';
import { Order, OrderHistoryList } from '../../model/order.model';
import { USERID_CURRENT } from '../../occ/utils/occ-constants';
import * as fromProcessStore from '../../process/store/process-state';
import * as fromStore from '../store/index';

@Injectable({
  providedIn: 'root',
})
export class UserOrderService {
  constructor(
    protected store: Store<
      fromStore.StateWithUser | fromProcessStore.StateWithProcess<void>
    >
  ) {}

  /**
   * Returns an order's detail
   */
  getOrderDetails(): Observable<Order> {
    return this.store.pipe(select(fromStore.getOrderDetails));
  }

  /**
   * Retrieves order's details
   *
   * @param orderCode an order code
   */
  loadOrderDetails(orderCode: string): void {
    this.store.dispatch(
      new fromStore.LoadOrderDetails({
        userId: USERID_CURRENT,
        orderCode: orderCode,
      })
    );
  }

  /**
   * Clears order's details
   */
  clearOrderDetails(): void {
    this.store.dispatch(new fromStore.ClearOrderDetails());
  }

  /**
   * Returns order history list
   */
  getOrderHistoryList(pageSize: number): Observable<OrderHistoryList> {
    return this.store.pipe(
      select(fromStore.getOrdersState),
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
    return this.store.pipe(select(fromStore.getOrdersLoaded));
  }

  /**
   * Retrieves an order list
   * @param pageSize page size
   * @param currentPage current page
   * @param sort sort
   */
  loadOrderList(pageSize: number, currentPage?: number, sort?: string): void {
    this.store.dispatch(
      new fromStore.LoadUserOrders({
        userId: USERID_CURRENT,
        pageSize: pageSize,
        currentPage: currentPage,
        sort: sort,
      })
    );
  }

  /**
   * Cleaning order list
   */
  clearOrderList(): void {
    this.store.dispatch(new fromStore.ClearUserOrders());
  }

  /**
   *  Returns a consignment tracking detail
   */
  getConsignmentTracking(): Observable<ConsignmentTracking> {
    return this.store.pipe(select(fromStore.getConsignmentTracking));
  }

  /**
   * Retrieves consignment tracking details
   * @param orderCode an order code
   * @param consignmentCode a consignment code
   */
  loadConsignmentTracking(orderCode: string, consignmentCode: string): void {
    this.store.dispatch(
      new fromStore.LoadConsignmentTracking({
        orderCode: orderCode,
        consignmentCode: consignmentCode,
      })
    );
  }

  /**
   * Cleaning consignment tracking
   */
  clearConsignmentTracking(): void {
    this.store.dispatch(new fromStore.ClearConsignmentTracking());
  }
}
