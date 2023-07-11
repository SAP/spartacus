/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { PaymentDetails } from '@spartacus/cart/base/root';
import { TranslationService } from '@spartacus/core';
import { paymentMethodCard } from '@spartacus/order/root';
import { Card } from '@spartacus/storefront';
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class OrderDetailBillingComponentService {
  constructor(protected translationService: TranslationService) {}

  getPaymentMethodCard(paymentDetails: PaymentDetails): Observable<Card> {
    return combineLatest([
      this.translationService.translate('paymentForm.payment'),
      this.translationService.translate('paymentCard.expires', {
        month: paymentDetails.expiryMonth,
        year: paymentDetails.expiryYear,
      }),
    ]).pipe(
      map(([textTitle, textExpires]) =>
        paymentMethodCard(textTitle, textExpires, paymentDetails)
      )
    );
  }
}
