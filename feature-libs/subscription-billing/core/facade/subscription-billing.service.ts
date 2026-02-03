/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { inject, Injectable } from '@angular/core';
import {
  Query,
  QueryService,
  QueryState,
  RoutingService,
  UserIdService,
} from '@spartacus/core';
import {
  GetSubscriptionBillByCodeReloadEvent,
  GetSubscriptionBillsListReloadEvent,
  SubscriptionBill,
  SubscriptionBillingFacade,
  SubscriptionBillsList,
} from '@spartacus/subscription-billing/root';
import { combineLatest, map, Observable, switchMap, take } from 'rxjs';
import { SubscriptionBillingConnector } from '../connector';

@Injectable()
export class SubscriptionBillingService implements SubscriptionBillingFacade {
  protected queryService = inject(QueryService);
  protected userIdService = inject(UserIdService);
  protected routingService = inject(RoutingService);
  protected subscriptionBillsConnector = inject(SubscriptionBillingConnector);

  protected subscriptionBillPreConditions(): Observable<[string, string]> {
    return combineLatest([
      this.userIdService.getUserId(),
      this.getSubscriptionBillCodeFromRoute(),
    ]).pipe(
      map(([userId, subscriptionBillCode]) => {
        if (!userId || !subscriptionBillCode) {
          throw new Error('Subscription bill details pre conditions not met');
        }
        return [userId, subscriptionBillCode];
      })
    );
  }

  protected getSubscriptionBillByCodeQuery$: Query<
    SubscriptionBill | undefined
  > = this.queryService.create<SubscriptionBill | undefined>(
    () =>
      this.subscriptionBillPreConditions().pipe(
        switchMap(([customerId, subscriptionBillCode]) =>
          this.subscriptionBillsConnector.getSubscriptionBillByCode(
            customerId,
            subscriptionBillCode
          )
        )
      ),
    {
      reloadOn: [GetSubscriptionBillByCodeReloadEvent],
    }
  );

  protected subscriptionBillsListPreConditions(): Observable<string> {
    return this.userIdService.getUserId().pipe(
      take(1),
      map((userId) => {
        if (!userId) {
          throw new Error('Subscription Bills List pre conditions are not met');
        }
        return userId;
      })
    );
  }

  protected getSubscriptionBillListQuery$(
    pageSize?: number,
    currentPage?: number,
    sort?: string,
    filter?: string
  ): Query<SubscriptionBillsList | undefined> {
    return this.queryService.create<SubscriptionBillsList | undefined>(
      () =>
        this.subscriptionBillsListPreConditions().pipe(
          switchMap((userId) =>
            this.subscriptionBillsConnector.getSubscriptionBillsList(
              userId,
              pageSize,
              currentPage,
              sort,
              filter
            )
          )
        ),
      {
        reloadOn: [GetSubscriptionBillsListReloadEvent],
      }
    );
  }

  getSubscriptionBillByCodeState(): Observable<
    QueryState<SubscriptionBill | undefined>
  > {
    return this.getSubscriptionBillByCodeQuery$.getState();
  }

  getSubscriptionBillsListState(
    pageSize?: number,
    currentPage?: number,
    sort?: string,
    filter?: string
  ): Observable<QueryState<SubscriptionBillsList | undefined>> {
    return this.getSubscriptionBillListQuery$(
      pageSize,
      currentPage,
      sort,
      filter
    ).getState();
  }

  getSubscriptionBillsList(
    pageSize?: number,
    currentPage?: number,
    sort?: string,
    filters?: string
  ): Observable<SubscriptionBillsList | undefined> {
    return this.getSubscriptionBillsListState(
      pageSize,
      currentPage,
      sort,
      filters
    ).pipe(map((state) => state.data));
  }

  getSubscriptionBillByCode(): Observable<SubscriptionBill | undefined> {
    return this.getSubscriptionBillByCodeState().pipe(
      map((state) => state.data)
    );
  }

  getSubscriptionBillCodeFromRoute(): Observable<string | undefined> {
    return this.routingService.getRouterState().pipe(
      map((route) => {
        const guidPattern = /\/subscription-bill\/([^/?#]+)/;
        const match = route.state.url.match(guidPattern);
        return match ? match[1] : undefined;
      })
    );
  }
}
