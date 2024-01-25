/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { CardType, PaymentDetails } from '@spartacus/cart/base/root';
import { facadeFactory, QueryState } from '@spartacus/core';
import { Observable } from 'rxjs';
import { CHECKOUT_CORE_FEATURE } from '../feature-name';

@Injectable({
  providedIn: 'root',
  useFactory: () =>
    facadeFactory({
      facade: CheckoutPaymentFacade,
      feature: CHECKOUT_CORE_FEATURE,
      methods: [
        'getPaymentCardTypesState',
        'getPaymentCardTypes',
        'getPaymentDetailsState',
        'createPaymentDetails',
        'setPaymentDetails',
      ],
      // TODO:#deprecation-checkout - remove once we remove ngrx
      async: true,
    }),
})
export abstract class CheckoutPaymentFacade {
  /**
   * Returns the card types state
   */
  abstract getPaymentCardTypesState(): Observable<
    QueryState<CardType[] | undefined>
  >;
  /**
   * Returns the card types, or an empty array if the data is undefined.
   */
  abstract getPaymentCardTypes(): Observable<CardType[]>;
  /**
   * Returns the payment details state
   */
  abstract getPaymentDetailsState(): Observable<
    QueryState<PaymentDetails | undefined>
  >;
  /**
   * Creates the payment details using the provided paymentDetails
   */
  abstract createPaymentDetails(
    paymentDetails: PaymentDetails
  ): Observable<unknown>;
  /**
   * Sets the payment details to the current cart
   */
  abstract setPaymentDetails(
    paymentDetails: PaymentDetails
  ): Observable<unknown>;
}
