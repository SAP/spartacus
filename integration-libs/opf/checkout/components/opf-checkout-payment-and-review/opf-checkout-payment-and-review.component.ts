/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { AsyncPipe, NgClass, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ActiveCartFacade } from '@spartacus/cart/base/root';
import { CheckoutPaymentTypeFacade } from '@spartacus/checkout/b2b/root';
import { CheckoutReviewSubmitComponent } from '@spartacus/checkout/base/components';
import { CheckoutDeliveryModesFacade } from '@spartacus/checkout/base/root';
import { CmsService, Page, TranslatePipe, UrlPipe } from '@spartacus/core';
import {
  OpfBaseFacade,
  OpfMetadataStoreService,
  OpfPaymentProviderType,
} from '@spartacus/opf/base/root';
import { OPF_EXPLICIT_TERMS_AND_CONDITIONS_COMPONENT } from '@spartacus/opf/checkout/root';
import { BehaviorSubject, map, Observable, take } from 'rxjs';
import { OpfCheckoutBillingAddressFormComponent } from '../opf-checkout-billing-address-form/opf-checkout-billing-address-form.component';
import { OpfCheckoutPaymentsComponent } from '../opf-checkout-payments/opf-checkout-payments.component';
import {
  OpfCheckoutReviewCartDetailsComponent,
  OpfCheckoutReviewCartDetailsModule,
} from '../opf-checkout-review-cart-details';
import { OpfCheckoutTermsAndConditionsAlertComponent } from '../opf-checkout-terms-and-conditions-alert/opf-checkout-terms-and-conditions-alert.component';
import { OpfCheckoutOutlets } from '../../root/model/opf-checkout-outlets.model';

@Component({
  selector: 'cx-opf-checkout-payment-and-review',
  templateUrl: './opf-checkout-payment-and-review.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgIf,
    OpfCheckoutReviewCartDetailsModule,
    OpfCheckoutTermsAndConditionsAlertComponent,
    NgClass,
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
    OpfCheckoutBillingAddressFormComponent,
    OpfCheckoutPaymentsComponent,
    AsyncPipe,
    TranslatePipe,
    UrlPipe,
    OpfCheckoutReviewCartDetailsComponent,
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
  protected checkoutDeliveryModesFacade = inject(CheckoutDeliveryModesFacade);
  protected activeCartFacade = inject(ActiveCartFacade);
  public giftcardEnabled$: Observable<boolean>;
  protected defaultTermsAndConditionsFieldValue = false;

  protected selectedPaymentProviderName$ = new BehaviorSubject<
    string | null | undefined
  >(undefined);

  readonly opfCheckoutOutlets = OpfCheckoutOutlets;

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
  activeConfigurations$ = this.opfBaseFacade.getActiveConfigurationsState();

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

  setPickupDeliveryMode(): void {
    this.activeCartFacade
      .hasDeliveryItems()
      .pipe(take(1))
      .subscribe((hasDeliveryItems) => {
        if (!hasDeliveryItems) {
          this.checkoutDeliveryAddressFacade.clearCheckoutDeliveryAddress();
          this.checkoutDeliveryModesFacade.setDeliveryMode('pickup');
        }
      });
  }

  ngOnInit() {
    // Determine if gift card provider is enabled from active configurations
    this.giftcardEnabled$ = this.activeConfigurations$.pipe(
      map(
        (state) =>
          state?.data?.value?.some(
            (c) => c?.providerType === OpfPaymentProviderType.GIFT_CARD_PAYMENT
          ) ?? false
      )
    );
    this.updateTermsAndConditionsState();
    this.setPickupDeliveryMode();
  }
}
