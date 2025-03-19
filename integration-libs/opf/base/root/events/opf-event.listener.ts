/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, OnDestroy, inject } from '@angular/core';
import { CreateCartEvent } from '@spartacus/cart/base/root';
import { EventService, LoginEvent } from '@spartacus/core';
import { OrderPlacedEvent } from '@spartacus/order/root';
import { Subscription, merge } from 'rxjs';
import { OpfMetadataStoreService } from '../services';

@Injectable({
  providedIn: 'root',
})
export class OpfEventListenerService implements OnDestroy {
  protected eventService = inject(EventService);
  protected opfMetadataStoreService = inject(OpfMetadataStoreService);

  protected subscriptions = new Subscription();

  constructor() {
    this.onOpfPaymentMetadataResetConditionsMet();
  }

  protected onOpfPaymentMetadataResetConditionsMet(): void {
    this.subscriptions.add(
      merge(
        this.eventService.get(LoginEvent),
        this.eventService.get(OrderPlacedEvent),
        this.eventService.get(CreateCartEvent)
      ).subscribe(() => this.opfMetadataStoreService.clearOpfMetadata())
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
