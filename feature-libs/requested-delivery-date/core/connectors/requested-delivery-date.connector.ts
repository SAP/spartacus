/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { RequestedDeliveryDateAdapter } from './requested-delivery-date.adapter';

@Injectable({
  providedIn: 'root',
})
export class RequestedDeliveryDateConnector {
  protected adapter = inject(RequestedDeliveryDateAdapter);


  public setRequestedDeliveryDate(
    userId: string,
    cartId: string,
    requestedDate: string
  ): Observable<{}> {
    return this.adapter.setRequestedDeliveryDate(userId, cartId, requestedDate);
  }
}
