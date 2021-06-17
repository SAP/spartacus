import { Injectable } from '@angular/core';
import { ReplenishmentOrder, ScheduleReplenishmentForm } from '@spartacus/core';
import { Observable } from 'rxjs';
import { CheckoutReplenishmentOrderAdapter } from './checkout-replenishment-order.adapter';

@Injectable()
export class CheckoutReplenishmentOrderConnector {
  constructor(protected adapter: CheckoutReplenishmentOrderAdapter) {}

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
