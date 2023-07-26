/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, OnDestroy } from '@angular/core';
import { CreateCartEvent } from '@spartacus/cart/base/root';
import { EventService, LoginEvent } from '@spartacus/core';
import { OrderPlacedEvent } from '@spartacus/order/root';
import { Subscription, merge } from 'rxjs';
import { OpfService } from '../services';

@Injectable({
  providedIn: 'root',
})
export class OpfEventListenerService implements OnDestroy {
  protected subscriptions = new Subscription();

  constructor(
    protected eventService: EventService,
    protected opfService: OpfService
  ) {
    this.onOpfPaymentMetadataResetConditionsMet();
  }

  protected onOpfPaymentMetadataResetConditionsMet(): void {
    this.subscriptions.add(
      merge(
        this.eventService.get(LoginEvent),
        this.eventService.get(OrderPlacedEvent),
        this.eventService.get(CreateCartEvent)
      ).subscribe(() => this.opfService.clearOpfMetadataState())
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
