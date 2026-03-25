/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, inject, OnDestroy } from '@angular/core';
import { CheckoutPaymentFacade } from '@spartacus/checkout/base/root';
import { OpfMetadataStoreService } from '@spartacus/opf/base/root';
import { Subscription } from 'rxjs';
import { distinctUntilChanged, map, pairwise } from 'rxjs/operators';

export const SAVED_CARDS_ID = -1;

/**
 * Manages saved cards selection state and payment method transitions.
 * Reactively triggers deletion of saved payment details when the user
 * switches from saved cards to an active payment provider.
 */
@Injectable({
  providedIn: 'root',
})
export class OpfTokenisationSavedCardsService implements OnDestroy {
  protected checkoutPaymentFacade = inject(CheckoutPaymentFacade);
  protected opfMetadataStoreService = inject(OpfMetadataStoreService);

  protected subscription = new Subscription();

  constructor() {
    this.listenForPaymentTransitions();
  }

  /**
   * Marks saved cards as the selected payment option
   * by writing SAVED_CARDS_ID to the metadata store.
   */
  selectSavedCards(): void {
    this.opfMetadataStoreService.updateOpfMetadata({
      selectedPaymentOptionId: SAVED_CARDS_ID,
    });
  }

  /**
   * Returns whether saved cards are currently selected
   * based on the metadata store value.
   */
  areSavedCardsSelected(): boolean {
    return (
      this.opfMetadataStoreService.opfMetadataState.value
        .selectedPaymentOptionId === SAVED_CARDS_ID
    );
  }

  /**
   * Watches the metadata store for transitions from SAVED_CARDS_ID
   * to any other payment option. When detected, deletes the saved
   * payment details from the backend.
   */
  protected listenForPaymentTransitions(): void {
    this.subscription.add(
      this.opfMetadataStoreService
        .getOpfMetadataState()
        .pipe(
          map((state) => state.selectedPaymentOptionId),
          distinctUntilChanged(),
          pairwise()
        )
        .subscribe(([prev, curr]) => {
          if (
            prev === SAVED_CARDS_ID &&
            curr !== SAVED_CARDS_ID &&
            curr !== undefined
          ) {
            this.checkoutPaymentFacade.deletePaymentDetails().subscribe();
          }
        })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
