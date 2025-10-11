/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  Component,
  inject,
  OnInit,
  OnDestroy,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { EventService } from '@spartacus/core';
import { LAUNCH_CALLER, LaunchDialogService } from '@spartacus/storefront';
import {
  GetSubscriptionByCodeReloadEvent,
  SubscriptionBillingFacade,
  SubscriptionDetail,
} from '@spartacus/subscription-billing/root';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'cx-subscription-details',
  templateUrl: './subscription-details.component.html',
  standalone: false,
})
export class SubscriptionDetailsComponent implements OnInit, OnDestroy {
  protected subscriptionFacade = inject(SubscriptionBillingFacade);
  protected eventService = inject(EventService);
  protected launchDialogService = inject(LaunchDialogService);
  @ViewChild('extendSubscriptionBtn') extendSubscriptionBtn: ElementRef;
  subscriptionContractFrequency?: string;
  subscriptionDetails$: Observable<SubscriptionDetail | undefined> =
    of(undefined);

  ngOnInit() {
    this.eventService.dispatch({}, GetSubscriptionByCodeReloadEvent);
    this.subscriptionDetails$ = this.subscriptionFacade.getSubscriptionByCode();
    this.subscriptionDetails$.subscribe((details) => 
      this.subscriptionContractFrequency = details?.contractFrequency
    );
  }

  showExtendSubscriptionDialog() {
    this.launchDialogService.openDialogAndSubscribe(
      LAUNCH_CALLER.EXTEND_SUBSCRIPTION,
      this.extendSubscriptionBtn,
      this.subscriptionContractFrequency
    );
  }

  ngOnDestroy(): void {
    this.launchDialogService.closeDialog(
      'Moved away from subscription details page'
    );
  }
}
