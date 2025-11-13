/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { PaymentDetails, TranslationService } from '@spartacus/core';
import {
  Order,
  billingAddressCard,
  paymentMethodCard,
} from '@spartacus/order/root';
import { Card } from '@spartacus/storefront';
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { OrderDetailsService } from '../order-details.service';

@Component({
  selector: 'cx-order-detail-billing',
  templateUrl: './order-detail-billing.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class OrderDetailBillingComponent {
  protected orderDetailsService = inject(OrderDetailsService);
  protected translationService = inject(TranslationService);

  order$: Observable<Order | undefined> =
    this.orderDetailsService.getOrderDetails();

  /** Inserted by Angular inject() migration for backwards compatibility */
  constructor(...args: unknown[]);

  constructor() {}

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

  getBillingAddressCard(paymentDetails: PaymentDetails): Observable<Card> {
    return combineLatest([
      this.translationService.translate('paymentForm.billingAddress'),
      this.translationService.translate('addressCard.billTo'),
    ]).pipe(
      map(([billingAddress, billTo]) =>
        billingAddressCard(billingAddress, billTo, paymentDetails)
      )
    );
  }

  isPaymentInfoCardFull(payment: PaymentDetails): boolean {
    return (
      !!payment?.cardNumber && !!payment?.expiryMonth && !!payment?.expiryYear
    );
  }
}
