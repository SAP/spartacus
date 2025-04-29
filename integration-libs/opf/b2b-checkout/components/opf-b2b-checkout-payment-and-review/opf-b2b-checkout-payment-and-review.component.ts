/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { Cart, PaymentType } from '@spartacus/cart/base/root';
import { CheckoutPaymentTypeFacade } from '@spartacus/checkout/b2b/root';
import { CmsService } from '@spartacus/core';
import {
  OpfBaseFacade,
  OpfMetadataStoreService,
} from '@spartacus/opf/base/root';
import { Observable, take, map, filter, combineLatest } from 'rxjs';
import { Card } from '@spartacus/storefront';
import { CheckoutStepType } from '@spartacus/checkout/base/root';
import { OpfCheckoutPaymentAndReviewComponent } from '@spartacus/opf/checkout/components';

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
  protected fb = inject(UntypedFormBuilder);
  protected opfMetadataStoreService = inject(OpfMetadataStoreService);
  protected cmsService = inject(CmsService);
  protected checkoutPaymentTypeFacade = inject(CheckoutPaymentTypeFacade);
  protected opfBaseFacade = inject(OpfBaseFacade);

  checkoutStepTypePaymentType = CheckoutStepType.PAYMENT_TYPE;

  get paymentType$(): Observable<PaymentType | undefined> {
    return this.activeCartFacade
      .getActive()
      .pipe(map((cart: Cart) => cart.paymentType));
  }

  get poNumber$(): Observable<string | undefined> {
    return this.checkoutPaymentTypeFacade.getPurchaseOrderNumberState().pipe(
      filter((state) => !state.loading && !state.error),
      map((state) => state.data)
    );
  }

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
