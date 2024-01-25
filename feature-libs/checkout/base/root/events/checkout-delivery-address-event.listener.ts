/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, OnDestroy } from '@angular/core';
import { ActiveCartFacade, DeleteCartEvent } from '@spartacus/cart/base/root';
import {
  DeleteUserAddressEvent,
  EventService,
  GlobalMessageService,
  GlobalMessageType,
  LoadUserAddressesEvent,
  OCC_USER_ID_ANONYMOUS,
  UpdateUserAddressEvent,
  UserAddressEvent,
} from '@spartacus/core';
import { Subscription } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import { CheckoutDeliveryAddressFacade } from '../facade/checkout-delivery-address.facade';
import {
  CheckoutDeliveryAddressClearedEvent,
  CheckoutDeliveryAddressCreatedEvent,
  CheckoutDeliveryAddressSetEvent,
  CheckoutQueryResetEvent,
  CheckoutSupportedDeliveryModesQueryResetEvent,
} from './checkout.events';

/**
 * Checkout delivery address event listener.
 */
@Injectable({
  providedIn: 'root',
})
export class CheckoutDeliveryAddressEventListener implements OnDestroy {
  protected subscriptions = new Subscription();

  constructor(
    protected checkoutDeliveryAddressFacade: CheckoutDeliveryAddressFacade,
    protected eventService: EventService,
    protected globalMessageService: GlobalMessageService,
    protected activeCartFacade: ActiveCartFacade
  ) {
    this.onDeliveryAddressCreated();
    this.onDeliveryAddressSet();
    this.onDeliveryAddressCleared();

    this.onUserAddressChange();

    this.onCartDeleted();
  }

  /**
   * Registers listeners for the User address events.
   */
  protected onUserAddressChange(): void {
    this.subscriptions.add(
      this.eventService
        .get(UserAddressEvent)
        .pipe(
          filter(
            (event) =>
              event instanceof UpdateUserAddressEvent ||
              event instanceof DeleteUserAddressEvent
          ),
          switchMap(({ userId }) =>
            this.activeCartFacade
              .takeActiveCartId()
              .pipe(map((cartId) => ({ cartId, userId })))
          )
        )
        .subscribe(({ cartId, userId }) => {
          // we want to LL the checkout (if not already loaded), in order to clear the checkout data that's potentially set on the back-end
          this.checkoutDeliveryAddressFacade.clearCheckoutDeliveryAddress();

          this.eventService.dispatch(
            { cartId, userId },
            CheckoutSupportedDeliveryModesQueryResetEvent
          );
        })
    );
  }

  protected onDeliveryAddressCreated(): void {
    this.subscriptions.add(
      this.eventService
        .get(CheckoutDeliveryAddressCreatedEvent)
        .subscribe(({ cartId, userId }) => {
          if (userId !== OCC_USER_ID_ANONYMOUS) {
            this.eventService.dispatch({ userId }, LoadUserAddressesEvent);
          }

          this.globalMessageService.add(
            { key: 'addressForm.userAddressAddSuccess' },
            GlobalMessageType.MSG_TYPE_CONFIRMATION
          );

          this.eventService.dispatch(
            { userId, cartId },
            CheckoutSupportedDeliveryModesQueryResetEvent
          );

          this.eventService.dispatch({}, CheckoutQueryResetEvent);
        })
    );
  }

  protected onDeliveryAddressSet(): void {
    this.subscriptions.add(
      this.eventService
        .get(CheckoutDeliveryAddressSetEvent)
        .subscribe(({ userId, cartId }) => {
          this.eventService.dispatch(
            { userId, cartId },
            CheckoutSupportedDeliveryModesQueryResetEvent
          );

          this.eventService.dispatch({}, CheckoutQueryResetEvent);
        })
    );
  }

  protected onDeliveryAddressCleared(): void {
    this.subscriptions.add(
      this.eventService
        .get(CheckoutDeliveryAddressClearedEvent)
        .subscribe(() =>
          this.eventService.dispatch({}, CheckoutQueryResetEvent)
        )
    );
  }

  protected onCartDeleted(): void {
    this.subscriptions.add(
      this.eventService
        .get(DeleteCartEvent)
        .subscribe(() =>
          this.eventService.dispatch({}, CheckoutQueryResetEvent)
        )
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
