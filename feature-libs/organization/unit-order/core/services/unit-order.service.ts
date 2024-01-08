/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { RoutingService, UserIdService } from '@spartacus/core';
import { Order, OrderHistoryList } from '@spartacus/order/root';
import { UnitOrderFacade } from '@spartacus/organization/unit-order/root';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
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
  loadOrderList(
    pageSize: number,
    currentPage?: number,
    filters?: string,
    sort?: string
  ): void {
    this.userIdService.takeUserId(true).subscribe({
      next: (userId) => {
        this.store.dispatch(
          new UnitOrderActions.LoadUnitOrders({
            userId,
            pageSize,
            currentPage,
            filters,
            sort,
          })
        );
      },
      error: () => {
        // TODO: for future releases, refactor this part to thrown errors
      },
    });
  }

  /**
   * Cleaning order list
   */
  clearOrderList(): void {
    this.store.dispatch(new UnitOrderActions.ClearUnitOrders());
  }

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
        new UnitOrderActions.LoadOrderDetails({
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
    this.store.dispatch(new UnitOrderActions.ClearOrderDetails());
  }
}
