/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  LoggerService,
  OccEndpointsService,
  tryNormalizeHttpError,
} from '@spartacus/core';
import { ServiceDetails } from '@spartacus/s4-service/root';
import { catchError, Observable } from 'rxjs';
import { RescheduleServiceOrderAdapter } from '../../core/connector/reschedule-service-order.adapter';

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
        throw tryNormalizeHttpError(error, this.logger);
      })
    );
  }
}
