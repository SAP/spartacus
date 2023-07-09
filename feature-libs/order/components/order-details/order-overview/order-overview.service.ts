/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { PaymentDetails } from '@spartacus/cart/base/root';
import { TranslationService } from '@spartacus/core';
import { Card } from '@spartacus/storefront';
import { Observable, combineLatest } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class OrderOverviewService {
  constructor(protected translation: TranslationService) {}

  paymentIntegration? = false;

  getPaymentInfoCardContent(payment: PaymentDetails): Observable<Card> {
    return combineLatest([
      this.translation.translate('paymentForm.payment'),
      this.translation.translate('paymentCard.expires', {
        month: Boolean(payment) ? payment.expiryMonth : '',
        year: Boolean(payment) ? payment.expiryYear : '',
      }),
    ]).pipe(
      filter(() => Boolean(payment)),
      map(
        ([textTitle, textExpires]) =>
          ({
            title: textTitle,
            textBold: payment.accountHolderName,
            text: [payment.cardNumber, textExpires],
          } as Card)
      )
    );
  }

  getPaymentInfoCardContentNew(payment: PaymentDetails): Observable<Card> {
    return combineLatest([
      this.translation.translate('paymentForm.payment'),
      this.translation.translate('paymentCard.expires', {
        month: Boolean(payment) ? payment.expiryMonth : '',
        year: Boolean(payment) ? payment.expiryYear : '',
      }),
    ]).pipe(
      filter(() => Boolean(payment)),
      filter(() => this.isPaymentInfoCardFull(payment)),
      map(
        ([textTitle, textExpires]) =>
          ({
            title: textTitle,
            textBold: payment.accountHolderName,
            text: [payment.cardNumber, textExpires],
          } as Card)
      )
    );
  }

  protected isPaymentInfoCardFull(payment: PaymentDetails): boolean {
    return (
      !!payment?.cardNumber &&
      !!payment.expiryMonth &&
      !!payment.expiryYear &&
      !!payment.accountHolderName
    );
  }
}
