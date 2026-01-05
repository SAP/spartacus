/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
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
  SubscriptionActionsFacade,
  SubscriptionCancellationDetails,
  SubscriptionExtensionEffectiveDate,
  SubscriptionWithdraw,
} from '@spartacus/subscription-billing/root';
import { Observable, switchMap, take, combineLatest, of } from 'rxjs';
import { SubscriptionActionsConnector } from '../connector';

@Injectable()
export class SubscriptionActionsService implements SubscriptionActionsFacade {
  protected queryService = inject(QueryService);
  protected userIdService = inject(UserIdService);
  protected subscriptionActionsConnector = inject(SubscriptionActionsConnector);
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
        return this.subscriptionActionsConnector.getEffectiveCancellationDate(
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
        return this.subscriptionActionsConnector.cancelSubscription(
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
        return this.subscriptionActionsConnector.reverseCancellation(
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
        return this.subscriptionActionsConnector.withdrawSubscription(
          userId,
          code,
          withdrawalData
        );
      })
    );
  }

  getExtensionEffectiveDate(
    extendDuration: number,
    isUnlimitedDuration: boolean,
    code: string
  ): Observable<SubscriptionExtensionEffectiveDate> {
    return combineLatest([this.userIdService.getUserId(), of(code)]).pipe(
      switchMap(([userId, subscriptionCode]) =>
        this.subscriptionActionsConnector.getExtensionEffectiveDate(
          userId,
          subscriptionCode,
          extendDuration,
          isUnlimitedDuration
        )
      )
    );
  }

  extendSubscription(
    extendDuration: number,
    isUnlimitedDuration: boolean,
    subscriptionCode: string
  ): Observable<any> {
    return combineLatest([
      this.userIdService.getUserId(),
      of(subscriptionCode),
    ]).pipe(
      take(1),
      switchMap(([userId, code]) =>
        this.subscriptionActionsConnector.extendSubscription(
          userId,
          code,
          extendDuration,
          isUnlimitedDuration
        )
      )
    );
  }
}
