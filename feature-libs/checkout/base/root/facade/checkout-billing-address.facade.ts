/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { Address, facadeFactory } from '@spartacus/core';
import { Observable } from 'rxjs';
import { CHECKOUT_CORE_FEATURE } from '../feature-name';

@Injectable({
  providedIn: 'root',
  useFactory: () =>
    facadeFactory({
      facade: CheckoutBillingAddressFacade,
      feature: CHECKOUT_CORE_FEATURE,
      methods: ['setBillingAddress'],
      // TODO:#deprecation-checkout - remove once we remove ngrx
      async: true,
    }),
})
export abstract class CheckoutBillingAddressFacade {
  /**
   * Sets the billing address to the cart
   */
  abstract setBillingAddress(address: Address): Observable<unknown>;
}
