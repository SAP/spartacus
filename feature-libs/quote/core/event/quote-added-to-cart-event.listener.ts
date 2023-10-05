/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, OnDestroy } from '@angular/core';
import {
  CartUiEventAddToCart,
  CartUpdateEntrySuccessEvent,
} from '@spartacus/cart/base/root';
import { EventService } from '@spartacus/core';
import { QuoteDetailsReloadQueryEvent } from '@spartacus/quote/root';

import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class QuoteAddedToCartEventListener implements OnDestroy {
  protected subscription = new Subscription();

  constructor(protected eventService: EventService) {
    this.onAddToCart();
  }

  protected onAddToCart() {
    this.subscription.add(
      this.eventService.get(CartUiEventAddToCart).subscribe(() => {
        this.eventService.dispatch({}, QuoteDetailsReloadQueryEvent);
      })
    );
    this.subscription.add(
      this.eventService.get(CartUpdateEntrySuccessEvent).subscribe(() => {
        this.eventService.dispatch({}, QuoteDetailsReloadQueryEvent);
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
