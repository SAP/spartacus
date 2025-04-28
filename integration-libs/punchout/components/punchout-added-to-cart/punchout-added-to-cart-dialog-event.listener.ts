/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { CartUiEventAddToCart } from '@spartacus/cart/base/root';
import { LAUNCH_CALLER } from '@spartacus/storefront';
import { take } from 'rxjs/operators';
import {
  AddedToCartDialogComponentData,
  AddedToCartDialogEventListener,
} from '@spartacus/cart/base/components';

@Injectable({
  providedIn: 'root',
})
export class PunchoutAddedToCartDialogEventListener extends AddedToCartDialogEventListener {
  /**
   * Opens modal based on CartUiEventAddToCart.
   * @param event Signals that a product has been added to the cart.
   */
  protected openModal(event: CartUiEventAddToCart): void {
    const addToCartData: AddedToCartDialogComponentData = {
      productCode: event.productCode,
      quantity: event.quantity,
      numberOfEntriesBeforeAdd: event.numberOfEntriesBeforeAdd,
      pickupStoreName: event.pickupStoreName,
      addingEntryResult$: this.createCompletionObservable(),
      disableProceedToCheckoutButton: true,
    };

    const dialog = this.launchDialogService.openDialog(
      LAUNCH_CALLER.ADDED_TO_CART,
      event?.triggerElementRef,
      undefined,
      addToCartData
    );

    if (dialog) {
      dialog.pipe(take(1)).subscribe();
    }
  }
}
