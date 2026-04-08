/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { AsyncPipe, NgIf } from '@angular/common';
import { Component, inject, OnDestroy, OnInit, Optional } from '@angular/core';
import { TranslationService } from '@spartacus/core';
import { Order } from '@spartacus/order/root';
import {
  Card,
  CardComponent,
  OutletContextData,
  OutletModule,
} from '@spartacus/storefront';
import { filter, map, Observable, Subscription } from 'rxjs';
import { OpfPaymentMethodDetails } from '../../model';
import { OpfCheckoutOutlets } from '@spartacus/opf/checkout/root';

@Component({
  selector: 'cx-opf-payment-method-details',
  templateUrl: './opf-payment-method-details.component.html',
  imports: [NgIf, CardComponent, AsyncPipe, OutletModule],
})
export class OpfPaymentMethodDetailsComponent implements OnInit, OnDestroy {
  protected translationService = inject(TranslationService);
  @Optional() protected orderOutlet = inject(OutletContextData);
  readonly opfCheckoutOutlets = OpfCheckoutOutlets;
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
