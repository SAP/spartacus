/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import {  UserPaymentService } from '@spartacus/core';
import { OpfTokenisationFacade } from '../../root/facade';
import { OpfPaymentDetails } from '../../public_api';

@Injectable()
export class OpfTokenisationService implements OpfTokenisationFacade {
  protected userPaymentService = inject(UserPaymentService);

  /**
   * Returns all user's payment methods
   */
  getPaymentMethods(): Observable<OpfPaymentDetails[]> {
    return this.userPaymentService.getPaymentMethods();
  }

  /**
   * Returns a loading flag for payment methods
   */
  getPaymentMethodsLoading(): Observable<boolean> {
    return this.userPaymentService.getPaymentMethodsLoading();
  }

  /**
   * Loads all user's payment methods
   */
  loadPaymentMethods(): void {
    this.userPaymentService.loadPaymentMethods();
  }

  /**
   * Deletes the payment method
   *
   * @param paymentMethodId a payment method ID
   */
  deletePaymentMethod(paymentMethodId: string): void {
    this.userPaymentService.deletePaymentMethod(paymentMethodId);
  }

  /**
   * Sets the payment as a default one
   * @param paymentMethodId a payment method ID
   */
  setPaymentMethodAsDefault(paymentMethodId: string): void {
    this.userPaymentService.setPaymentMethodAsDefault(paymentMethodId);
  }
}
