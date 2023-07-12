/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PaymentDetails } from '@spartacus/cart/base/root';
import { TranslationService } from '@spartacus/core';
import { Order } from '@spartacus/order/root';
import { Card } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { OrderDetailsService } from '../order-details.service';
import { OrderDetailBillingComponentService } from './order-detail-billing.component.service';

@Component({
  selector: 'cx-order-detail-billing',
  templateUrl: './order-detail-billing.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderDetailBillingComponent {
  order$: Observable<Order | undefined> =
    this.orderDetailsService.getOrderDetails();

  constructor(
    protected orderDetailsService: OrderDetailsService,
    protected translationService: TranslationService,
    protected orderDetailBillingService: OrderDetailBillingComponentService
  ) {}

  getPaymentMethodCard(paymentDetails: PaymentDetails): Observable<Card> {
    return this.orderDetailBillingService.getPaymentMethodCard(paymentDetails);
  }

  getBillingAddressCard(paymentDetails: PaymentDetails): Observable<Card> {
    return this.orderDetailBillingService.getBillingAddressCard(paymentDetails);
  }
}
