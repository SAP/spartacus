/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, OnDestroy } from '@angular/core';
import { LoadCartEvent } from '@spartacus/cart/base/root';
import {
  CurrencySetEvent,
  EventService,
  LanguageSetEvent,
  LoginEvent,
  LogoutEvent,
} from '@spartacus/core';
import { merge, Subscription } from 'rxjs';
import {
  CheckoutDeliveryModeClearedErrorEvent,
  CheckoutDeliveryModeClearedEvent,
  CheckoutDeliveryModeSetEvent,
  CheckoutQueryResetEvent,
  CheckoutSupportedDeliveryModesQueryReloadEvent,
  CheckoutSupportedDeliveryModesQueryResetEvent,
} from './checkout.events';

/**
 * Checkout delivery mode event listener.
 */
@Injectable({
  providedIn: 'root',
})
export class CheckoutDeliveryModeEventListener implements OnDestroy {
  protected subscriptions = new Subscription();

  constructor(protected eventService: EventService) {
    this.onDeliveryModeSet();
    this.onDeliveryModeCleared();
    this.onDeliveryModeClearedError();
    this.onDeliveryModeReset();

    this.onGetSupportedDeliveryModesQueryReload();
    this.onGetSupportedDeliveryModesQueryReset();
  }

  protected onDeliveryModeSet() {
    this.subscriptions.add(
      this.eventService
        .get(CheckoutDeliveryModeSetEvent)
        .subscribe(({ userId, cartId, cartCode }) => {
          this.eventService.dispatch({}, CheckoutQueryResetEvent);

          this.eventService.dispatch(
            {
              userId,
              cartId,
              cartCode,
            },
            LoadCartEvent
          );
        })
    );
  }

  protected onDeliveryModeCleared(): void {
    this.subscriptions.add(
      this.eventService
        .get(CheckoutDeliveryModeClearedEvent)
        .subscribe(({ userId, cartId, cartCode }) => {
          this.eventService.dispatch({}, CheckoutQueryResetEvent);

          this.eventService.dispatch(
            {
              userId,
              cartId,
              cartCode,
            },
            LoadCartEvent
          );
        })
    );
  }

  protected onDeliveryModeClearedError(): void {
    this.subscriptions.add(
      this.eventService
        .get(CheckoutDeliveryModeClearedErrorEvent)
        .subscribe(({ userId, cartId, cartCode }) => {
          this.eventService.dispatch({}, CheckoutQueryResetEvent);

          this.eventService.dispatch(
            {
              userId,
              cartId,
              cartCode,
            },
            LoadCartEvent
          );
        })
    );
  }

  /**
   * Registers listeners for the delivery mode clear event.
   * This is needed for when `CheckoutSupportedDeliveryModesQueryResetEvent` is dispatched
   * as we need to update the user's cart when the delivery mode is cleared from the backend checkout details.
   */
  protected onDeliveryModeReset(): void {
    this.subscriptions.add(
      this.eventService
        .get(CheckoutSupportedDeliveryModesQueryResetEvent)
        .subscribe(({ userId, cartId }) =>
          this.eventService.dispatch(
            {
              userId,
              cartId,
              /**
               * As we know the cart is not anonymous (precondition checked),
               * we can safely use the cartId, which is actually the cart.code.
               */
              cartCode: cartId,
            },
            LoadCartEvent
          )
        )
    );
  }

  protected onGetSupportedDeliveryModesQueryReload(): void {
    this.subscriptions.add(
      merge(
        this.eventService.get(LanguageSetEvent),
        this.eventService.get(CurrencySetEvent)
      ).subscribe(() => {
        this.eventService.dispatch(
          {},
          CheckoutSupportedDeliveryModesQueryReloadEvent
        );
      })
    );
  }

  protected onGetSupportedDeliveryModesQueryReset(): void {
    this.subscriptions.add(
      merge(
        this.eventService.get(LogoutEvent),
        this.eventService.get(LoginEvent)
      ).subscribe(() => {
        this.eventService.dispatch(
          {},
          CheckoutSupportedDeliveryModesQueryResetEvent
        );
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
