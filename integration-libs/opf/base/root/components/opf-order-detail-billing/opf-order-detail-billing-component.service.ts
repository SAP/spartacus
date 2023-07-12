/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { PaymentDetails } from '@spartacus/cart/base/root';
import { TranslationService } from '@spartacus/core';
import { billingAddressCard, paymentMethodCard } from '@spartacus/order/root';
import { Card } from '@spartacus/storefront';
import { Observable, combineLatest } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class OpfOrderDetailBillingComponentService {
  constructor(protected translationService: TranslationService) {}

  getPaymentMethodCard(paymentDetails: PaymentDetails): Observable<Card> {
    return combineLatest([
      this.translationService.translate('paymentForm.payment'),
      this.translationService.translate('paymentCard.expires', {
        month: paymentDetails.expiryMonth,
        year: paymentDetails.expiryYear,
      }),
    ]).pipe(
      filter(() => this.isPaymentInfoCardFull(paymentDetails)),
      map(([textTitle, textExpires]) =>
        paymentMethodCard(textTitle, textExpires, paymentDetails)
      )
    );
  }

  getBillingAddressCard(paymentDetails: PaymentDetails): Observable<Card> {
    return combineLatest([
      this.translationService.translate('paymentForm.billingAddress'),
      this.translationService.translate('addressCard.billTo'),
    ]).pipe(
      filter(() => !!paymentDetails?.billingAddress),
      map(([billingAddress, billTo]) =>
        billingAddressCard(billingAddress, billTo, paymentDetails)
      )
    );
  }

  protected isPaymentInfoCardFull(payment: PaymentDetails): boolean {
    return (
      !!payment?.cardNumber &&
      !!payment?.expiryMonth &&
      !!payment?.expiryYear &&
      !!payment?.accountHolderName
    );
  }
}
