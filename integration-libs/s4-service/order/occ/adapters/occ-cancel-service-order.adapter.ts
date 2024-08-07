/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { OccEndpointsService } from '@spartacus/core';
import { CancelObj } from '@spartacus/s4-service/root';
import { Observable } from 'rxjs';
import { CancelServiceOrderAdapter } from '../../core/connector/cancel-service-order.adapter';
const CONTENT_TYPE_JSON_HEADER = { 'Content-Type': 'application/json' };

@Injectable()
export class OccCancelServiceOrderAdapter implements CancelServiceOrderAdapter {
  protected http = inject(HttpClient);
  protected occEndpoints = inject(OccEndpointsService);

  cancelServiceOrder(
    userId: string,
    code: string,
    cancelObj: CancelObj
  ): Observable<unknown> {
    const url = this.occEndpoints.buildUrl('cancelServiceOrder', {
      urlParams: { userId, code },
    });
    const headers = new HttpHeaders({
      ...CONTENT_TYPE_JSON_HEADER,
    });
    //check if we need to add serializer and normalizer.
    // console.log('occ -> adapter level', url, cancelObj);
    return this.http.post(url, cancelObj, { headers });
  }
}
