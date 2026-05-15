/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, inject, OnDestroy } from '@angular/core';
import { CheckoutPaymentFacade } from '@spartacus/checkout/base/root';
import { OpfMetadataStoreService } from '@spartacus/opf/base/root';
import { BehaviorSubject, Subscription } from 'rxjs';
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

  /**
   * Tracks whether a card was selected from the saved cards list.
   * Used to distinguish between "just selecting saved cards" vs "selecting a card for payment"
   */
  protected cardSelected$ = new BehaviorSubject<boolean>(false);

  /**
   * Persists the ID of the last saved card the user selected for payment.
   * Survives component destruction so selection is retained when navigating back.
   */
  readonly selectedPaymentMethodId$ = new BehaviorSubject<string | undefined>(
    undefined
  );

  constructor() {
    this.listenForPaymentTransitions();
  }

  /**
   * Marks saved cards as the selected payment option
   * by writing SAVED_CARDS_ID to the metadata store.
   */
  selectSavedCards(): void {
    // Reset card selection flag when user selects saved cards option
    this.cardSelected$.next(false);
    this.opfMetadataStoreService.updateOpfMetadata({
      selectedPaymentOptionId: SAVED_CARDS_ID,
    });
  }

  /**
   * Marks that a specific card has been selected from the saved cards list
   * and persists its ID so it can be restored after navigation.
   */
  markCardAsSelected(id?: string): void {
    this.cardSelected$.next(true);
    if (id !== undefined) {
      this.selectedPaymentMethodId$.next(id);
    }
  }

  /**
   * Clears the persisted selected card ID.
   * Call this when the user fully leaves saved-cards mode.
   */
  clearSelectedPaymentMethodId(): void {
    this.selectedPaymentMethodId$.next(undefined);
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
   * Determines if user is transitioning away from saved cards to a specific payment method.
   * Checks that:
   * - Previous payment was SAVED_CARDS_ID
   * - Current payment is not SAVED_CARDS_ID
   * - Current payment is defined
   * - A card was actually selected from saved cards list
   */
  private isTransitioningFromSavedCardsWithCardSelected(
    prev: number | undefined,
    curr: number | undefined
  ): boolean {
    return (
      prev === SAVED_CARDS_ID &&
      curr !== SAVED_CARDS_ID &&
      curr !== undefined &&
      this.cardSelected$.value
    );
  }
  /**
   * Watches the metadata store for transitions from SAVED_CARDS_ID
   * to any other payment option. When detected and a card was previously selected,
   * deletes the saved payment details from the backend.
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
          if (this.isTransitioningFromSavedCardsWithCardSelected(prev, curr)) {
            this.checkoutPaymentFacade.deletePaymentDetails().subscribe();
            // Reset the flag after deleting
            this.cardSelected$.next(false);
          }
        })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
