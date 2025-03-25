import { Injectable } from '@angular/core';
import { QueryState } from '@spartacus/core';
import { SubscriptionList } from '@spartacus/subscription-billing/root';
import { Observable, Subscription, EMPTY } from 'rxjs';

@Injectable()
export class SubscriptionBillingService {
  getSubscriptionDetailState(): Observable<
    QueryState<Subscription | undefined>
  > {
    return EMPTY;
  }

  getSubscriptionDetail(): Observable<Subscription | undefined> {
    return EMPTY;
  }

  getSubscriptionListState(
    _pageSize: number,
    _currentPage?: number,
    _sort?: string
  ): Observable<QueryState<SubscriptionList | undefined>> {
    return EMPTY;
  }
  getSubscriptionList(
    _pageSize: number,
    _currentPage?: number,
    _sort?: string
  ): Observable<SubscriptionList | undefined> {
    return EMPTY;
  }
}
