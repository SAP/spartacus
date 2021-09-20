import { Injectable } from '@angular/core';
import {
  ReplenishmentOrder,
  RoutingService,
  UserReplenishmentOrderService,
} from '@spartacus/core';
import { Observable } from 'rxjs';
import {
  distinctUntilChanged,
  map,
  shareReplay,
  switchMap,
  tap,
} from 'rxjs/operators';

/**
 * @deprecated since 4.2 - use order lib instead
 */
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
        this.userReplenishmentOrderService.loadReplenishmentOrderDetails(
          replenishmentOrderCode
        );
      } else {
        this.userReplenishmentOrderService.clearReplenishmentOrderDetails();
      }
    }),
    shareReplay({ bufferSize: 1, refCount: true })
  );

  constructor(
    protected routingService: RoutingService,
    protected userReplenishmentOrderService: UserReplenishmentOrderService
  ) {}

  getOrderDetails(): Observable<ReplenishmentOrder> {
    return this.replenishmentOrderLoad$.pipe(
      switchMap((_) =>
        this.userReplenishmentOrderService.getReplenishmentOrderDetails()
      )
    );
  }
}
