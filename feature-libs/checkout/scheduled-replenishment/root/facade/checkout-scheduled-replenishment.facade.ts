import { Injectable } from '@angular/core';
import {
  facadeFactory,
  ORDER_TYPE,
  ReplenishmentOrder,
  ScheduleReplenishmentForm,
} from '@spartacus/core';
import { Observable } from 'rxjs';
import { CHECKOUT_SCHEDULED_REPLENISHMENT_CORE_FEATURE } from '../feature-name';

@Injectable({
  providedIn: 'root',
  useFactory: () =>
    facadeFactory({
      facade: CheckoutScheduledReplenishmentFacade,
      feature: CHECKOUT_SCHEDULED_REPLENISHMENT_CORE_FEATURE,
      methods: ['scheduleReplenishmentOrder', 'setOrderType', 'getOrderType'],
      // TODO:#deprecation-checkout - remove once we remove ngrx
      async: true,
    }),
})
export abstract class CheckoutScheduledReplenishmentFacade {
  /**
   * Schedule a replenishment order
   */
  abstract scheduleReplenishmentOrder(
    scheduleReplenishmentForm: ScheduleReplenishmentForm,
    termsChecked: boolean
  ): Observable<ReplenishmentOrder>;

  /**
   * Set checkout order type
   * @param orderType : an enum of types of order we are placing
   */
  abstract setOrderType(orderType: ORDER_TYPE): void;

  /**
   * Get current checkout order type
   */
  abstract getOrderType(): Observable<ORDER_TYPE>;
}
