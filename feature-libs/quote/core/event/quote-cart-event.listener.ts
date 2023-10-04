/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, OnDestroy } from '@angular/core';
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
  protected subscription = new Subscription();

  constructor(protected eventService: EventService) {
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
      this.eventService.get(CartRemoveEntrySuccessEvent).subscribe((g) => {
        console.log("CHHI remove: " + JSON.stringify(g));
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
