/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  EventService,
  LoadUserAddressesEvent,
  LoadUserPaymentMethodsEvent,
  UserActions,
} from '@spartacus/core';
import { Subscription } from 'rxjs';

/**
 * The event listener which dispatches legacy store actions.
 * It will be removed as soon as the legacy store is removed.
 */
// TODO:#deprecation-checkout remove once all the features using store are switched to c&q
@Injectable({
  providedIn: 'root',
})
export class CheckoutLegacyStoreEventListener implements OnDestroy {
  protected subscriptions = new Subscription();

  constructor(
    protected eventService: EventService,
    protected store: Store<unknown>
  ) {
    this.onUserAddressAction();
    this.onUserPaymentAction();
  }

  /**
   * Registers events for the user address actions.
   */
  protected onUserAddressAction(): void {
    this.subscriptions.add(
      this.eventService.get(LoadUserAddressesEvent).subscribe(({ userId }) => {
        /**
         * TODO:#deprecation-checkout We have to keep this here, since the user address feature is still ngrx-based.
         * Remove once it is switched from ngrx to c&q.
         * We should dispatch an event, which will reload the userAddress$ query.
         */
        this.store.dispatch(new UserActions.LoadUserAddresses(userId));
      })
    );
  }

  /**
   * Registers events for the user payment actions.
   */
  protected onUserPaymentAction(): void {
    this.subscriptions.add(
      this.eventService
        .get(LoadUserPaymentMethodsEvent)
        .subscribe(({ userId }) => {
          this.store.dispatch(
            /**
             * TODO:#deprecation-checkout We have to keep this here, since the user payment feature is still ngrx-based.
             * Remove once it is switched from ngrx to c&q.
             * We should dispatch an event, which will load the userPayment$ query.
             */
            new UserActions.LoadUserPaymentMethods(userId)
          );
        })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
