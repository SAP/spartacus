/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { inject, Injectable } from '@angular/core';
import {
  AddedToCartDialogComponentData,
  AddedToCartDialogEventListener,
} from '@spartacus/cart/base/components';
import { CartUiEventAddToCart } from '@spartacus/cart/base/root';
import { getLastValueSync } from '@spartacus/core';
import { LAUNCH_CALLER } from '@spartacus/storefront';
import { take } from 'rxjs/operators';
import { PunchoutDetectionService } from './punchout-detection.service';

@Injectable({
  providedIn: 'root',
})
export class PunchoutAddedToCartDialogEventListener extends AddedToCartDialogEventListener {
  /**
   * Opens modal based on CartUiEventAddToCart.
   * @param event Signals that a product has been added to the cart.
   */

  protected punchoutDetectionService = inject(PunchoutDetectionService);

  protected openModal(event: CartUiEventAddToCart): void {
    const addToCartData: AddedToCartDialogComponentData = {
      productCode: event.productCode,
      quantity: event.quantity,
      numberOfEntriesBeforeAdd: event.numberOfEntriesBeforeAdd,
      pickupStoreName: event.pickupStoreName,
      addingEntryResult$: this.createCompletionObservable(),
      disableProceedToCheckoutButton: getLastValueSync(
        this.punchoutDetectionService.isPunchoutSessionActive()
      ),
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
