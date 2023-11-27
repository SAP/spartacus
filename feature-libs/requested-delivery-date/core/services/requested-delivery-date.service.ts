/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { RequestedDeliveryDateFacade } from '@spartacus/requested-delivery-date/root';
import { Observable } from 'rxjs';
import { RequestedDeliveryDateConnector } from '../connectors/requested-delivery-date.connector';

@Injectable()
export class RequestedDeliveryDateService
  implements RequestedDeliveryDateFacade
{
  /**
   * Set requested delivery date
   */
  setRequestedDeliveryDate(
    userId: string,
    cartId: string,
    requestedDate: string
  ): Observable<{}> {
    return this.requestedDeliveryDateConnector.setRequestedDeliveryDate(
      userId,
      cartId,
      requestedDate
    );
  }

  constructor(
    protected requestedDeliveryDateConnector: RequestedDeliveryDateConnector
  ) {}
}
