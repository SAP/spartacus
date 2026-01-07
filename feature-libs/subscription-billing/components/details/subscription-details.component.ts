/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { AsyncPipe, NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  CxDatePipe,
  EventService,
  TranslatePipe,
  UrlPipe,
} from '@spartacus/core';
import {
  LAUNCH_CALLER,
  LaunchDialogService,
  SpinnerComponent,
} from '@spartacus/storefront';
import {
  GetSubscriptionByCodeReloadEvent,
  SubscriptionActionMode,
  SubscriptionDetail,
  SubscriptionFacade,
} from '@spartacus/subscription-billing/root';
import { Observable, of, take } from 'rxjs';

@Component({
  selector: 'cx-subscription-details',
  templateUrl: './subscription-details.component.html',
  imports: [
    NgIf,
    RouterLink,
    AsyncPipe,
    TranslatePipe,
    CxDatePipe,
    UrlPipe,
    SpinnerComponent,
  ],
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
