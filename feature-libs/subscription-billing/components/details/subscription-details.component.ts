/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { EventService } from '@spartacus/core';
import {
  EXTENDED_LAUNCH_CALLER,
  GetSubscriptionByCodeReloadEvent,
  SubscriptionBillingFacade,
  SubscriptionDetail,
} from '@spartacus/subscription-billing/root';
import { Observable, of, Subscription, take } from 'rxjs';
import { LaunchDialogService } from '@spartacus/storefront';

@Component({
  selector: 'cx-subscription-details',
  templateUrl: './subscription-details.component.html',
  standalone: false,
})
export class SubscriptionDetailsComponent implements OnInit, OnDestroy {
  protected subscriptionFacade = inject(SubscriptionBillingFacade);
  protected eventService = inject(EventService);
  protected launchDialogService = inject(LaunchDialogService);
  subscriptionDetails$: Observable<SubscriptionDetail | undefined> =
    of(undefined);
  protected subscription = new Subscription();
  ngOnInit() {
    this.eventService.dispatch({}, GetSubscriptionByCodeReloadEvent);
    this.subscriptionDetails$ = this.subscriptionFacade.getSubscriptionByCode();
  }
  showSubscriptionActionsDialog(
    mode: 'cancel' | 'withdraw' | 'resubscribe'
  ): void {
    const sub = this.subscriptionDetails$
      .pipe(take(1))
      .subscribe((subscription) => {
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

    this.subscription.add(sub);
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
