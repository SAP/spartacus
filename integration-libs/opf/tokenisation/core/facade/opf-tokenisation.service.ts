/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { PaymentDetails, UserPaymentService } from '@spartacus/core';

@Injectable()
export class OpfTokenisationService {
  protected userPaymentService = inject(UserPaymentService);

  /**
   * Returns all user's payment methods
   */
  getPaymentMethods(): Observable<PaymentDetails[]> {
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
}
