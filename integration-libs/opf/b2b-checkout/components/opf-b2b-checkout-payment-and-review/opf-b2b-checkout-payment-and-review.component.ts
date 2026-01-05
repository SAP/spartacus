/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Cart } from '@spartacus/cart/base/root';
import { CheckoutStepType } from '@spartacus/checkout/base/root';
import { normalizeEmpty } from '@spartacus/core';
import { OpfCheckoutPaymentAndReviewComponent } from '@spartacus/opf/checkout/components';
import { Card } from '@spartacus/storefront';
import { combineLatest, filter, map, Observable, take } from 'rxjs';

@Component({
  selector: 'cx-opf-b2b-checkout-payment-and-review',
  templateUrl: './opf-b2b-checkout-payment-and-review.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class OpfB2bCheckoutPaymentAndReviewComponent
  extends OpfCheckoutPaymentAndReviewComponent
  implements OnInit
{
  checkoutStepTypePaymentType = CheckoutStepType.PAYMENT_TYPE;

  paymentType$ = this.activeCartFacade
    .getActive()
    .pipe(map((cart: Cart) => cart.paymentType));

  poNumber$ = this.checkoutPaymentTypeFacade.getPurchaseOrderNumberState().pipe(
    filter((state) => !state.loading && !state.error),
    map((state) => state.data)
  );

  getPoNumberCard(poNumber?: string | null): Observable<Card> {
    return combineLatest([
      this.translationService.translate('opfCheckout.poNumber'),
      this.translationService.translate('opfCheckout.noPoNumber'),
    ]).pipe(
      map(([textTitle, noneTextTitle]) => {
        return {
          title: textTitle,
          textBold: normalizeEmpty(poNumber) ?? noneTextTitle,
        };
      })
    );
  }

  getSelectedPayment$ = this.opfBaseFacade.getActiveConfigurationsState();

  getSelectedPaymentId$ = this.opfMetadataStoreService
    .getOpfMetadataState()
    .pipe(
      take(1),
      map((data) => data?.selectedPaymentOptionId)
    );

  getPaymentMethodNameCard(methodName?: string): Observable<Card> {
    return combineLatest([
      this.translationService.translate('opfCheckout.paymentMethod'),
      this.translationService.translate('opfCheckout.noPaymentMethod'),
    ]).pipe(
      map(([title, noPaymentMethod]) => ({
        title,
        textBold: methodName ?? noPaymentMethod,
        text: [],
      }))
    );
  }
}
