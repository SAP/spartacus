/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PaymentDetails } from '@spartacus/cart/base/root';
import { TranslationService } from '@spartacus/core';
import {
  billingAddressCard,
  Order,
  OrderFacade,
  paymentMethodCard,
} from '@spartacus/order/root';
import { Card } from '@spartacus/storefront';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'cx-order-detail-billing',
  templateUrl: './opf-order-detail-billing.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OpfOrderDetailBillingComponent {
  order$: Observable<Order | undefined> =
    this.orderDetailsService.getOrderDetails();

  constructor(
    protected orderDetailsService: OrderFacade,
    protected translationService: TranslationService
  ) {}

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
}
