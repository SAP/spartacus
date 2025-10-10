/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { EventService } from '@spartacus/core';
import {
  EXTENDED_LAUNCH_CALLER,
  GetSubscriptionByCodeReloadEvent,
  SubscriptionBillingFacade,
  SubscriptionDetail,
} from '@spartacus/subscription-billing/root';

import { combineLatest, Observable, Subscription, take, tap } from 'rxjs';

import { LaunchDialogService } from '@spartacus/storefront';

@Component({
  selector: 'cx-subscription-details',
  templateUrl: './subscription-details.component.html',
  standalone: false,
})
export class SubscriptionDetailsComponent implements OnDestroy, OnInit {
  protected subscriptionFacade = inject(SubscriptionBillingFacade);
  protected eventService = inject(EventService);
  protected launchDialogService = inject(LaunchDialogService);

  protected subscription = new Subscription();

  subscriptionDetails$: Observable<SubscriptionDetail | undefined> =
    this.subscriptionFacade.getSubscriptionByCode();
  ngOnInit() {
    this.subscription = combineLatest([
      this.subscriptionDetails$,
      this.subscriptionFacade.getSubscriptionCodeFromRoute(),
    ])
      .pipe(
        take(1),
        tap(([subscriptionDetails, subscriptionCode]) => {
          if (
            subscriptionDetails &&
            subscriptionDetails.id !== subscriptionCode
          ) {
            this.eventService.dispatch({}, GetSubscriptionByCodeReloadEvent);
          }
        })
      )
      .subscribe();
  }

  showSubscriptionDialog(mode: 'cancel' | 'withdraw' | 'resubscribe'): void {
    this.subscriptionDetails$.pipe(take(1)).subscribe((subscription) => {
      if (!subscription) return;

      const dataToPass = {
        ...subscription,
        code: subscription.id,
        mode,
      };

      this.launchDialogService.openDialogAndSubscribe(
        EXTENDED_LAUNCH_CALLER.SUBSCRIPTION_CONFIRMATION,
        undefined,
        dataToPass
      );
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
