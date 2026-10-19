/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, inject, Input } from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import {
  AuthRedirectService,
  FeatureToggles,
  RoutingService,
  TranslatePipe,
} from '@spartacus/core';
import {
  CustomFormValidators,
  FormErrorsComponent,
  FormRequiredAsterisksComponent,
  FormRequiredLegendComponent,
  PasswordVisibilityToggleDirective,
} from '@spartacus/storefront';
import { UserRegisterFacade } from '@spartacus/user/profile/root';

@Component({
  selector: 'cx-guest-register-form',
  templateUrl: './order-guest-register-form.component.html',
  host: { ngSkipHydration: 'true' },
  imports: [
    FormsModule,
    ReactiveFormsModule,
    FormRequiredLegendComponent,
    FormRequiredAsterisksComponent,
    PasswordVisibilityToggleDirective,
    FormErrorsComponent,
    TranslatePipe,
  ],
})
export class OrderGuestRegisterFormComponent {
  private featureToggles = inject(FeatureToggles);
  protected authRedirectService = inject(AuthRedirectService);
  protected passwordValidators = this.featureToggles
    .useEnhancedSecurePasswordValidators
    ? [
        ...CustomFormValidators.securePasswordValidators,
        CustomFormValidators.mustEndWithLegalCharacter,
      ]
    : CustomFormValidators.securePasswordValidators;

  @Input() guid: string;
  @Input() email: string;

  guestRegisterForm: UntypedFormGroup = this.fb.group(
    {
      password: ['', [Validators.required, ...this.passwordValidators]],
      passwordconf: ['', Validators.required],
    },
    {
      validators: CustomFormValidators.passwordsMustMatch(
        'password',
        'passwordconf'
      ),
    }
  );

  constructor(
    protected userRegisterFacade: UserRegisterFacade,
    protected routingService: RoutingService,
    protected fb: UntypedFormBuilder
  ) {}

  submit() {
    if (this.guestRegisterForm.valid) {
      if (!this.featureToggles.authorizationCodeFlowByDefault) {
        this.authRedirectService.setRedirectUrl(
          this.routingService.getUrl({ cxRoute: 'home' })
        );
      }
      this.userRegisterFacade.registerGuest(
        this.guid,
        this.guestRegisterForm.value.password
      );
    } else {
      this.guestRegisterForm.markAllAsTouched();
    }
  }
}
