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
import {
  CheckoutCostCenterFacade,
  CheckoutPaymentTypeFacade,
} from '@spartacus/checkout/b2b/root';
import { CheckoutReviewSubmitComponent } from '@spartacus/checkout/base/components';
import { CmsService, CostCenter, Page } from '@spartacus/core';
import {
  OpfBaseFacade,
  OpfMetadataStoreService,
} from '@spartacus/opf/base/root';
import { OPF_EXPLICIT_TERMS_AND_CONDITIONS_COMPONENT } from '@spartacus/opf/checkout/root';
import { Observable, map, filter, combineLatest } from 'rxjs';
import { Card } from '@spartacus/storefront';

@Component({
  selector: 'cx-opf-b2b-checkout-review',
  templateUrl: './opf-b2b-checkout-review.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class OpfB2bCheckoutReviewComponent
  extends CheckoutReviewSubmitComponent
  implements OnInit
{
  protected fb = inject(UntypedFormBuilder);
  protected opfMetadataStoreService = inject(OpfMetadataStoreService);
  protected cmsService = inject(CmsService);
  protected checkoutPaymentTypeFacade = inject(CheckoutPaymentTypeFacade);
  protected opfBaseFacade = inject(OpfBaseFacade);
  protected checkoutCostCenterFacade = inject(CheckoutCostCenterFacade);

  protected defaultTermsAndConditionsFieldValue = false;

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

  get costCenter$(): Observable<CostCenter | undefined> {
    return this.checkoutCostCenterFacade.getCostCenterState().pipe(
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

  getCostCenterCard(costCenter?: CostCenter): Observable<Card> {
    return combineLatest([
      this.translationService.translate('opfCheckout.costCenter'),
    ]).pipe(
      map(([textTitle]) => {
        return {
          title: textTitle,
          textBold: costCenter?.name,
          text: ['(' + costCenter?.unit?.name + ')'],
        };
      })
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

  ngOnInit() {
    this.updateTermsAndConditionsState();
  }
}
