/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { inject, Injectable, OnDestroy } from '@angular/core';
import {
  CurrencySetEvent,
  EventService,
  LanguageSetEvent,
} from '@spartacus/core';
import { merge, Subscription } from 'rxjs';
import {
  GetSubscriptionByCodeReloadEvent,
  GetSubscriptionListReloadEvent,
} from './subscription-billing.events';

@Injectable({
  providedIn: 'root',
})
export class SubscriptionBillingEventListener implements OnDestroy {
  protected subscriptions = new Subscription();
  protected eventService = inject(EventService);

  constructor() {
    this.onLanguageAndCurrencySetEvent();
  }

  protected onLanguageAndCurrencySetEvent(): void {
    this.subscriptions.add(
      merge(
        this.eventService.get(LanguageSetEvent),
        this.eventService.get(CurrencySetEvent)
      ).subscribe(() => {
        this.eventService.dispatch({}, GetSubscriptionByCodeReloadEvent);
        this.eventService.dispatch({}, GetSubscriptionListReloadEvent);
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
