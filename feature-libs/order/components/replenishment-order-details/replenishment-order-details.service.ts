/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, inject } from '@angular/core';
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
  protected routingService = inject(RoutingService);
  protected replenishmentOrderHistoryFacade = inject(ReplenishmentOrderHistoryFacade);

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

  getOrderDetails(): Observable<ReplenishmentOrder> {
    return this.replenishmentOrderLoad$.pipe(
      switchMap((_) =>
        this.replenishmentOrderHistoryFacade.getReplenishmentOrderDetails()
      )
    );
  }
}
