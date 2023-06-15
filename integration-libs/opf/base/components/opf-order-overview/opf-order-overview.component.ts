/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PaymentDetails } from '@spartacus/cart/base/root';
import { OrderOverviewComponent } from '@spartacus/order/components';
import { Card } from '@spartacus/storefront';
import { combineLatest, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'cx-order-overview',
  templateUrl: './opf-order-overview.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OpfOrderOverviewComponent extends OrderOverviewComponent {
  getPaymentInfoCardContent(payment: PaymentDetails): Observable<Card> {
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
  isPaymentInfoCardFull(payment: PaymentDetails): boolean {
    return (
      !!payment?.cardNumber &&
      !!payment.expiryMonth &&
      !!payment.expiryYear &&
      !!payment.accountHolderName
    );
  }
}
