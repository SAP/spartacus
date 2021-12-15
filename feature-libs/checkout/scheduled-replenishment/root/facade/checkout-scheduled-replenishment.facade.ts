import { Injectable } from '@angular/core';
import { facadeFactory } from '@spartacus/core';
import { ReplenishmentOrder } from '@spartacus/order/root';
import { Observable } from 'rxjs';
import { CHECKOUT_SCHEDULED_REPLENISHMENT_CORE_FEATURE } from '../feature-name';
import { ScheduleReplenishmentForm } from '../models/scheduled-replenishment.model';

@Injectable({
  providedIn: 'root',
  useFactory: () =>
    facadeFactory({
      facade: CheckoutScheduledReplenishmentFacade,
      feature: CHECKOUT_SCHEDULED_REPLENISHMENT_CORE_FEATURE,
      methods: ['scheduleReplenishmentOrder'],
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
}
