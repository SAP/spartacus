/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, inject, OnInit } from '@angular/core';
import { EventService } from '@spartacus/core';
import {
  GetSubscriptionByCodeReloadEvent,
  SubscriptionActionMode,
  SubscriptionFacade,
  SubscriptionDetail,
} from '@spartacus/subscription-billing/root';
import { Observable, of, take } from 'rxjs';
import { LAUNCH_CALLER, LaunchDialogService } from '@spartacus/storefront';

@Component({
  selector: 'cx-subscription-details',
  templateUrl: './subscription-details.component.html',
  standalone: false,
})
export class SubscriptionDetailsComponent implements OnInit {
  protected subscriptionFacade = inject(SubscriptionFacade);
  protected eventService = inject(EventService);
  protected launchDialogService = inject(LaunchDialogService);

  subscriptionDetails$: Observable<SubscriptionDetail | undefined> =
    of(undefined);

  ngOnInit() {
    this.eventService.dispatch({}, GetSubscriptionByCodeReloadEvent);
    this.subscriptionDetails$ = this.subscriptionFacade.getSubscriptionByCode();
  }

  showSubscriptionActionsDialog(mode: SubscriptionActionMode): void {
    this.subscriptionDetails$.pipe(take(1)).subscribe((subscription) => {
      if (!subscription) return;

      const dataToPass = {
        ...subscription,
        code: subscription.id,
        mode,
      };

      this.launchDialogService.openDialogAndSubscribe(
        LAUNCH_CALLER.SUBSCRIPTION_ACTION_CONFIRMATION,
        undefined,
        dataToPass
      );
    });
  }
}
