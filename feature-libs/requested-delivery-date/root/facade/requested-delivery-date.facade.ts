/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { facadeFactory } from '@spartacus/core';
import { Observable } from 'rxjs';
import { REQUESTED_DELIVERY_DATE_FEATURE } from '../feature-name';

export function requestedDeliveryDateFacadeFactory() {
  return facadeFactory({
    facade: RequestedDeliveryDateFacade,
    feature: REQUESTED_DELIVERY_DATE_FEATURE,
    methods: ['setRequestedDeliveryDate'],
  });
}

@Injectable({
  providedIn: 'root',
  useFactory: requestedDeliveryDateFacadeFactory,
})
export abstract class RequestedDeliveryDateFacade {
  /**
   * Set the requested delivery date
   */
  abstract setRequestedDeliveryDate(
    userId: string,
    cartId: string,
    requestedDate: string
  ): Observable<{}>;
}
