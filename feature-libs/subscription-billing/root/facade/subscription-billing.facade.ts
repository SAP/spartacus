/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Observable } from 'rxjs';
import { SUBSCRIPTION_BILLING_FEATURE } from '../feature-name';
import { SubscriptionBill, SubscriptionBillsList } from '../model';
import { Injectable } from '@angular/core';
import { facadeFactory, QueryState } from '@spartacus/core';

@Injectable({
  providedIn: 'root',
  useFactory: () =>
    facadeFactory({
      facade: SubscriptionBillingFacade,
      feature: SUBSCRIPTION_BILLING_FEATURE,
      methods: [
        'getSubscriptionBillByCodeState',
        'getSubscriptionBillByCode',
        'getSubscriptionBillsListState',
        'getSubscriptionBillsList',
        'getSubscriptionBillCodeFromRoute',
      ],
    }),
})
export abstract class SubscriptionBillingFacade {
  abstract getSubscriptionBillByCodeState(): Observable<
    QueryState<SubscriptionBill | undefined>
  >;

  abstract getSubscriptionBillByCode(
    code?: string
  ): Observable<SubscriptionBill | undefined>;

  abstract getSubscriptionBillsListState(
    pageSize?: number,
    currentPage?: number,
    sort?: string,
    filter?: string
  ): Observable<QueryState<SubscriptionBillsList | undefined>>;

  abstract getSubscriptionBillsList(
    pageSize?: number,
    currentPage?: number,
    sort?: string,
    filters?: string
  ): Observable<SubscriptionBillsList | undefined>;

  abstract getSubscriptionBillCodeFromRoute(): Observable<string | undefined>;
}
