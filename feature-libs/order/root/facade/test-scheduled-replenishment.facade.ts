import { Injectable } from '@angular/core';
import { facadeFactory } from '@spartacus/core';
import { ORDER_CORE_FEATURE, ReplenishmentOrder } from '@spartacus/order/root';
import { Observable } from 'rxjs';
import { ScheduleReplenishmentForm } from '../model/scheduled-replenishment.model';

@Injectable({
  providedIn: 'root',
  useFactory: () =>
    facadeFactory({
      facade: TestScheduledReplenishmentFacade,
      feature: ORDER_CORE_FEATURE,
      methods: ['scheduleReplenishmentOrder'],
      // TODO:#deprecation-checkout - remove once we remove ngrx
      async: true,
    }),
})
export abstract class TestScheduledReplenishmentFacade {
  /**
   * Schedule a replenishment order
   */
  abstract scheduleReplenishmentOrder(
    scheduleReplenishmentForm: ScheduleReplenishmentForm,
    termsChecked: boolean
  ): Observable<ReplenishmentOrder>;
}
