/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { Address, facadeFactory, QueryState } from '@spartacus/core';
import { Observable } from 'rxjs';
import { CHECKOUT_CORE_FEATURE } from '../feature-name';

@Injectable({
  providedIn: 'root',
  useFactory: () =>
    facadeFactory({
      facade: CheckoutDeliveryAddressFacade,
      feature: CHECKOUT_CORE_FEATURE,
      methods: [
        'getDeliveryAddressState',
        'createAndSetAddress',
        'setDeliveryAddress',
        'clearCheckoutDeliveryAddress',
      ],
      // TODO:#deprecation-checkout - remove once we remove ngrx
      async: true,
    }),
})
export abstract class CheckoutDeliveryAddressFacade {
  /**
   * Returns the delivery address state
   */
  abstract getDeliveryAddressState(): Observable<
    QueryState<Address | undefined>
  >;
  /**
   * Creates and sets the delivery address using the provided address
   */
  abstract createAndSetAddress(address: Address): Observable<unknown>;
  /**
   * Sets the delivery address to the cart
   */
  abstract setDeliveryAddress(address: Address): Observable<unknown>;
  /**
   * Clears the delivery address set in the cart
   */
  abstract clearCheckoutDeliveryAddress(): Observable<unknown>;
}
