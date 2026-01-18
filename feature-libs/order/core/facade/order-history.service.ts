/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import {
  ProcessSelectors,
  RoutingService,
  StateWithProcess,
  UserIdService,
} from '@spartacus/core';
import {
  CancellationRequestEntryInputList,
  ConsignmentTracking,
  Order,
  OrderHistoryFacade,
  OrderHistoryList,
} from '@spartacus/order/root';
import { Observable } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';
import { OrderActions } from '../store/actions/index';
import { CANCEL_ORDER_PROCESS_ID, StateWithOrder } from '../store/order-state';
import { OrderSelectors } from '../store/selectors/index';
import { Params } from '@angular/router';

@Injectable()
export class OrderHistoryService implements OrderHistoryFacade {
  constructor(
    protected store: Store<StateWithOrder>,
    protected processStateStore: Store<StateWithProcess<void>>,
    protected userIdService: UserIdService,
    protected routingService: RoutingService
  ) {}

  /**
   * Returns an order's detail
   */
  getOrderDetails(): Observable<Order> {
    return this.store.pipe(select(OrderSelectors.getOrderDetails));
  }

  /**
   * Retrieves order's details
   *
   * @param orderCode an order code
   */
  loadOrderDetails(orderCode: string): void {
    this.userIdService.takeUserId().subscribe((userId) => {
      this.store.dispatch(
        new OrderActions.LoadOrderDetails({
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
    this.store.dispatch(new OrderActions.ClearOrderDetails());
  }

  /**
   * Returns order history list
   */
  getOrderHistoryList(): Observable<OrderHistoryList | undefined> {
    return this.store.pipe(
      select(OrderSelectors.getOrdersState),
      map((orderListState) => {
        return orderListState.value;
      })
    );
  }

  /**
   * Returns a loaded flag for order history list
   */
  getOrderHistoryListLoaded(): Observable<boolean> {
    return this.store.pipe(select(OrderSelectors.getOrdersLoaded));
  }

  /**
   * Retrieves an order list
   * @param pageSize page size
   * @param currentPage current page
   * @param sort sort
   */
  loadOrderList(pageSize: number, currentPage?: number, sort?: string): void {
    let replenishmentOrderCode: string | undefined;

    this.routingService
      .getRouterState()
      .pipe(
        switchMap((data) => {
          replenishmentOrderCode = data?.state?.params?.replenishmentOrderCode;

          return this.userIdService.takeUserId(true);
        }),
        take(1)
      )
      .subscribe((userId) => {
        this.store.dispatch(
          new OrderActions.LoadUserOrders({
            userId,
            pageSize,
            currentPage,
            sort,
            replenishmentOrderCode,
          })
        );
      });
  }

  /**
   * Cleaning order list
   */
  clearOrderList(): void {
    this.store.dispatch(new OrderActions.ClearUserOrders());
  }

  /**
   *  Returns a consignment tracking detail
   */
  getConsignmentTracking(): Observable<ConsignmentTracking> {
    return this.store.pipe(select(OrderSelectors.getConsignmentTracking));
  }

  /**
   * Retrieves consignment tracking details
   * @param orderCode an order code
   * @param consignmentCode a consignment code
   */
  loadConsignmentTracking(orderCode: string, consignmentCode: string): void {
    this.userIdService.takeUserId().subscribe((userId) => {
      this.store.dispatch(
        new OrderActions.LoadConsignmentTracking({
          userId,
          orderCode,
          consignmentCode,
        })
      );
    });
  }

  /**
   * Cleaning consignment tracking
   */
  clearConsignmentTracking(): void {
    this.store.dispatch(new OrderActions.ClearConsignmentTracking());
  }

  /*
   * Cancel an order
   */
  cancelOrder(
    orderCode: string,
    cancelRequestInput: CancellationRequestEntryInputList
  ): void {
    this.userIdService.takeUserId().subscribe((userId) => {
      this.store.dispatch(
        new OrderActions.CancelOrder({
          userId,
          orderCode,
          cancelRequestInput,
        })
      );
    });
  }

  /**
   * Returns the cancel order loading flag
   */
  getCancelOrderLoading(): Observable<boolean> {
    return this.processStateStore.pipe(
      select(ProcessSelectors.getProcessLoadingFactory(CANCEL_ORDER_PROCESS_ID))
    );
  }

  /**
   * Returns the cancel order success flag
   */
  getCancelOrderSuccess(): Observable<boolean> {
    return this.processStateStore.pipe(
      select(ProcessSelectors.getProcessSuccessFactory(CANCEL_ORDER_PROCESS_ID))
    );
  }

  /**
   * Resets the cancel order process flags
   */
  resetCancelOrderProcessState(): void {
    return this.store.dispatch(new OrderActions.ResetCancelOrderProcess());
  }

  /**
   * Returns the order details loading flag
   */
  getOrderDetailsLoading(): Observable<boolean> {
    return this.store.pipe(select(OrderSelectors.getOrderDetailsLoading));
  }

  /**
   * @deprecated: Method doesn't pass facade method's requirements (returns void or Observable)
   */
  getQueryParams(_order: Order): Params | null {
    return null;
  }
}
