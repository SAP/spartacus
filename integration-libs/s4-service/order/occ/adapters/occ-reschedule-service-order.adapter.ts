/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { inject, Injectable } from '@angular/core';
import { RescheduleServiceOrderAdapter } from '../../core/connector/reschedule-service-order.adapter';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
  LoggerService,
  normalizeHttpError,
  OccEndpointsService,
} from '@spartacus/core';
import { ServiceDetails } from '@spartacus/s4-service/root';
import { catchError, Observable } from 'rxjs';

@Injectable()
export class OccRescheduleServiceOrderAdapter
  implements RescheduleServiceOrderAdapter
{
  protected http = inject(HttpClient);
  protected logger = inject(LoggerService);
  protected occEndpoints = inject(OccEndpointsService);

  rescheduleServiceOrder(
    userId: string,
    code: string,
    scheduledAt: ServiceDetails
  ): Observable<unknown> {
    const url = this.occEndpoints.buildUrl('rescheduleService', {
      urlParams: { userId, code },
    });
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.patch(url, scheduledAt, { headers }).pipe(
      catchError((error: any) => {
        throw normalizeHttpError(error, this.logger);
      })
    );
  }
}
