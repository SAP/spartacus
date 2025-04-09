import { inject, Injectable } from '@angular/core';
import { SubscriptionBillingAdapter } from './subscription-billing.adapter';
import { Observable } from 'rxjs';
import {
  SubscriptionDetail,
  SubscriptionList,
} from '@spartacus/subscription-billing/root';

@Injectable()
export class SubscriptionBillingConnector {
  protected adapter = inject(SubscriptionBillingAdapter);
  public getSubscriptionDetail(
    userId: string,
    subscriptionCode: string
  ): Observable<SubscriptionDetail> {
    return this.adapter.getSubscriptionDetail(userId, subscriptionCode);
  }
  public getSubscriptionList(
    userId: string,
    pageSize?: number,
    currentPage?: number,
    sort?: string
  ): Observable<SubscriptionList> {
    return this.adapter.getSubscriptionList(userId, pageSize, currentPage, sort);
  }
}
