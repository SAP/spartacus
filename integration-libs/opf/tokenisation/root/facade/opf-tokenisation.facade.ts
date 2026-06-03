/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { facadeFactory } from '@spartacus/core';
import { Observable } from 'rxjs';
import { OPF_TOKENISATION_FEATURE } from '../feature-name';
import { OpfPaymentDetails } from '../model';

@Injectable({
  providedIn: 'root',
  useFactory: () =>
    facadeFactory({
      facade: OpfTokenisationFacade,
      feature: OPF_TOKENISATION_FEATURE,
      methods: [
        'getPaymentMethods',
        'getPaymentMethodsLoading',
        'loadPaymentMethods',
        'deletePaymentMethod',
        'setPaymentMethodAsDefault',
      ],
    }),
})
export abstract class OpfTokenisationFacade {
  /**
   * Returns all user's payment methods
   */
  abstract getPaymentMethods(): Observable<OpfPaymentDetails[]>;

  /**
   * Returns a loading flag for payment methods
   */
  abstract getPaymentMethodsLoading(): Observable<boolean>;

  /**
   * Loads all user's payment methods
   */
  abstract loadPaymentMethods(): void;

  /**
   * Deletes the payment method
   *
   * @param paymentMethodId a payment method ID
   */
  abstract deletePaymentMethod(paymentMethodId: string): void;

  /**
   * Sets the payment as a default one
   * @param paymentMethodId a payment method ID
   */
  abstract setPaymentMethodAsDefault(paymentMethodId: string): void;
}
