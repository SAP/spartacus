import { Injectable } from '@angular/core';
import { SubscriptionBillingAdapter } from '@spartacus/subscription-billing/core';
import {
  SubscriptionDetail,
  SubscriptionList,
} from '@spartacus/subscription-billing/root';
import { Observable, of } from 'rxjs';

@Injectable()
export class OccSubscriptionBillingAdapter
  implements SubscriptionBillingAdapter
{
  getSubscriptionDetail(
    _userId: string,
    _subscriptionCode: string
  ): Observable<SubscriptionDetail> {
    return of({});
  }
  getSubscriptionList(_userId: string): Observable<SubscriptionList> {
    return of({});
  }
}
