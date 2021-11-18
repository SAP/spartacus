import { ReplenishmentOrder, ScheduleReplenishmentForm } from '@spartacus/core';
import { Observable } from 'rxjs';

export abstract class CheckoutReplenishmentOrderAdapter {
  /**
   * Abstract method used to schedule a replenishment order.
   */
  abstract scheduleReplenishmentOrder(
    cartId: string,
    scheduleReplenishmentForm: ScheduleReplenishmentForm,
    termsChecked: boolean,
    userId: string
  ): Observable<ReplenishmentOrder>;
}
