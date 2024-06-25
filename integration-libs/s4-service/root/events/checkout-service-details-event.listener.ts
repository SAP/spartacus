/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, OnDestroy } from '@angular/core';
import { EventService } from '@spartacus/core';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CheckoutServiceDetailsEventListener implements OnDestroy {
  protected subscriptions = new Subscription();

  constructor(protected eventService: EventService) {}

  // fill this later based on what all events have to occur

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
