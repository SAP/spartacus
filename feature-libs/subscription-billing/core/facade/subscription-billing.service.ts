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
  SubscriptionBillingFacade,
  SubscriptionDetail,
  SubscriptionExtensionEffectiveDate,
  SubscriptionList,
} from '@spartacus/subscription-billing/root';
import { Observable, map, switchMap, take, combineLatest } from 'rxjs';
import { SubscriptionBillingConnector } from '../connector';

@Injectable()
export class SubscriptionBillingService implements SubscriptionBillingFacade {
  protected queryService = inject(QueryService);
  protected userIdService = inject(UserIdService);
  protected subscriptionBillingConnector = inject(SubscriptionBillingConnector);
  protected routingService = inject(RoutingService);

  protected getSubscriptionByCodeReloadEvents(): QueryNotifier[] {
    return [GetSubscriptionByCodeReloadEvent];
  }
  getSubscriptionCodeFromRoute(): Observable<string | undefined> {
    return this.routingService.getRouterState().pipe(
      map((route) => {
        const guidPattern = /\/subscription\/([^/?#]+)/;
        const match = route.state.url.match(guidPattern);
        return match ? match[1] : undefined;
      })
    );
  }

  protected getSubscriptionByCodeQuery$: Query<SubscriptionDetail | undefined> =
    this.queryService.create<SubscriptionDetail | undefined>(
      () =>
        this.subscriptionDetailsPreConditions().pipe(
          switchMap(([customerId, subscriptionCode]) =>
            this.subscriptionBillingConnector.getSubscriptionByCode(
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

  getSubscriptionByCodeState(): Observable<
    QueryState<SubscriptionDetail | undefined>
  > {
    return this.getSubscriptionByCodeQuery$.getState();
  }

  getSubscriptionByCode(): Observable<SubscriptionDetail | undefined> {
    return this.getSubscriptionByCodeState().pipe(map((state) => state.data));
  }

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
      take(1),
      map(([userId, subscriptionCode]) => {
        if (!userId || !subscriptionCode) {
          throw new Error('Subscription details pre conditions not met');
        }
        return [userId, subscriptionCode];
      })
    );
  }
  protected getSubscriptionListQuery$(
    pageSize: number,
    currentPage: number,
    sort: string
  ): Query<SubscriptionList | undefined> {
    return this.queryService.create<SubscriptionList | undefined>(
      () =>
        this.subscriptionListPreConditions().pipe(
          switchMap((customerId) =>
            this.subscriptionBillingConnector.getSubscriptionList(
              customerId,
              pageSize,
              currentPage,
              sort
            )
          )
        )
      // see if below is needed later
      // {
      // reloadOn: this.getTicketsQueryReloadEvents(),
      // resetOn: this.getTicketsQueryResetEvents(),
      // }
    );
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

  getSubscriptionList(
    pageSize: number,
    currentPage: number,
    sort: string
  ): Observable<SubscriptionList | undefined> {
    return this.getSubscriptionListState(pageSize, currentPage, sort).pipe(
      map((state) => state.data)
    );
  }

  getSubscriptionExtensionEffectiveDate(
    extendDuration: number,
    isUnlimitedDuration: boolean
  ): Observable<SubscriptionExtensionEffectiveDate> {
    return this.subscriptionDetailsPreConditions().pipe(
      switchMap(([userId, subscriptionCode]) =>
        this.subscriptionBillingConnector.getSubscriptionExtensionEffectiveDate(
          userId,
          subscriptionCode,
          extendDuration,
          isUnlimitedDuration
        )
      )
    );
  }

  extendSubscription(
    extendDuration: number,
    isUnlimitedDuration: boolean
  ): Observable<any> {
    return this.subscriptionDetailsPreConditions().pipe(
      switchMap(([userId, subscriptionCode]) =>
        this.subscriptionBillingConnector.extendSubscription(
          userId,
          subscriptionCode,
          extendDuration,
          isUnlimitedDuration
        )
      )
    );
  }
}
