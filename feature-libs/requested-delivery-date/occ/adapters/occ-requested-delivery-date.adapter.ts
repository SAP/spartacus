/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
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
  constructor(
    protected http: HttpClient,
    protected occEndpoints: OccEndpointsService
  ) {}

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
