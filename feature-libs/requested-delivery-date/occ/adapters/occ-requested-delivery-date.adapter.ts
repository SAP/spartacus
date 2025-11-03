/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import {
  InterceptorUtil,
  OccEndpointsService,
  USE_CLIENT_TOKEN,
} from '@spartacus/core';
import { RequestedDeliveryDateAdapter } from '@spartacus/requested-delivery-date/core';

@Injectable()
export class OccRequestedDeliveryDateAdapter
  implements RequestedDeliveryDateAdapter
{
  protected http = inject(HttpClient);
  protected occEndpoints = inject(OccEndpointsService);

  /** Inserted by Angular inject() migration for backwards compatibility */
  constructor(...args: unknown[]);

  constructor() {}

  setRequestedDeliveryDate(
    userId: string,
    cartId: string,
    requestedRetrievalAt: string
  ) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });
    headers = InterceptorUtil.createHeader(USE_CLIENT_TOKEN, true, headers);

    const url = this.occEndpoints.buildUrl('requestedDeliveryDate', {
      urlParams: {
        userId,
        cartId,
      },
      queryParams: { requestedRetrievalAt },
    });

    return this.http.put(url, { headers });
  }
}
