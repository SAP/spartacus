/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, OnDestroy, inject } from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { ActiveCartFacade } from '@spartacus/cart/base/root';
import { AuthRedirectService, TranslatePipe } from '@spartacus/core';
import {
  CustomFormValidators,
  FormErrorsComponent,
  FormRequiredAsterisksComponent,
  FormRequiredLegendComponent,
} from '@spartacus/storefront';
import { Subscription } from 'rxjs';

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
  ],
})
export class CheckoutLoginComponent implements OnDestroy {
  protected formBuilder = inject(UntypedFormBuilder);
  protected authRedirectService = inject(AuthRedirectService);
  protected activeCartFacade = inject(ActiveCartFacade);

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
