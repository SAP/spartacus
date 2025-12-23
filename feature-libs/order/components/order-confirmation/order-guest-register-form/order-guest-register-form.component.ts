/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, inject, Input } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import {
  AuthRedirectService,
  FeatureConfigService,
  RoutingService,
} from '@spartacus/core';
import { CustomFormValidators } from '@spartacus/storefront';
import { UserRegisterFacade } from '@spartacus/user/profile/root';

@Component({
  selector: 'cx-guest-register-form',
  templateUrl: './order-guest-register-form.component.html',
  standalone: false,
  host: { ngSkipHydration: 'true' },
})
export class OrderGuestRegisterFormComponent {
  private featureConfigService = inject(FeatureConfigService);
  protected authRedirectService = inject(AuthRedirectService);
  protected passwordValidators = CustomFormValidators.securePasswordValidators;

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
      if (
        !this.featureConfigService.isEnabled('authorizationCodeFlowByDefault')
      ) {
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
