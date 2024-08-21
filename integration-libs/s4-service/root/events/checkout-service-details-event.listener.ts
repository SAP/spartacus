/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, OnDestroy } from '@angular/core';
import { EventService } from '@spartacus/core';
import { Subscription } from 'rxjs';
import { CheckoutServiceDetailsSetEvent } from './checkout-service-details.events';
import { CheckoutQueryResetEvent } from '@spartacus/checkout/base/root';

@Injectable({
  providedIn: 'root',
})
export class CheckoutServiceDetailsEventListener implements OnDestroy {
  protected subscriptions = new Subscription();

  constructor(protected eventService: EventService) {
    this.onServiceDetailsSet();
  }

  protected onServiceDetailsSet(): void {
    this.subscriptions.add(
      this.eventService.get(CheckoutServiceDetailsSetEvent).subscribe(() => {
        this.eventService.dispatch({}, CheckoutQueryResetEvent);
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
