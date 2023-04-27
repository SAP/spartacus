/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, OnDestroy } from '@angular/core';
import { EventService, LogoutEvent } from '@spartacus/core';
import { OrderPlacedEvent } from '@spartacus/order/root';
import { OpfUiClearEvent } from 'integration-libs/opf/root/events/opf.events';
import { merge, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CheckoutOpfUiClearConditionsEventListener implements OnDestroy {
  protected subscriptions = new Subscription();

  constructor(protected eventService: EventService) {
    this.onOpfUiStateResetConditionsMet();
  }

  protected onOpfUiStateResetConditionsMet(): void {
    this.subscriptions.add(
      merge(
        this.eventService.get(LogoutEvent),
        this.eventService.get(OrderPlacedEvent)
      ).subscribe(() => this.eventService.dispatch({}, OpfUiClearEvent))
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
