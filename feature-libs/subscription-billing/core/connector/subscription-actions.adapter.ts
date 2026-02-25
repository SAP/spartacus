/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  SubscriptionCancellationDetails,
  SubscriptionExtensionEffectiveDate,
  SubscriptionWithdraw,
} from '@spartacus/subscription-billing/root';
import { Observable } from 'rxjs';

export abstract class SubscriptionActionsAdapter {
  abstract getEffectiveCancellationDate(
    userId: string,
    subscriptionCode: string
  ): Observable<any>;
  abstract cancelSubscription(
    userId: string,
    subscriptionCode: string,
    cancellationDetails: SubscriptionCancellationDetails
  ): Observable<unknown>;

  abstract reverseCancellation(
    userId: string,
    subscriptionCode: string
  ): Observable<unknown>;

  abstract withdrawSubscription(
    userId: string,
    subscriptionCode: string,
    withdrawal: SubscriptionWithdraw
  ): Observable<unknown>;

  abstract getExtensionEffectiveDate(
    userId: string,
    subscriptionCode: string,
    extendDuration: number,
    isUnlimitedDuration: boolean
  ): Observable<SubscriptionExtensionEffectiveDate>;

  abstract extendSubscription(
    userId: string,
    subscriptionCode: string,
    extendDuration: number,
    isUnlimitedDuration: boolean
  ): Observable<any>;
}
