import { inject, Injectable } from '@angular/core';
import { SubscriptionBillingAdapter } from './subscription-billing.adapter';
import { Observable } from 'rxjs';
import {
  SubscriptionDetail,
  SubscriptionExtensionEffectiveDate,
  SubscriptionList,
} from '@spartacus/subscription-billing/root';

@Injectable()
export class SubscriptionBillingConnector {
  protected adapter = inject(SubscriptionBillingAdapter);
  public getSubscriptionByCode(
    userId: string,
    subscriptionCode: string
  ): Observable<SubscriptionDetail> {
    return this.adapter.getSubscriptionByCode(userId, subscriptionCode);
  }
  public getSubscriptionList(
    userId: string,
    pageSize?: number,
    currentPage?: number,
    sort?: string
  ): Observable<SubscriptionList> {
    return this.adapter.getSubscriptionList(
      userId,
      pageSize,
      currentPage,
      sort
    );
  }
  public getSubscriptionExtensionEffectiveDate(
    userId: string,
    subscriptionCode: string,
    extendDuration: number,
    isUnlimitedDuration: boolean
  ): Observable<SubscriptionExtensionEffectiveDate> {
    return this.adapter.getSubscriptionExtensionEffectiveDate(
      userId,
      subscriptionCode,
      extendDuration,
      isUnlimitedDuration
    );
  }
  public extendSubscription(
    userId: string,
    subscriptionCode: string,
    extendDuration: number,
    isUnlimitedDuration: boolean
  ): Observable<any> {
    return this.adapter.extendSubscription(
      userId,
      subscriptionCode,
      extendDuration,
      isUnlimitedDuration
    );
  }
}
