/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, OnDestroy } from '@angular/core';
import { DeleteCartEvent } from '@spartacus/cart/base/root';
import { EventService, LoginEvent, LogoutEvent } from '@spartacus/core';
import { OrderPlacedEvent } from '@spartacus/order/root';
import { merge, Subscription } from 'rxjs';
import { OpfProcessingPaymentClearEvent, OpfUiClearEvent } from './opf.events';

@Injectable({
  providedIn: 'root',
})
export class CheckoutOpfEventListener implements OnDestroy {
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

  protected onOpfProcessingPaymentResetConditionsMet(): void {
    this.subscriptions.add(
      merge(
        this.eventService.get(LogoutEvent),
        this.eventService.get(LoginEvent),
        this.eventService.get(OrderPlacedEvent),
        this.eventService.get(DeleteCartEvent)
      ).subscribe(() =>
        this.eventService.dispatch({}, OpfProcessingPaymentClearEvent)
      )
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
