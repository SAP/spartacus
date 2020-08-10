import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  ReplenishmentOrder,
  ScheduleReplenishmentForm,
} from '../../../model/replenishment-order.model';
import { CheckoutReplenishmentOrderAdapter } from './checkout-replenishment-order.adapter';

@Injectable({
  providedIn: 'root',
})
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
