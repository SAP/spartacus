/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, inject } from '@angular/core';
import {
  ReplenishmentOrder,
  ScheduleReplenishmentForm,
} from '@spartacus/order/root';
import { Observable } from 'rxjs';
import { ScheduledReplenishmentOrderAdapter } from './scheduled-replenishment-order.adapter';

@Injectable()
export class ScheduledReplenishmentOrderConnector {
  protected adapter = inject(ScheduledReplenishmentOrderAdapter);

  /** Inserted by Angular inject() migration for backwards compatibility */
  constructor(...args: unknown[]);

  constructor() {}

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
