import {
  SubscriptionList,
  SubscriptionDetail,
} from '@spartacus/subscription-billing/root';
import { Observable } from 'rxjs';

export abstract class SubscriptionBillingAdapter {
  abstract getSubscriptionDetail(
    userId: string,
    subscriptionCode: string
  ): Observable<SubscriptionDetail>;
  abstract getSubscriptionList(
    userId: string,
    pageSize?: number,
    currentPage?: number,
    sort?: string
  ): Observable<SubscriptionList>;
}
