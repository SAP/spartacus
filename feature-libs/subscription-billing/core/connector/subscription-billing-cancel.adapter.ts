/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  CancellationDetails,
  Withdrawal,
} from '@spartacus/subscription-billing/root';
import { Observable } from 'rxjs';

export abstract class CancelSubscriptionOrderAdapter {
  abstract cancellationSubscriptionEffectiveDate(
    userId: string,
    subscriptionCode: string
  ): Observable<any>;
  abstract cancelSubscription(
    userId: string,
    subscriptionCode: string,
    cancellationDetails: CancellationDetails
  ): Observable<unknown>;

  abstract reverseCancellation(
    userId: string,
    subscriptionCode: string // reverseCancellation: reverseCancellation
  ): Observable<unknown>;

  abstract withdrawal(
    userId: string,
    subscriptionCode: string,
    withdrawal: Withdrawal
  ): Observable<unknown>;
}
