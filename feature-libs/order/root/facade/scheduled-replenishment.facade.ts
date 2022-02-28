import { Injectable } from '@angular/core';
import { facadeFactory } from '@spartacus/core';
import { Observable } from 'rxjs';
import { ORDER_CORE_FEATURE } from '../feature-name';
import { ReplenishmentOrder } from '../model/replenishment-order.model';
import { ScheduleReplenishmentForm } from '../model/scheduled-replenishment.model';

@Injectable({
  providedIn: 'root',
  useFactory: () =>
    facadeFactory({
      facade: ScheduledReplenishmentFacade,
      feature: ORDER_CORE_FEATURE,
      methods: ['scheduleReplenishmentOrder'],
      // TODO:#deprecation-checkout - remove once we remove ngrx
      async: true,
    }),
})
export abstract class ScheduledReplenishmentFacade {
  /**
   * Schedule a replenishment order
   */
  abstract scheduleReplenishmentOrder(
    scheduleReplenishmentForm: ScheduleReplenishmentForm,
    termsChecked: boolean
  ): Observable<ReplenishmentOrder>;
}
