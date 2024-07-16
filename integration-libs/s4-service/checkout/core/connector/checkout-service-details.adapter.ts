/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ServiceDetails } from '@spartacus/s4-service/root';
import { Observable } from 'rxjs';

export abstract class CheckoutServiceDetailsAdapter {
  /**
   * Abstract method used to set service details to cart
   *
   * @param userId
   * @param cartId
   * @param scheduledAt : date and time of the service
   */
  abstract setServiceScheduleSlot(
    userId: string,
    cartId: string,
    scheduledAt: ServiceDetails
  ): Observable<unknown>;
}
