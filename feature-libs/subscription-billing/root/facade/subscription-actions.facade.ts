/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Observable } from 'rxjs';
import {
  SubscriptionCancellationDetails,
  SubscriptionExtensionEffectiveDate,
  SubscriptionWithdraw,
} from '../model';
import { Injectable } from '@angular/core';
import { SUBSCRIPTION_BILLING_FEATURE } from '../feature-name';
import { facadeFactory } from '@spartacus/core';

@Injectable({
  providedIn: 'root',
  useFactory: () =>
    facadeFactory({
      facade: SubscriptionActionsFacade,
      feature: SUBSCRIPTION_BILLING_FEATURE,
      methods: [
        'cancelSubscription',
        'getEffectiveCancellationDate',
        'reverseCancellation',
        'withdrawSubscription',
        'getExtensionEffectiveDate',
        'extendSubscription',
      ],
    }),
})
export abstract class SubscriptionActionsFacade {
  abstract cancelSubscription(
    cancellationDetails: SubscriptionCancellationDetails,
    code?: string
  ): Observable<unknown>;
  abstract getEffectiveCancellationDate(code: string): Observable<any>;

  abstract reverseCancellation(code?: string): Observable<unknown>;
  abstract withdrawSubscription(
    withdrawal: SubscriptionWithdraw,
    code?: string
  ): Observable<unknown>;

  abstract getExtensionEffectiveDate(
    extendDuration: number,
    isUnlimitedDuration: boolean,
    code: string
  ): Observable<SubscriptionExtensionEffectiveDate>;
  abstract extendSubscription(
    extendDuration: number,
    isUnlimitedDuration: boolean,
    code: string
  ): Observable<any>;
}
