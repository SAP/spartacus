/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CancellationDetails } from '../model/checkout-service-details.model';
import { Order } from '@spartacus/order/root';

@Injectable({
  providedIn: 'root',
})
export abstract class CancelServiceOrderFacade {
  /**
   * Set service schedule DateTime for the order
   *
   * @param scheduledAt a service date time
   */
  abstract cancelService(
    orderCode: string,
    cancellationDetails: CancellationDetails
  ): Observable<unknown>;

  /**
   * Retrieves order's details
   */
  abstract loadOrderDetails(): Observable<Order>;
}
