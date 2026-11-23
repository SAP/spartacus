/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { AsyncPipe, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActiveCartFacade } from '@spartacus/cart/base/root';
import { RouterLink } from '@angular/router';
import {
  CheckoutPaymentFacade,
  CheckoutStepType,
} from '@spartacus/checkout/base/root';
import {
  FeatureDirective,
  FiscalId,
  maskFiscalId,
  PaymentDetails,
  TranslatePipe,
  TranslationService,
  UrlPipe,
} from '@spartacus/core';
import { billingAddressCard, paymentMethodCard } from '@spartacus/order/root';
import {
  Card,
  CardComponent,
  FocusDirective,
  ICON_TYPE,
  IconComponent,
} from '@spartacus/storefront';
import { Observable, combineLatest } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { CheckoutStepService } from '../../services/checkout-step.service';

@Component({
  selector: 'cx-checkout-review-payment',
  templateUrl: './checkout-review-payment.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgIf,
    CardComponent,
    RouterLink,
    IconComponent,
    AsyncPipe,
    TranslatePipe,
    FocusDirective,
    FeatureDirective,
    UrlPipe,
  ],
})
export class CheckoutReviewPaymentComponent {
  iconTypes = ICON_TYPE;
  protected activeCartFacade = inject(ActiveCartFacade);
  fiscalId$ = this.activeCartFacade
    .getActive()
    .pipe(map((cart) => cart.sapCustomerFiscalId));
  get isB2BCheckout(): boolean {
    return !!this.checkoutStepService.getCheckoutStep(
      'paymentType' as CheckoutStepType
    );
  }
  getFiscalIdCard(fiscalId: FiscalId): Observable<Card> {
    return this.translationService.translate('fiscalId.label').pipe(
      map((title) => ({
        title,
        text: [maskFiscalId(fiscalId.sapFiscalIdEntries?.[0]?.sapValue)],
      }))
    );
  }

  paymentDetailsStepRoute = this.checkoutStepService.getCheckoutStepRoute(
    CheckoutStepType.PAYMENT_DETAILS
  );

  constructor(
    protected checkoutStepService: CheckoutStepService,
    protected checkoutPaymentFacade: CheckoutPaymentFacade,
    protected translationService: TranslationService
  ) {}

  paymentDetails$: Observable<PaymentDetails | undefined> =
    this.checkoutPaymentFacade.getPaymentDetailsState().pipe(
      filter((state) => !state.loading && !state.error),
      map((state) => state.data)
    );

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
