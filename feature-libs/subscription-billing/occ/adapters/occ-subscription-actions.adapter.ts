/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
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
import { SubscriptionActionsAdapter } from '@spartacus/subscription-billing/core';
import {
  SubscriptionCancellationDetails,
  SubscriptionWithdraw,
} from '@spartacus/subscription-billing/root';
import { catchError, Observable } from 'rxjs';

const CONTENT_TYPE_JSON_HEADER = { 'Content-Type': 'application/json' };
@Injectable()
export class OccSubscriptionActionsAdapter
  implements SubscriptionActionsAdapter
{
  protected logger = inject(LoggerService);
  protected http = inject(HttpClient);
  protected occEndpoints = inject(OccEndpointsService);

  cancelSubscription(
    userId: string,
    subscriptionCode: string,
    cancellationDetails: SubscriptionCancellationDetails
  ): Observable<any> {
    const url = this.occEndpoints.buildUrl('cancelSubscription', {
      urlParams: {
        userId,
        subscriptionCode,
      },
    });
    const headers = new HttpHeaders({
      ...CONTENT_TYPE_JSON_HEADER,
    });
    return this.http.post(url, cancellationDetails, { headers }).pipe(
      catchError((error) => {
        throw tryNormalizeHttpError(error, this.logger);
      })
    );
  }
  getEffectiveCancellationDate(
    userId: string,
    subscriptionCode: string
  ): Observable<any> {
    const url = this.occEndpoints.buildUrl('getEffectiveCancellationDate', {
      urlParams: {
        userId,
        subscriptionCode,
      },
    });
    return this.http.get(url).pipe(
      catchError((error) => {
        throw tryNormalizeHttpError(error, this.logger);
      })
    );
  }

  withdrawSubscription(
    userId: string,
    subscriptionCode: string,
    withdrawalData: SubscriptionWithdraw
  ): Observable<any> {
    const url = this.occEndpoints.buildUrl('withdrawal', {
      urlParams: {
        userId,
        subscriptionCode,
      },
    });
    const headers = new HttpHeaders({
      ...CONTENT_TYPE_JSON_HEADER,
    });
    return this.http.post(url, withdrawalData, { headers }).pipe(
      catchError((error) => {
        throw tryNormalizeHttpError(error, this.logger);
      })
    );
  }
  reverseCancellation(
    userId: string,
    subscriptionCode: string
  ): Observable<any> {
    const url = this.occEndpoints.buildUrl('reverseCancellation', {
      urlParams: {
        userId,
        subscriptionCode,
      },
    });
    const headers = new HttpHeaders({
      ...CONTENT_TYPE_JSON_HEADER,
    });
    return this.http.post(url, null, { headers }).pipe(
      catchError((error) => {
        throw tryNormalizeHttpError(error, this.logger);
      })
    );
  }
}
