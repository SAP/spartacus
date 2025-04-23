import { Observable, Subscription } from 'rxjs';
import { SUBSCRIPTION_BILLING_FEATURE } from '../feature-name';
import { SubscriptionList } from '../model';
import { Injectable } from '@angular/core';
import { facadeFactory, QueryState } from '@spartacus/core';

@Injectable({
  providedIn: 'root',
  useFactory: () =>
    facadeFactory({
      facade: SubscriptionBillingFacade,
      feature: SUBSCRIPTION_BILLING_FEATURE,
      methods: [
        'getSubscriptionByCodeState',
        'getSubscriptionByCode',
        'getSubscriptionListState',
        'getSubscriptionList',
      ],
    }),
})
export abstract class SubscriptionBillingFacade {
  abstract getSubscriptionByCodeState(): Observable<
    QueryState<Subscription | undefined>
  >;

  abstract getSubscriptionByCode(): Observable<Subscription | undefined>;

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
}
