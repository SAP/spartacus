/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { inject, Injectable, OnDestroy } from '@angular/core';
import {
  CurrencySetEvent,
  EventService,
  GlobalMessageService,
  LanguageSetEvent,
} from '@spartacus/core';
import { merge, Subscription } from 'rxjs';
import { GetSubscriptionByCodeReloadEvent } from './subscription-billing.events';

@Injectable({
  providedIn: 'root',
})
export class SubscriptionBillingEventListener implements OnDestroy {
  protected subscriptions = new Subscription();
  protected eventService = inject(EventService);
  protected globalMessageService = inject(GlobalMessageService);

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
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
