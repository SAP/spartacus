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
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { CheckoutPaymentTypeFacade } from '@spartacus/checkout/b2b/root';
import { CheckoutReviewSubmitComponent } from '@spartacus/checkout/base/components';
import { CmsService, Page } from '@spartacus/core';
import {
  OpfBaseFacade,
  OpfMetadataStoreService,
} from '@spartacus/opf/base/root';
import { OPF_EXPLICIT_TERMS_AND_CONDITIONS_COMPONENT } from '@spartacus/opf/checkout/root';
import { Observable, take, map, BehaviorSubject } from 'rxjs';
import { NgIf, NgClass, AsyncPipe } from '@angular/common';
import { OpfCheckoutReviewCardComponent } from '../opf-checkout-review-card/opf-checkout-review-card.component';
import { OpfCheckoutTermsAndConditionsAlertComponent } from '../opf-checkout-terms-and-conditions-alert/opf-checkout-terms-and-conditions-alert.component';
import { RouterLink } from '@angular/router';
import { OpfCheckoutBillingAddressFormComponent } from '../opf-checkout-billing-address-form/opf-checkout-billing-address-form.component';
import { OpfCheckoutPaymentsComponent } from '../opf-checkout-payments/opf-checkout-payments.component';
import { OpfCheckoutReviewCartDetailsComponent } from '../opf-checkout-review-cart-details/opf-checkout-review-cart-details.component';
import { TranslatePipe } from '../../../../../projects/core/src/i18n/translate.pipe';
import { UrlPipe } from '../../../../../projects/core/src/routing/configurable-routes/url-translation/url.pipe';
import { MockTranslatePipe } from '../../../../../projects/core/src/i18n/testing/mock-translate.pipe';

@Component({
  selector: 'cx-opf-checkout-payment-and-review',
  templateUrl: './opf-checkout-payment-and-review.component.html',
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
    string | null | undefined
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

  getSelectedPayment$ = this.opfBaseFacade.getActiveConfigurationsState();

  getSelectedPaymentId$ = this.opfMetadataStoreService
    .getOpfMetadataState()
    .pipe(
      take(1),
      map((data) => data?.selectedPaymentOptionId)
    );

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
