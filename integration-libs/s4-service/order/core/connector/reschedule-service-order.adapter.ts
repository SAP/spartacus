/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ServiceDetails } from '@spartacus/s4-service/root';
import { Observable } from 'rxjs';

export abstract class RescheduleServiceOrderAdapter {
  /**
   * Abstract method used to reschedule a service order
   *
   * @param userId
   * @param cartId
   * @param scheduledAt : date and time of the service
   */
  abstract rescheduleServiceOrder(
    userId: string,
    cartId: string,
    scheduledAt: ServiceDetails
  ): Observable<unknown>;
}
