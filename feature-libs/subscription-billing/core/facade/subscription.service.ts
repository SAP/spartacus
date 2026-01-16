/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { inject, Injectable } from '@angular/core';
import {
  Query,
  QueryNotifier,
  QueryService,
  QueryState,
  RoutingService,
  UserIdService,
} from '@spartacus/core';
import {
  GetSubscriptionByCodeReloadEvent,
  GetSubscriptionListReloadEvent,
  SubscriptionFacade,
  SubscriptionDetail,
  SubscriptionList,
} from '@spartacus/subscription-billing/root';
import { Observable, map, switchMap, take, combineLatest } from 'rxjs';
import { SubscriptionConnector } from '../connector';

@Injectable()
export class SubscriptionService implements SubscriptionFacade {
  protected queryService = inject(QueryService);
  protected userIdService = inject(UserIdService);
  protected subscriptionConnector = inject(SubscriptionConnector);
  protected routingService = inject(RoutingService);

  /** events */
  protected getSubscriptionByCodeReloadEvents(): QueryNotifier[] {
    return [GetSubscriptionByCodeReloadEvent];
  }
  protected getSubscriptionListReloadEvents(): QueryNotifier[] {
    return [GetSubscriptionListReloadEvent];
  }

  /** queries */
  protected getSubscriptionByCodeQuery$: Query<SubscriptionDetail | undefined> =
    this.queryService.create<SubscriptionDetail | undefined>(
      () =>
        this.subscriptionDetailsPreConditions().pipe(
          switchMap(([customerId, subscriptionCode]) =>
            this.subscriptionConnector.getSubscriptionByCode(
              customerId,
              subscriptionCode
            )
          )
        ),
      {
        reloadOn: this.getSubscriptionByCodeReloadEvents(),
        // resetOn: this.getTicketQueryResetEvents(),
      }
    );
  protected getSubscriptionListQuery$(
    pageSize: number,
    currentPage: number,
    sort: string
  ): Query<SubscriptionList | undefined> {
    return this.queryService.create<SubscriptionList | undefined>(
      () =>
        this.subscriptionListPreConditions().pipe(
          switchMap((customerId) =>
            this.subscriptionConnector.getSubscriptionList(
              customerId,
              pageSize,
              currentPage,
              sort
            )
          )
        ),
      {
        reloadOn: this.getSubscriptionListReloadEvents(),
      }
    );
  }

  /** query states */
  getSubscriptionByCodeState(): Observable<
    QueryState<SubscriptionDetail | undefined>
  > {
    return this.getSubscriptionByCodeQuery$.getState();
  }
  getSubscriptionListState(
    pageSize: number,
    currentPage: number,
    sort: string
  ): Observable<QueryState<SubscriptionList | undefined>> {
    return this.getSubscriptionListQuery$(
      pageSize,
      currentPage,
      sort
    ).getState();
  }

  /** pre-conditions */
  protected subscriptionListPreConditions(): Observable<string> {
    return this.userIdService.getUserId().pipe(
      take(1),
      map((userId) => {
        if (!userId) {
          throw new Error('Subscriptions list pre conditions not met');
        }
        return userId;
      })
    );
  }
  protected subscriptionDetailsPreConditions(): Observable<[string, string]> {
    return combineLatest([
      this.userIdService.getUserId(),
      this.getSubscriptionCodeFromRoute(),
    ]).pipe(
      map(([userId, subscriptionCode]) => {
        if (!userId || !subscriptionCode) {
          throw new Error('Subscription details pre conditions not met');
        }
        return [userId, subscriptionCode];
      })
    );
  }

  /** public methods */
  getSubscriptionCodeFromRoute(): Observable<string | undefined> {
    return this.routingService.getRouterState().pipe(
      map((route) => {
        const guidPattern = /\/subscription\/([^/?#]+)/;
        const match = route.state.url.match(guidPattern);
        return match ? match[1] : undefined;
      })
    );
  }
  getSubscriptionByCode(): Observable<SubscriptionDetail | undefined> {
    return this.getSubscriptionByCodeState().pipe(map((state) => state.data));
  }
  getSubscriptionList(
    pageSize: number,
    currentPage: number,
    sort: string
  ): Observable<SubscriptionList | undefined> {
    return this.getSubscriptionListState(pageSize, currentPage, sort).pipe(
      map((state) => state.data)
    );
  }
}
