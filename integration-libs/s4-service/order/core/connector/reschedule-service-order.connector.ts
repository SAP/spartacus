/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { inject, Injectable } from '@angular/core';
import { RescheduleServiceOrderAdapter } from './reschedule-service-order.adapter';
import { ServiceDetails } from '@spartacus/s4-service/root';
import { Observable } from 'rxjs';

@Injectable()
export class RescheduleServiceOrderConnector {
  protected rescheduleServiceOrderAdapter = inject(
    RescheduleServiceOrderAdapter
  );

  rescheduleServiceOrder(
    userId: string,
    code: string,
    scheduledAt: ServiceDetails
  ): Observable<unknown> {
    return this.rescheduleServiceOrderAdapter.rescheduleServiceOrder(
      userId,
      code,
      scheduledAt
    );
  }
}
