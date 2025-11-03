/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, OnDestroy, inject } from '@angular/core';
import { MergeCartSuccessEvent } from '@spartacus/cart/base/root';
import {
  RestoreSavedCartSuccessEvent,
  SaveCartSuccessEvent,
} from '@spartacus/cart/saved-cart/root';
import {
  CurrencySetEvent,
  EventService,
  LanguageSetEvent,
  LoginEvent,
  LogoutEvent,
} from '@spartacus/core';
import { OrderPlacedEvent } from '@spartacus/order/root';
import { merge, Subscription } from 'rxjs';
import {
  CheckoutQueryReloadEvent,
  CheckoutQueryResetEvent,
} from './checkout.events';

@Injectable({
  providedIn: 'root',
})
export class CheckoutQueryEventListener implements OnDestroy {
  protected eventService = inject(EventService);

  protected subscriptions = new Subscription();

  /** Inserted by Angular inject() migration for backwards compatibility */
  constructor(...args: unknown[]);

  constructor() {
    this.onCheckoutQueryReload();
    this.onCheckoutQueryReset();
  }

  protected onCheckoutQueryReload(): void {
    this.subscriptions.add(
      merge(
        this.eventService.get(LanguageSetEvent),
        this.eventService.get(CurrencySetEvent)
      ).subscribe(() => {
        this.eventService.dispatch({}, CheckoutQueryReloadEvent);
      })
    );
  }

  protected onCheckoutQueryReset(): void {
    this.subscriptions.add(
      merge(
        this.eventService.get(LogoutEvent),
        this.eventService.get(LoginEvent),
        this.eventService.get(SaveCartSuccessEvent),
        this.eventService.get(RestoreSavedCartSuccessEvent),
        this.eventService.get(MergeCartSuccessEvent),
        this.eventService.get(OrderPlacedEvent)
      ).subscribe(() => {
        this.eventService.dispatch({}, CheckoutQueryResetEvent);
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
