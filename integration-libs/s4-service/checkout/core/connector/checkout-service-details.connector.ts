/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { CheckoutServiceDetailsAdapter } from './checkout-service-details.adapter';
import { ServiceDetails } from '@spartacus/s4-service/root';

@Injectable()
export class CheckoutServiceDetailsConnector {
  protected adapter = inject(CheckoutServiceDetailsAdapter);
  setServiceScheduleSlot(
    userId: string,
    cartId: string,
    scheduledAt: ServiceDetails
  ): Observable<unknown> {
    return this.adapter.setServiceScheduleSlot(userId, cartId, scheduledAt);
  }
}
