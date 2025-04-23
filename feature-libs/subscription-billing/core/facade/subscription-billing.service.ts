import { inject, Injectable } from '@angular/core';
import {
  Query,
  QueryService,
  QueryState,
  UserIdService,
} from '@spartacus/core';
import {
  SubscriptionBillingFacade,
  SubscriptionList,
} from '@spartacus/subscription-billing/root';
import { Observable, Subscription, EMPTY, map, switchMap, take } from 'rxjs';
import { SubscriptionBillingConnector } from '../connector';

@Injectable()
export class SubscriptionBillingService implements SubscriptionBillingFacade {
  protected queryService = inject(QueryService);
  protected userIdService = inject(UserIdService);
  protected subscriptionBillingConnector = inject(SubscriptionBillingConnector);
  getSubscriptionByCodeState(): Observable<
    QueryState<Subscription | undefined>
  > {
    return EMPTY;
  }

  getSubscriptionByCode(): Observable<Subscription | undefined> {
    return EMPTY;
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
}
