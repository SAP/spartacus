/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { BehaviorSubject, Observable, map, take } from 'rxjs';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { CmsService, Page } from '@spartacus/core';
import {
  OpfBaseFacade,
  OpfMetadataStoreService,
} from '@spartacus/opf/base/root';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';

import { CheckoutPaymentTypeFacade } from '@spartacus/checkout/b2b/root';
import { CheckoutReviewSubmitComponent } from '@spartacus/checkout/base/components';
import { OPF_EXPLICIT_TERMS_AND_CONDITIONS_COMPONENT } from '@spartacus/opf/checkout/root';

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
