/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Observable } from 'rxjs';
import { SUBSCRIPTION_BILLING_FEATURE } from '../feature-name';
import { SubscriptionDetail, SubscriptionList } from '../model';
import { Injectable } from '@angular/core';
import { facadeFactory, QueryState } from '@spartacus/core';

@Injectable({
  providedIn: 'root',
  useFactory: () =>
    facadeFactory({
      facade: SubscriptionFacade,
      feature: SUBSCRIPTION_BILLING_FEATURE,
      methods: [
        'getSubscriptionByCodeState',
        'getSubscriptionByCode',
        'getSubscriptionListState',
        'getSubscriptionList',
        'getSubscriptionCodeFromRoute',
      ],
    }),
})
export abstract class SubscriptionFacade {
  abstract getSubscriptionByCodeState(): Observable<
    QueryState<SubscriptionDetail | undefined>
  >;

  abstract getSubscriptionByCode(
    code?: string
  ): Observable<SubscriptionDetail | undefined>;

  abstract getSubscriptionListState(
    pageSize: number,
    currentPage?: number,
    sort?: string
  ): Observable<QueryState<SubscriptionList | undefined>>;

  abstract getSubscriptionList(
    pageSize?: number,
    currentPage?: number,
    sort?: string
  ): Observable<SubscriptionList | undefined>;

  abstract getSubscriptionCodeFromRoute(): Observable<string | undefined>;
}
