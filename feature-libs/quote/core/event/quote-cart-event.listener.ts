/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { inject, Injectable, OnDestroy } from '@angular/core';
import {
  CartAddEntrySuccessEvent,
  CartRemoveEntrySuccessEvent,
  CartUpdateEntrySuccessEvent,
} from '@spartacus/cart/base/root';
import { EventService } from '@spartacus/core';

import { Subscription } from 'rxjs';
import { QuoteDetailsReloadQueryEvent } from './quote.events';

@Injectable({
  providedIn: 'root',
})
export class QuoteCartEventListener implements OnDestroy {
  protected eventService = inject(EventService);
  protected subscription = new Subscription();

  constructor() {
    this.listenToCartEvents();
  }

  protected listenToCartEvents(): void {
    this.subscription.add(
      this.eventService.get(CartAddEntrySuccessEvent).subscribe(() => {
        this.triggerQuoteReload();
      })
    );
    this.subscription.add(
      this.eventService.get(CartUpdateEntrySuccessEvent).subscribe(() => {
        this.triggerQuoteReload();
      })
    );
    this.subscription.add(
      this.eventService.get(CartRemoveEntrySuccessEvent).subscribe(() => {
        this.triggerQuoteReload();
      })
    );
  }

  protected triggerQuoteReload(): void {
    this.eventService.dispatch({}, QuoteDetailsReloadQueryEvent);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
