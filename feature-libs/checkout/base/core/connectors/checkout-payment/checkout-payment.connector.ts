/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { CheckoutPaymentAdapter } from './checkout-payment.adapter';
import { CardType, PaymentDetails } from '@spartacus/core';

@Injectable()
export class CheckoutPaymentConnector {
  protected adapter = inject(CheckoutPaymentAdapter);

  public createPaymentDetails(
    userId: string,
    cartId: string,
    paymentDetails: PaymentDetails
  ): Observable<PaymentDetails> {
    return this.adapter.createPaymentDetails(userId, cartId, paymentDetails);
  }

  public setPaymentDetails(
    userId: string,
    cartId: string,
    paymentDetailsId: string
  ): Observable<unknown> {
    return this.adapter.setPaymentDetails(userId, cartId, paymentDetailsId);
  }

  public deletePaymentDetails(
    userId: string,
    cartId: string
  ): Observable<unknown> {
    return this.adapter.deletePaymentDetails(userId, cartId);
  }

  getPaymentCardTypes(): Observable<CardType[]> {
    return this.adapter.getPaymentCardTypes();
  }
}
