/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
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
import { SubscriptionBillingAdapter } from '@spartacus/subscription-billing/core';
import {
  SubscriptionBill,
  SubscriptionBillsList,
} from '@spartacus/subscription-billing/root';
import { catchError, Observable } from 'rxjs';

@Injectable()
export class OccSubscriptionBillingAdapter
  implements SubscriptionBillingAdapter
{
  protected logger = inject(LoggerService);
  protected http = inject(HttpClient);
  protected occEndpoints = inject(OccEndpointsService);

  getSubscriptionBillsList(
    userId: string,
    pageSize?: number,
    currentPage?: number,
    sort?: string,
    filters?: string
  ): Observable<SubscriptionBillsList> {
    const url = this.occEndpoints.buildUrl('subscriptionBillsList', {
      urlParams: {
        userId,
      },
      queryParams: {
        pageSize,
        currentPage,
        sort,
        filters,
      },
    });
    return this.http.get<SubscriptionBillsList>(url).pipe(
      catchError((error) => {
        throw tryNormalizeHttpError(error, this.logger);
      })
    );
  }

  getSubscriptionBillByCode(
    userId: string,
    billId: string
  ): Observable<SubscriptionBill> {
    const url = this.occEndpoints.buildUrl('subscriptionBillByCode', {
      urlParams: {
        userId,
        billId,
      },
    });
    return this.http.get<SubscriptionBill>(url).pipe(
      catchError((error) => {
        throw tryNormalizeHttpError(error, this.logger);
      })
    );
  }
}
