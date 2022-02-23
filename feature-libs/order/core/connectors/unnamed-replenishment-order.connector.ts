import { Injectable } from '@angular/core';
import {
  ReplenishmentOrder,
  ScheduleReplenishmentForm,
} from '@spartacus/order/root';
import { Observable } from 'rxjs';
import { UnnamedReplenishmentOrderAdapter } from './unnamed-replenishment-order.adapter';

@Injectable()
export class UnnamedReplenishmentOrderConnector {
  constructor(protected adapter: UnnamedReplenishmentOrderAdapter) {}

  public scheduleReplenishmentOrder(
    cartId: string,
    scheduleReplenishmentForm: ScheduleReplenishmentForm,
    termsChecked: boolean,
    userId: string
  ): Observable<ReplenishmentOrder> {
    return this.adapter.scheduleReplenishmentOrder(
      cartId,
      scheduleReplenishmentForm,
      termsChecked,
      userId
    );
  }
}
