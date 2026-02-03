/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  CxDatePipe,
  EventService,
  TranslatePipe,
  UrlPipe,
} from '@spartacus/core';
import { SpinnerComponent } from '@spartacus/storefront';
import {
  GetSubscriptionBillByCodeReloadEvent,
  SubscriptionBill,
  SubscriptionBillingFacade,
} from '@spartacus/subscription-billing/root';
import { Observable } from 'rxjs';

@Component({
  selector: 'cx-subscription-billing-details',
  templateUrl: './subscription-billing-details.component.html',
  imports: [SpinnerComponent, TranslatePipe, UrlPipe, RouterLink, CxDatePipe],
})
export class SubscriptionBillingDetailsComponent implements OnInit {
  protected subscriptionBillingFacade = inject(SubscriptionBillingFacade);
  protected eventService = inject(EventService);
  protected subscriptionBill$: Observable<SubscriptionBill | undefined> =
    this.subscriptionBillingFacade.getSubscriptionBillByCode();

  ngOnInit() {
    this.eventService.dispatch({}, GetSubscriptionBillByCodeReloadEvent);
  }
}
