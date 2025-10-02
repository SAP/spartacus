/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, inject, Input, OnDestroy } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  AuthService,
  FeatureConfigService,
  RoutingService,
  useFeatureStyles,
} from '@spartacus/core';
import { CustomFormValidators } from '@spartacus/storefront';
import { UserRegisterFacade } from '@spartacus/user/profile/root';
import { Subscription } from 'rxjs';
import { FormRequiredLegendComponent } from '../../../../../projects/storefrontlib/shared/components/form/form-required-legend/form-required-legend.component';
import { FormRequiredAsterisksComponent } from '../../../../../projects/storefrontlib/shared/components/form/form-required-asterisks/form-required-asterisks.component';
import { PasswordVisibilityToggleDirective } from '../../../../../projects/storefrontlib/shared/components/form/password-visibility-toggle/password-visibility-toggle.directive';
import { FormErrorsComponent } from '../../../../../projects/storefrontlib/shared/components/form/form-errors/form-errors.component';
import { TranslatePipe } from '@spartacus/core';
import { MockTranslatePipe } from '@spartacus/core';

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
    MockTranslatePipe,
  ],
})
export class OrderGuestRegisterFormComponent implements OnDestroy {
  private featureConfigService = inject(FeatureConfigService);

  protected passwordValidators = this.featureConfigService.isEnabled(
    'enableSecurePasswordValidation'
  )
    ? CustomFormValidators.securePasswordValidators
    : [
        ...CustomFormValidators.passwordValidators,
        CustomFormValidators.noConsecutiveCharacters,
      ];

  @Input() guid: string;
  @Input() email: string;

  subscription: Subscription;
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
    protected authService: AuthService,
    protected fb: UntypedFormBuilder
  ) {
    useFeatureStyles('a11yPasswordVisibliltyBtnValueOverflow');
  }

  submit() {
    if (this.guestRegisterForm.valid) {
      this.userRegisterFacade.registerGuest(
        this.guid,
        this.guestRegisterForm.value.password
      );
      if (
        !this.subscription &&
        !this.featureConfigService.isEnabled('authorizationCodeFlowByDefault')
      ) {
        this.subscription = this.authService
          .isUserLoggedIn()
          .subscribe((isLoggedIn) => {
            if (isLoggedIn) {
              this.routingService.go({ cxRoute: 'home' });
            }
          });
      }
    } else {
      this.guestRegisterForm.markAllAsTouched();
    }
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
