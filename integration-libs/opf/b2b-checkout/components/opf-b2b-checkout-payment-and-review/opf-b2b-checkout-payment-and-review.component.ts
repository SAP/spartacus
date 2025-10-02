/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Cart } from '@spartacus/cart/base/root';
import { Observable, take, map, filter, combineLatest } from 'rxjs';
import { Card } from '@spartacus/storefront';
import { CheckoutStepType } from '@spartacus/checkout/base/root';
import { OpfCheckoutPaymentAndReviewComponent } from '@spartacus/opf/checkout/components';
import { NgIf, NgClass, AsyncPipe } from '@angular/common';
import { OpfCheckoutReviewCardComponent } from '../../../checkout/components/opf-checkout-review-card/opf-checkout-review-card.component';
import { OpfCheckoutTermsAndConditionsAlertComponent } from '../../../checkout/components/opf-checkout-terms-and-conditions-alert/opf-checkout-terms-and-conditions-alert.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { OpfCheckoutBillingAddressFormComponent } from '../../../checkout/components/opf-checkout-billing-address-form/opf-checkout-billing-address-form.component';
import { OpfCheckoutPaymentsComponent } from '../../../checkout/components/opf-checkout-payments/opf-checkout-payments.component';
import { OpfCheckoutReviewCartDetailsComponent } from '../../../checkout/components/opf-checkout-review-cart-details/opf-checkout-review-cart-details.component';
import { TranslatePipe } from '@spartacus/core';
import { UrlPipe } from '@spartacus/core';
import { MockTranslatePipe } from '@spartacus/core';

@Component({
  selector: 'cx-opf-b2b-checkout-payment-and-review',
  templateUrl: './opf-b2b-checkout-payment-and-review.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgIf,
    OpfCheckoutReviewCardComponent,
    OpfCheckoutTermsAndConditionsAlertComponent,
    NgClass,
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
    OpfCheckoutBillingAddressFormComponent,
    OpfCheckoutPaymentsComponent,
    OpfCheckoutReviewCartDetailsComponent,
    AsyncPipe,
    TranslatePipe,
    UrlPipe,
    MockTranslatePipe,
  ],
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
          textBold: poNumber ? poNumber : noneTextTitle,
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
