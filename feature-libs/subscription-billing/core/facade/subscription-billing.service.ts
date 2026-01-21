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
  GetSubscriptionBillsListReloadEvent,
  SubscriptionBill,
  SubscriptionBillingFacade,
  SubscriptionBillsList,
} from '@spartacus/subscription-billing/root';
import { map, Observable, of, switchMap, take } from 'rxjs';
import { SubscriptionBillingConnector } from '../connector';

@Injectable()
export class SubscriptionBillingService implements SubscriptionBillingFacade {
  protected queryService = inject(QueryService);
  protected userIdService = inject(UserIdService);
  protected routingService = inject(RoutingService);
  protected subscriptionBillsConnector = inject(SubscriptionBillingConnector);

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

  getSubscriptionBillState(): Observable<
    QueryState<SubscriptionBill | undefined>
  > {
    throw new Error('Method not implemented.');
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
    filter?: string
  ): Observable<SubscriptionBillsList | undefined> {
    return this.getSubscriptionBillsListState(
      pageSize,
      currentPage,
      sort,
      filter
    ).pipe(map((state) => state.data));
  }

  getSubscriptionBillByCode(
    code?: string
  ): Observable<SubscriptionBill | undefined> {
    throw new Error('Method not implemented.', code as any);
  }

  getSubscriptionBillCodeFromRoute(): Observable<string | undefined> {
    return of(undefined);
  }
}
