/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, OnDestroy } from '@angular/core';
import { RemoveCartEvent } from '@spartacus/cart/base/root';
import { CheckoutQueryResetEvent } from '@spartacus/checkout/base/root';
import { EventService } from '@spartacus/core';
import { ReplenishmentOrderScheduledEvent } from '@spartacus/order/root';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CheckoutScheduledReplenishmentEventListener implements OnDestroy {
  protected subscriptions = new Subscription();

  constructor(protected eventService: EventService) {
    this.onReplenishmentOrder();
  }

  protected onReplenishmentOrder() {
    this.subscriptions.add(
      this.eventService
        .get(ReplenishmentOrderScheduledEvent)
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
