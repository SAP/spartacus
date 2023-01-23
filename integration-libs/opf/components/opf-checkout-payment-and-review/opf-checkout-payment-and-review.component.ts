/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  UntypedFormGroup,
  Validators,
  UntypedFormBuilder,
} from '@angular/forms';
import { ActiveCartFacade, PaymentType } from '@spartacus/cart/base/root';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'cx-opf-checkout-payment-and-review',
  templateUrl: './opf-checkout-payment-and-review.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OPFCheckoutPaymentAndReviewComponent {
  checkoutSubmitForm: UntypedFormGroup = this.fb.group({
    termsAndConditions: [false, Validators.requiredTrue],
  });

  get termsAndConditionInvalid(): boolean {
    return this.checkoutSubmitForm.invalid;
  }
  constructor(
    protected activeCartService: ActiveCartFacade,
    protected fb: UntypedFormBuilder
  ) {}

  get paymentType$(): Observable<PaymentType | undefined> {
    return this.activeCartService
      .getActive()
      .pipe(map((cart) => cart.paymentType));
  }
}
