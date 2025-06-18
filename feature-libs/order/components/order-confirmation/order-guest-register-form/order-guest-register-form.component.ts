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

@Component({
  selector: 'cx-guest-register-form',
  templateUrl: './order-guest-register-form.component.html',
  standalone: false,
})
export class OrderGuestRegisterFormComponent implements OnDestroy {
  // TODO: (CXSPA-7315) Remove feature toggle in the next major
  private featureConfigService = inject(FeatureConfigService);

  protected passwordValidators = this.featureConfigService?.isEnabled(
    'formErrorsDescriptiveMessages'
  )
    ? this.featureConfigService.isEnabled('enableSecurePasswordValidation')
      ? CustomFormValidators.securePasswordValidators
      : this.featureConfigService.isEnabled(
            'enableConsecutiveCharactersPasswordRequirement'
          )
        ? [
            ...CustomFormValidators.passwordValidators,
            CustomFormValidators.noConsecutiveCharacters,
          ]
        : CustomFormValidators.passwordValidators
    : [
        this.featureConfigService.isEnabled('enableSecurePasswordValidation')
          ? CustomFormValidators.securePasswordValidator
          : this.featureConfigService.isEnabled(
                'enableConsecutiveCharactersPasswordRequirement'
              )
            ? CustomFormValidators.strongPasswordValidator
            : CustomFormValidators.passwordValidator,
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
      if (!this.subscription) {
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
