/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { RoutingService } from '@spartacus/core';
import {
  ReplenishmentOrder,
  ReplenishmentOrderHistoryFacade,
} from '@spartacus/order/root';
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
export class ReplenishmentOrderDetailsService {
  protected replenishmentOrderCode$ = this.routingService.getRouterState().pipe(
    map((routingData) => routingData.state.params.replenishmentOrderCode),
    distinctUntilChanged()
  );

  protected replenishmentOrderLoad$ = this.replenishmentOrderCode$.pipe(
    tap((replenishmentOrderCode: string) => {
      if (Boolean(replenishmentOrderCode)) {
        this.replenishmentOrderHistoryFacade.loadReplenishmentOrderDetails(
          replenishmentOrderCode
        );
      } else {
        this.replenishmentOrderHistoryFacade.clearReplenishmentOrderDetails();
      }
    }),
    shareReplay({ bufferSize: 1, refCount: true })
  );

  constructor(
    protected routingService: RoutingService,
    protected replenishmentOrderHistoryFacade: ReplenishmentOrderHistoryFacade
  ) {}

  getOrderDetails(): Observable<ReplenishmentOrder> {
    return this.replenishmentOrderLoad$.pipe(
      switchMap((_) =>
        this.replenishmentOrderHistoryFacade.getReplenishmentOrderDetails()
      )
    );
  }
}
