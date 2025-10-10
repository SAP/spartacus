/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  Component,
  ElementRef,
  inject,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { EventService } from '@spartacus/core';
import { LAUNCH_CALLER, LaunchDialogService } from '@spartacus/storefront';
import {
  GetSubscriptionByCodeReloadEvent,
  SubscriptionBillingFacade,
  SubscriptionDetail,
} from '@spartacus/subscription-billing/root';
import { combineLatest, Observable, Subscription, take, tap } from 'rxjs';
@Component({
  selector: 'cx-subscription-details',
  templateUrl: './subscription-details.component.html',
  standalone: false,
})
export class SubscriptionDetailsComponent implements OnDestroy, OnInit {
  protected subscriptionFacade = inject(SubscriptionBillingFacade);
  protected eventService = inject(EventService);
  protected subscription = new Subscription();
  protected launchDialogService = inject(LaunchDialogService);
  @ViewChild('extendSubscriptionBtn') extendSubscriptionBtn: ElementRef;
  subscriptionContractFrequency: string;
  subscriptionDetails$: Observable<SubscriptionDetail | undefined> =
    this.subscriptionFacade.getSubscriptionByCode();

  ngOnInit() {
    this.subscription = combineLatest([
      this.subscriptionDetails$,
      this.subscriptionFacade.getSubscriptionCodeFromRoute(),
    ])
      .pipe(
        take(2),
        tap(([subscriptionDetails, subscriptionCode]) => {
          if (
            subscriptionDetails &&
            subscriptionDetails.id !== subscriptionCode
          ) {
            this.eventService.dispatch({}, GetSubscriptionByCodeReloadEvent);
          }
        }),
        tap(([subscription, _]) => {
          this.subscriptionContractFrequency =
            subscription?.contractFrequency ?? '';
        })
      )
      .subscribe();
  }

  showExtendSubscriptionDialog() {
    this.launchDialogService.openDialogAndSubscribe(
      LAUNCH_CALLER.EXTEND_SUBSCRIPTION,
      this.extendSubscriptionBtn,
      this.subscriptionContractFrequency
    );
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();

    this.launchDialogService.closeDialog(
      'Moved away from subscription details page'
    );
  }
}
