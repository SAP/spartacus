/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, OnDestroy, inject } from '@angular/core';
import {
  CartAddEntryFailEvent,
  CartAddEntrySuccessEvent,
  CartUiEventAddToCart,
} from '@spartacus/cart/base/root';
import { EventService, FeatureConfigService } from '@spartacus/core';
import { LAUNCH_CALLER, LaunchDialogService } from '@spartacus/storefront';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { AddedToCartDialogComponentData } from './added-to-cart-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class AddedToCartDialogEventListener implements OnDestroy {
  protected subscription = new Subscription();
  private featureConfig = inject(FeatureConfigService);

  constructor(
    protected eventService: EventService,
    protected launchDialogService: LaunchDialogService
  ) {
    this.onAddToCart();
  }

  protected onAddToCart() {
    if (
      this.featureConfig.isEnabled('adddedToCartDialogDrivenBySuccessEvent')
    ) {
      this.subscription.add(
        this.eventService
          .get(CartAddEntrySuccessEvent)
          .subscribe((successEvent) => {
            this.openModalAfterSuccess(successEvent);
          })
      );
    } else {
      this.subscription.add(
        this.eventService.get(CartUiEventAddToCart).subscribe((event) => {
          this.openModal(event);
        })
      );
      this.subscription.add(
        this.eventService.get(CartAddEntryFailEvent).subscribe((event) => {
          this.closeModal(event);
        })
      );
    }
  }
  /**
   * @deprecated since 2211.24. Enable feature toggle 'adddedToCartDialogDrivenBySuccessEvent'
   * and use method openModalAfterSuccess instead.
   *
   * Opens modal based on CartUiEventAddToCart.
   * @param event Signals that a product has been added to the cart.
   */
  protected openModal(event: CartUiEventAddToCart): void {
    const addToCartData: AddedToCartDialogComponentData = {
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
   * @param successEvent Signals that the backend call succeeded.
   */
  protected openModalAfterSuccess(
    successEvent: CartAddEntrySuccessEvent
  ): void {
    const addToCartData: AddedToCartDialogComponentData = {
      productCode: successEvent.productCode,
      quantity: successEvent.quantity,
      numberOfEntriesBeforeAdd: 0,
      pickupStoreName: successEvent.pickupStore,
      addedEntryWasMerged: this.calculateEntryWasMerged(successEvent),
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

  protected calculateEntryWasMerged(
    successEvent: CartAddEntrySuccessEvent
  ): boolean {
    //In case quantityAdded zero, the system could have run into stock issues.
    //Then we continue and still launch the dialogue in 'merge' mode to not break compatibility
    const quantityAdded = successEvent.quantityAdded ?? 0;
    return (
      quantityAdded === 0 ||
      (successEvent.entry?.quantity ?? 0) - quantityAdded > 0
    );
  }

  protected closeModal(reason?: any): void {
    this.launchDialogService.closeDialog(reason);
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
