/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, OnDestroy } from '@angular/core';
import {
  CartAddEntryFailEvent,
  CartAddEntrySuccessEvent,
  CartUiEventAddToCart,
} from '@spartacus/cart/base/root';
import { EventService } from '@spartacus/core';
import { LAUNCH_CALLER, LaunchDialogService } from '@spartacus/storefront';
import { Subscription, combineLatest } from 'rxjs';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AddedToCartDialogEventListener implements OnDestroy {
  protected subscription = new Subscription();

  constructor(
    protected eventService: EventService,
    protected launchDialogService: LaunchDialogService
  ) {
    this.onAddToCart();
  }

  protected onAddToCart() {
    this.subscription.add(
      combineLatest([
        this.eventService.get(CartUiEventAddToCart),
        this.eventService.get(CartAddEntrySuccessEvent),
      ]).subscribe(([event, successEvent]) => {
        this.openModalAfterSuccess(event, successEvent);
      })
    );

    this.subscription.add(
      this.eventService.get(CartAddEntryFailEvent).subscribe((event) => {
        this.closeModal(event);
      })
    );
  }
  /**
   * @deprecated
   * Opens modal based on CartUiEventAddToCart.
   * @param event Signals that a product has been added to the cart.
   */
  protected openModal(event: CartUiEventAddToCart): void {
    const addToCartData = {
      productCode: event.productCode,
      quantity: event.quantity,
      numberOfEntriesBeforeAdd: event.numberOfEntriesBeforeAdd,
      pickupStoreName: event.pickupStoreName,
    };

    const dialog = this.launchDialogService.openDialog(
      LAUNCH_CALLER.ADDED_TO_CART,
      undefined,
      undefined,
      addToCartData
    );

    if (dialog) {
      dialog.pipe(take(1)).subscribe();
    }
  }

  /**
   * Opens modal after addToCart has been successfully performed.
   * @param event Signals that a product has been added to the cart.
   * @param successEvent Signals that the backend call succeeded.
   */
  protected openModalAfterSuccess(
    event: CartUiEventAddToCart,
    successEvent: CartAddEntrySuccessEvent
  ): void {
    const addToCartData = {
      productCode: successEvent.productCode,
      quantity: successEvent.quantity,
      numberOfEntriesBeforeAdd: event.numberOfEntriesBeforeAdd,
      pickupStoreName: event.pickupStoreName,
    };

    const dialog = this.launchDialogService.openDialog(
      LAUNCH_CALLER.ADDED_TO_CART,
      undefined,
      undefined,
      addToCartData
    );

    if (dialog) {
      dialog.pipe(take(1)).subscribe();
    }
  }

  protected closeModal(reason?: any): void {
    this.launchDialogService.closeDialog(reason);
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
