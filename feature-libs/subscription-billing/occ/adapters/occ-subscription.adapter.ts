/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  LoggerService,
  OccEndpointsService,
  tryNormalizeHttpError,
} from '@spartacus/core';
import { SubscriptionAdapter } from '@spartacus/subscription-billing/core';
import {
  SubscriptionDetail,
  SubscriptionList,
} from '@spartacus/subscription-billing/root';
import { catchError, Observable } from 'rxjs';

@Injectable()
export class OccSubscriptionAdapter implements SubscriptionAdapter {
  protected logger = inject(LoggerService);
  protected http = inject(HttpClient);
  protected occEndpoints = inject(OccEndpointsService);
  getSubscriptionByCode(
    userId: string,
    subscriptionCode: string
  ): Observable<SubscriptionDetail> {
    const url = this.occEndpoints.buildUrl('subscriptionByCode', {
      urlParams: {
        userId,
        subscriptionCode,
      },
    });
    return this.http.get<SubscriptionDetail>(url).pipe(
      catchError((error) => {
        throw tryNormalizeHttpError(error, this.logger);
      })
    );
  }

  getSubscriptionList(
    userId: string,
    pageSize?: number,
    currentPage?: number,
    sort?: string
  ): Observable<SubscriptionList> {
    const url = this.occEndpoints.buildUrl('subscriptionList', {
      urlParams: {
        userId,
      },
      queryParams: {
        pageSize,
        currentPage,
        sort,
      },
    });
    return this.http.get<SubscriptionList>(url).pipe(
      catchError((error) => {
        throw tryNormalizeHttpError(error, this.logger);
      })
    );
  }
}
