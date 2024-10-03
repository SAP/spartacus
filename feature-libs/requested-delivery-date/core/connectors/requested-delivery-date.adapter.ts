/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Observable } from 'rxjs';

export abstract class RequestedDeliveryDateAdapter {
  /**
   * Abstract method used to set the requested delivery date for a cart entry
   */
  abstract setRequestedDeliveryDate(
    userId: string,
    cartId: string,
    requestedDate: string
  ): Observable<{}>;
}
