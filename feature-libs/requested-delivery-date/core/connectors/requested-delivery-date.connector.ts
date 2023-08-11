/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RequestedDeliveryDateAdapter } from './requested-delivery-date.adapter';

@Injectable({
  providedIn: 'root',
})
export class RequestedDeliveryDateConnector {
  constructor(protected adapter: RequestedDeliveryDateAdapter) {}

  public setRequestedDeliveryDate(
    userId: string,
    cartId: string,
    requestedDate: string
  ): Observable<{}> {
    return this.adapter.setRequestedDeliveryDate(userId, cartId, requestedDate);
  }
}
