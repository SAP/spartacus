/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { inject, Injectable } from '@angular/core';
import {
  QueryNotifier,
  QueryService,
  RoutingService,
  UserIdService,
} from '@spartacus/core';
import {
  GetSubscriptionByCodeReloadEvent,
  SubscriptionBillingActionsFacade,
  SubscriptionCancellationDetails,
  SubscriptionWithdraw,
} from '@spartacus/subscription-billing/root';
import { Observable, switchMap, take, combineLatest, of } from 'rxjs';
import {
  SubscriptionBillingConnector,
  SubscriptionBillingActionsConnector,
} from '../connector';

@Injectable()
export class SubscriptionBillingActionService
  implements SubscriptionBillingActionsFacade
{
  protected queryService = inject(QueryService);
  protected userIdService = inject(UserIdService);
  protected subscriptionBillingConnector = inject(SubscriptionBillingConnector);
  protected SubscriptionBillingActionsConnector = inject(
    SubscriptionBillingActionsConnector
  );
  protected routingService = inject(RoutingService);

  protected getSubscriptionByCodeReloadEvents(): QueryNotifier[] {
    return [GetSubscriptionByCodeReloadEvent];
  }

  getEffectiveCancellationDate(subscriptionCode?: string): Observable<unknown> {
    return combineLatest([
      this.userIdService.getUserId(),
      of(subscriptionCode),
    ]).pipe(
      take(1),
      switchMap(([userId, code]) => {
        if (!userId || !code) {
          throw new Error(
            'Cannot fetch cancellation effective date: missing user ID or subscription code.'
          );
        }
        return this.SubscriptionBillingActionsConnector.getEffectiveCancellationDate(
          userId,
          code
        );
      })
    );
  }

  cancelSubscription(
    cancellationDetails: SubscriptionCancellationDetails,
    subscriptionCode?: string
  ): Observable<unknown> {
    return combineLatest([
      this.userIdService.getUserId(),
      of(subscriptionCode),
    ]).pipe(
      take(1),
      switchMap(([userId, code]) => {
        if (!userId || !code) {
          throw new Error(
            'Cannot cancel subscription: missing user ID or subscription code.'
          );
        }
        return this.SubscriptionBillingActionsConnector.cancelSubscription(
          userId,
          code,
          cancellationDetails
        );
      })
    );
  }

  reverseCancellation(subscriptionCode?: string): Observable<unknown> {
    return combineLatest([
      this.userIdService.getUserId(),
      of(subscriptionCode),
    ]).pipe(
      take(1),
      switchMap(([userId, code]) => {
        if (!userId || !code) {
          throw new Error(
            'Cannot reverse cancellation: missing user ID or subscription code.'
          );
        }
        return this.SubscriptionBillingActionsConnector.reversecancellation(
          userId,
          code
        );
      })
    );
  }

  withdrawSubscription(
    withdrawalData: SubscriptionWithdraw,
    subscriptionCode?: string
  ): Observable<unknown> {
    return combineLatest([
      this.userIdService.getUserId(),
      of(subscriptionCode),
    ]).pipe(
      take(1),
      switchMap(([userId, code]) => {
        if (!userId || !code) {
          throw new Error(
            'Cannot withdraw subscription: missing user ID or subscription code.'
          );
        }
        return this.SubscriptionBillingActionsConnector.withdrawSubscription(
          userId,
          code,
          withdrawalData
        );
      })
    );
  }
}
