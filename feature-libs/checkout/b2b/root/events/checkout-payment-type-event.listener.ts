/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, OnDestroy } from '@angular/core';
import {
  CheckoutQueryResetEvent,
  CheckoutSupportedDeliveryModesQueryResetEvent,
} from '@spartacus/checkout/base/root';
import {
  CurrencySetEvent,
  EventService,
  LanguageSetEvent,
  LoginEvent,
  LogoutEvent,
} from '@spartacus/core';
import { merge, Subscription } from 'rxjs';
import {
  CheckoutPaymentTypeSetEvent,
  CheckoutPaymentTypesQueryReloadEvent,
  CheckoutPaymentTypesQueryResetEvent,
} from './checkout-b2b.events';

@Injectable({
  providedIn: 'root',
})
export class CheckoutPaymentTypeEventListener implements OnDestroy {
  protected subscriptions = new Subscription();

  constructor(protected eventService: EventService) {
    this.onPaymentTypeSet();

    this.onGetPaymentTypesQueryReload();
    this.onGetPaymentTypesQueryReset();
  }

  protected onPaymentTypeSet(): void {
    this.subscriptions.add(
      this.eventService
        .get(CheckoutPaymentTypeSetEvent)
        .subscribe(({ userId, cartId }) => {
          this.eventService.dispatch(
            { userId, cartId },
            CheckoutSupportedDeliveryModesQueryResetEvent
          );
          this.eventService.dispatch({}, CheckoutQueryResetEvent);
        })
    );
  }

  protected onGetPaymentTypesQueryReload(): void {
    this.subscriptions.add(
      merge(
        this.eventService.get(LanguageSetEvent),
        this.eventService.get(CurrencySetEvent)
      ).subscribe(() => {
        this.eventService.dispatch({}, CheckoutPaymentTypesQueryReloadEvent);
      })
    );
  }

  protected onGetPaymentTypesQueryReset(): void {
    this.subscriptions.add(
      merge(
        this.eventService.get(LogoutEvent),
        this.eventService.get(LoginEvent)
      ).subscribe(() => {
        this.eventService.dispatch({}, CheckoutPaymentTypesQueryResetEvent);
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
