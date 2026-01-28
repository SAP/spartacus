/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { inject, Injectable } from '@angular/core';
import { SubscriptionActionsAdapter } from './subscription-actions.adapter';
import { Observable } from 'rxjs';
import {
  SubscriptionCancellationDetails,
  SubscriptionExtensionEffectiveDate,
  SubscriptionWithdraw,
} from '@spartacus/subscription-billing/root';

@Injectable({
  providedIn: 'root',
})
export class SubscriptionActionsConnector {
  protected adapter = inject(SubscriptionActionsAdapter);
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

  public reverseCancellation(
    userId: string,
    subscriptionCode: string
  ): Observable<unknown> {
    return this.adapter.reverseCancellation(userId, subscriptionCode);
  }
  public withdrawSubscription(
    userId: string,
    subscriptionCode: string,
    withdrawalData: SubscriptionWithdraw
  ): Observable<unknown> {
    return this.adapter.withdrawSubscription(
      userId,
      subscriptionCode,
      withdrawalData
    );
  }

  public getExtensionEffectiveDate(
    userId: string,
    subscriptionCode: string,
    extendDuration: number,
    isUnlimitedDuration: boolean
  ): Observable<SubscriptionExtensionEffectiveDate> {
    return this.adapter.getExtensionEffectiveDate(
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
