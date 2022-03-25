import { Injectable } from '@angular/core';
import {
  ReplenishmentOrder,
  ScheduleReplenishmentForm,
} from '@spartacus/order/root';
import { Observable } from 'rxjs';
import { ScheduledReplenishmentOrderAdapter } from './scheduled-replenishment-order.adapter';

@Injectable()
export class ScheduledReplenishmentOrderConnector {
  constructor(protected adapter: ScheduledReplenishmentOrderAdapter) {}

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
