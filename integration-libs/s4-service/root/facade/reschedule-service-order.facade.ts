/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServiceDateTime } from '../model/checkout-service-details.model';

@Injectable({
  providedIn: 'root',
})
export abstract class RescheduleServiceOrderFacade {
  /**
   * Set service schedule DateTime for the order
   *
   * @param scheduledAt a service date time
   */
  abstract rescheduleService(
    orderCode: string,
    scheduledAt: ServiceDateTime
  ): Observable<unknown>;
}
