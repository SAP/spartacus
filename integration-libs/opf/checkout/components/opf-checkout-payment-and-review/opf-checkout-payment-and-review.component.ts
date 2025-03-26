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
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Cart, PaymentType } from '@spartacus/cart/base/root';
import { CheckoutPaymentTypeFacade } from '@spartacus/checkout/b2b/root';
import { CheckoutReviewSubmitComponent } from '@spartacus/checkout/base/components';
import { CmsService, Page } from '@spartacus/core';
import {
  OpfBaseFacade,
  OpfMetadataStoreService,
} from '@spartacus/opf/base/root';
import { OPF_EXPLICIT_TERMS_AND_CONDITIONS_COMPONENT } from '@spartacus/opf/checkout/root';
import {
  Observable,
  take,
  map,
  filter,
  combineLatest,
  BehaviorSubject,
} from 'rxjs';
import { Card } from '@spartacus/storefront';

@Component({
  selector: 'cx-opf-checkout-payment-and-review',
  templateUrl: './opf-checkout-payment-and-review.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class OpfCheckoutPaymentAndReviewComponent
  extends CheckoutReviewSubmitComponent
  implements OnInit
{
  protected fb = inject(UntypedFormBuilder);
  protected opfMetadataStoreService = inject(OpfMetadataStoreService);
  protected cmsService = inject(CmsService);
  protected checkoutPaymentTypeFacade = inject(CheckoutPaymentTypeFacade);
  protected opfBaseFacade = inject(OpfBaseFacade);

  protected defaultTermsAndConditionsFieldValue = false;

  protected selectedPaymentProviderName$ = new BehaviorSubject<
    string | undefined
  >(undefined);

  explicitTermsAndConditions$: Observable<boolean | undefined> = this.cmsService
    .getCurrentPage()
    .pipe(
      map((page: Page) => {
        return this.isCmsComponentInPage(
          OPF_EXPLICIT_TERMS_AND_CONDITIONS_COMPONENT,
          page
        );
      })
    );

  checkoutSubmitForm: UntypedFormGroup = this.fb.group({
    termsAndConditions: [
      this.defaultTermsAndConditionsFieldValue,
      Validators.requiredTrue,
    ],
  });

  get termsAndConditionInvalid(): boolean {
    return this.checkoutSubmitForm.invalid;
  }

  get termsAndConditionsFieldValue(): boolean {
    return Boolean(this.checkoutSubmitForm.get('termsAndConditions')?.value);
  }

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

  protected isCmsComponentInPage(cmsComponentUid: string, page: Page): boolean {
    return !!page && JSON.stringify(page).includes(cmsComponentUid);
  }

  protected updateTermsAndConditionsState() {
    this.opfMetadataStoreService.updateOpfMetadata({
      termsAndConditionsChecked: this.termsAndConditionsFieldValue,
    });
  }

  toggleTermsAndConditions() {
    this.updateTermsAndConditionsState();
  }

  onPaymentProviderSelected(providerName: string) {
    this.selectedPaymentProviderName$.next(providerName);
  }

  ngOnInit() {
    this.updateTermsAndConditionsState();
  }
}
