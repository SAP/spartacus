/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component } from '@angular/core';
import { PaymentDetails } from '@spartacus/cart/base/root';
import {
  CheckoutPaymentFacade,
  CheckoutStepType,
} from '@spartacus/checkout/base/root';
import { TranslationService } from '@spartacus/core';
import { Card, ICON_TYPE } from '@spartacus/storefront';
import { combineLatest, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { CheckoutStepService } from '../../services/checkout-step.service';

@Component({
  selector: 'cx-checkout-review-payment',
  templateUrl: './checkout-review-payment.component.html',
})
export class CheckoutReviewPaymentComponent {
  constructor(
    protected checkoutStepService: CheckoutStepService,
    protected checkoutPaymentFacade: CheckoutPaymentFacade,
    protected translationService: TranslationService
  ) {}
  
  iconTypes = ICON_TYPE;

  checkoutStepTypePaymentDetails = CheckoutStepType.PAYMENT_DETAILS;

  paymentDetails$: Observable<PaymentDetails | undefined> =
    this.checkoutPaymentFacade.getPaymentDetailsState().pipe(
      filter((state) => !state.loading && !state.error),
      map((state) => state.data)
    );

  getPaymentMethodCard(paymentDetails: PaymentDetails): Observable<Card> {
    return combineLatest([
      this.translationService.translate('paymentForm.creditCardDetails'),
      this.translationService.translate('paymentCard.expires', {
        month: paymentDetails.expiryMonth,
        year: paymentDetails.expiryYear,
      }),
    ]).pipe(
      map(([textTitle, textExpires]) => {
        return {
          title: textTitle,
          text: [
            paymentDetails.cardType?.name,
            paymentDetails.accountHolderName,
            paymentDetails.cardNumber,
            textExpires,
          ],
        } as Card;
      })
    );
  }

  getPaymentTypeCard(): Observable<Card> {
    return combineLatest([
      this.translationService.translate('paymentForm.payment'),
      this.translationService.translate('paymentForm.paymentByCreditCard'),
    ]).pipe(
      map(([textTitle, paymentByCardText]) => {
        return {
          title: textTitle,
          text: [paymentByCardText],
        } as Card;
      })
    );
  }

  getCheckoutStepUrl(stepType: CheckoutStepType | string): string | undefined {
    const step = this.checkoutStepService.getCheckoutStep(
      stepType as CheckoutStepType
    );
    return step?.routeName;
  }
}
