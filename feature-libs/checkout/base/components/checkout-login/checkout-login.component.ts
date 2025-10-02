/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, OnDestroy } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { ActiveCartFacade } from '@spartacus/cart/base/root';
import { AuthRedirectService } from '@spartacus/core';
import { CustomFormValidators } from '@spartacus/storefront';
import { Subscription } from 'rxjs';
import { FormRequiredLegendComponent } from '../../../../../projects/storefrontlib/shared/components/form/form-required-legend/form-required-legend.component';
import { FormRequiredAsterisksComponent } from '../../../../../projects/storefrontlib/shared/components/form/form-required-asterisks/form-required-asterisks.component';
import { FormErrorsComponent } from '../../../../../projects/storefrontlib/shared/components/form/form-errors/form-errors.component';
import { TranslatePipe } from '../../../../../projects/core/src/i18n/translate.pipe';
import { MockTranslatePipe } from '../../../../../projects/core/src/i18n/testing/mock-translate.pipe';

@Component({
  selector: 'cx-checkout-login',
  templateUrl: './checkout-login.component.html',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    FormRequiredLegendComponent,
    FormRequiredAsterisksComponent,
    FormErrorsComponent,
    TranslatePipe,
    MockTranslatePipe,
  ],
})
export class CheckoutLoginComponent implements OnDestroy {
  checkoutLoginForm: UntypedFormGroup = this.formBuilder.group(
    {
      email: ['', [Validators.required, CustomFormValidators.emailValidator]],
      emailConfirmation: ['', [Validators.required]],
    },
    {
      validators: CustomFormValidators.emailsMustMatch(
        'email',
        'emailConfirmation'
      ),
    }
  );
  sub: Subscription;

  constructor(
    protected formBuilder: UntypedFormBuilder,
    protected authRedirectService: AuthRedirectService,
    protected activeCartFacade: ActiveCartFacade
  ) {}

  onSubmit() {
    if (this.checkoutLoginForm.valid) {
      const email = this.checkoutLoginForm.get('email')?.value;
      this.activeCartFacade.addEmail(email);

      if (!this.sub) {
        this.sub = this.activeCartFacade.isGuestCart().subscribe((isGuest) => {
          if (isGuest) {
            this.authRedirectService.redirect();
          }
        });
      }
    } else {
      this.checkoutLoginForm.markAllAsTouched();
    }
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
