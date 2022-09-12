/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, OnDestroy } from '@angular/core';
import { MergeCartSuccessEvent } from '@commerce-storefront-toolset/cart/base/root';
import {
  RestoreSavedCartSuccessEvent,
  SaveCartSuccessEvent,
} from '@commerce-storefront-toolset/cart/saved-cart/root';
import {
  CurrencySetEvent,
  EventService,
  LanguageSetEvent,
  LoginEvent,
  LogoutEvent,
} from '@commerce-storefront-toolset/core';
import { OrderPlacedEvent } from '@commerce-storefront-toolset/order/root';
import { merge, Subscription } from 'rxjs';
import {
  CheckoutQueryReloadEvent,
  CheckoutQueryResetEvent,
} from './checkout.events';

@Injectable({
  providedIn: 'root',
})
export class CheckoutQueryEventListener implements OnDestroy {
  protected subscriptions = new Subscription();

  constructor(protected eventService: EventService) {
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
