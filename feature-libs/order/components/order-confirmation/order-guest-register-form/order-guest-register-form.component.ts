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
} from '@spartacus/core';
import { CustomFormValidators } from '@spartacus/storefront';
import { UserRegisterFacade } from '@spartacus/user/profile/root';
import { Subscription } from 'rxjs';

@Component({
  selector: 'cx-guest-register-form',
  templateUrl: './order-guest-register-form.component.html',
  standalone: false,
  host: { ngSkipHydration: 'true' },
})
export class OrderGuestRegisterFormComponent implements OnDestroy {
  protected userRegisterFacade = inject(UserRegisterFacade);
  protected routingService = inject(RoutingService);
  protected authService = inject(AuthService);
  protected fb = inject(UntypedFormBuilder);

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

  /** Inserted by Angular inject() migration for backwards compatibility */
  constructor(...args: unknown[]);

  constructor() {}

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
