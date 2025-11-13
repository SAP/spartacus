/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, OnDestroy, inject } from '@angular/core';
import { RemoveCartEvent } from '@spartacus/cart/base/root';
import { EventService } from '@spartacus/core';
import { OrderPlacedEvent } from '@spartacus/order/root';
import { Subscription } from 'rxjs';
import { CheckoutQueryResetEvent } from './checkout.events';

@Injectable({
  providedIn: 'root',
})
export class CheckoutPlaceOrderEventListener implements OnDestroy {
  protected eventService = inject(EventService);

  protected subscriptions = new Subscription();

  /** Inserted by Angular inject() migration for backwards compatibility */
  constructor(...args: unknown[]);

  constructor() {
    this.onOrderPlaced();
  }

  protected onOrderPlaced(): void {
    this.subscriptions.add(
      this.eventService
        .get(OrderPlacedEvent)
        .subscribe(({ userId, cartId, cartCode }) => {
          this.eventService.dispatch(
            {
              userId,
              cartId,
              cartCode,
            },
            RemoveCartEvent
          );

          this.eventService.dispatch({}, CheckoutQueryResetEvent);
        })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
