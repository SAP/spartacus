/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import {
  LoggerService,
  OccEndpointsService,
  normalizeHttpError,
} from '@spartacus/core';
import { ServiceDetails } from '@spartacus/s4-service/root';
import { Observable, catchError } from 'rxjs';
import { CheckoutServiceDetailsAdapter } from '../../core/connector/checkout-service-details.adapter';

const CONTENT_TYPE_JSON_HEADER = { 'Content-Type': 'application/json' };

@Injectable()
export class OccCheckoutServiceDetailsAdapter
  implements CheckoutServiceDetailsAdapter
{
  protected http = inject(HttpClient);
  protected logger = inject(LoggerService);
  protected occEndpoints = inject(OccEndpointsService);
  setServiceScheduleSlot(
    userId: string,
    cartId: string,
    scheduledAt: ServiceDetails
  ): Observable<unknown> {
    const url = this.occEndpoints.buildUrl('setServiceScheduleSlot', {
      urlParams: { userId, cartId },
    });
    const headers = new HttpHeaders({
      ...CONTENT_TYPE_JSON_HEADER,
    });
    //check if we need to add serializer and normalizer.
    return this.http.patch(url, scheduledAt, { headers }).pipe(
      catchError((error: any) => {
        throw normalizeHttpError(error, this.logger);
      })
    );
  }
}
