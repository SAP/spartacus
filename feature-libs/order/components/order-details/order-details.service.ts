/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, inject } from '@angular/core';
import { RoutingService } from '@spartacus/core';
import { Order, OrderHistoryFacade } from '@spartacus/order/root';
import { Observable } from 'rxjs';
import {
  distinctUntilChanged,
  map,
  shareReplay,
  switchMap,
  tap,
} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class OrderDetailsService {
  private orderHistoryFacade = inject(OrderHistoryFacade);
  private routingService = inject(RoutingService);

  orderCode$: Observable<string>;
  orderLoad$: Observable<{}>;

  constructor() {
    this.orderCode$ = this.routingService.getRouterState().pipe(
      map((routingData) => routingData.state.params.orderCode),
      distinctUntilChanged()
    );

    this.orderLoad$ = this.orderCode$.pipe(
      tap((orderCode) => {
        if (orderCode) {
          this.orderHistoryFacade.loadOrderDetails(orderCode);
        } else {
          this.orderHistoryFacade.clearOrderDetails();
        }
      }),
      shareReplay({ bufferSize: 1, refCount: true })
    );
  }

  isOrderDetailsLoading(): Observable<boolean> {
    return this.orderHistoryFacade.getOrderDetailsLoading();
  }

  getOrderDetails(): Observable<Order> {
    return this.orderLoad$.pipe(
      switchMap(() => this.orderHistoryFacade.getOrderDetails())
    );
  }
}
