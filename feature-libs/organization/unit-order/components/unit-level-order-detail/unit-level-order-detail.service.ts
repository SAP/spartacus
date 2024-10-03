/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { RoutingService } from '@spartacus/core';
import { Order } from '@spartacus/order/root';
import { Observable } from 'rxjs';
import {
  distinctUntilChanged,
  map,
  shareReplay,
  switchMap,
  tap,
} from 'rxjs/operators';
import { UnitOrderFacade } from '@spartacus/organization/unit-order/root';

@Injectable({
  providedIn: 'root',
})
export class UnitLevelOrderDetailService {
  orderCode$: Observable<string>;
  orderLoad$: Observable<string>;

  constructor(
    private unitOrderFacade: UnitOrderFacade,
    private routingService: RoutingService
  ) {
    this.orderCode$ = this.routingService.getRouterState().pipe(
      map((routingData) => routingData.state.params.orderCode),
      distinctUntilChanged()
    );

    this.orderLoad$ = this.orderCode$.pipe(
      tap((orderCode) => {
        if (orderCode) {
          this.unitOrderFacade.loadOrderDetails(orderCode);
        } else {
          this.unitOrderFacade.clearOrderDetails();
        }
      }),
      shareReplay({ bufferSize: 1, refCount: true })
    );
  }

  getOrderDetails(): Observable<Order> {
    return this.orderLoad$.pipe(
      switchMap(() => this.unitOrderFacade.getOrderDetails())
    );
  }
}
