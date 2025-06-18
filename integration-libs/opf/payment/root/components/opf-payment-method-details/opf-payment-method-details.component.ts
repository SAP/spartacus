/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, inject, OnDestroy, OnInit, Optional } from '@angular/core';
import { TranslationService } from '@spartacus/core';
import { Order } from '@spartacus/order/root';
import { Card, OutletContextData } from '@spartacus/storefront';
import { filter, map, Observable, Subscription } from 'rxjs';
import { OpfPaymentMethodDetails } from '../../model';

@Component({
  selector: 'cx-opf-payment-method-details',
  templateUrl: './opf-payment-method-details.component.html',
  standalone: false,
})
export class OpfPaymentMethodDetailsComponent implements OnInit, OnDestroy {
  protected translationService = inject(TranslationService);
  @Optional() protected orderOutlet = inject(OutletContextData);

  protected subscription = new Subscription();
  order: Order;

  ngOnInit(): void {
    if (this.orderOutlet?.context$) {
      this.subscription?.add(
        this.orderOutlet.context$.subscribe(
          (context) => (this.order = context?.item)
        )
      );
    }
  }

  getPaymentMethodDetailsCardContent(
    paymentMethodDetails?: OpfPaymentMethodDetails
  ): Observable<Card> {
    return this.translationService.translate('opfCheckout.paymentOption').pipe(
      filter(() => Boolean(paymentMethodDetails?.name)),
      map((translatedTitle) => {
        return {
          title: translatedTitle,
          text: [paymentMethodDetails?.name],
        } as Card;
      })
    );
  }

  isPaymentMethodDetailsInfoPresent(order: Order): boolean {
    return Boolean(order?.paymentInfo?.sapPaymentMethod?.name);
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
