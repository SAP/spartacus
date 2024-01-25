/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

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
      facade: ScheduledReplenishmentOrderFacade,
      feature: ORDER_CORE_FEATURE,
      methods: ['scheduleReplenishmentOrder'],
    }),
})
export abstract class ScheduledReplenishmentOrderFacade {
  /**
   * Schedule a replenishment order
   */
  abstract scheduleReplenishmentOrder(
    scheduleReplenishmentForm: ScheduleReplenishmentForm,
    termsChecked: boolean
  ): Observable<ReplenishmentOrder>;
}
