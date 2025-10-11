/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { inject, Injectable } from '@angular/core';
import { SubscriptionBillingActionAdapter } from './subscription-billing-action.adapter';
import { Observable } from 'rxjs';
import {
  SubscriptionCancellationDetails,
  SubscriptionWithdraw,
} from '@spartacus/subscription-billing/root';

@Injectable({
  providedIn: 'root',
})
export class SubscriptionBillingActionsConnector {
  protected adapter = inject(SubscriptionBillingActionAdapter);
  public getEffectiveCancellationDate(
    userId: string,
    subscriptionCode: string
  ): Observable<unknown> {
    return this.adapter.getEffectiveCancellationDate(userId, subscriptionCode);
  }
  public cancelSubscription(
    userId: string,
    subscriptionCode: string,
    cancellationDetails: SubscriptionCancellationDetails
  ): Observable<unknown> {
    return this.adapter.cancelSubscription(
      userId,
      subscriptionCode,
      cancellationDetails
    );
  }

  public reversecancellation(
    userId: string,
    subscriptionCode: string
  ): Observable<unknown> {
    return this.adapter.reverseCancellation(userId, subscriptionCode);
  }
  public withdrawal(
    userId: string,
    subscriptionCode: string,
    withdrawalData: SubscriptionWithdraw
  ): Observable<unknown> {
    return this.adapter.withdrawal(userId, subscriptionCode, withdrawalData);
  }
}
