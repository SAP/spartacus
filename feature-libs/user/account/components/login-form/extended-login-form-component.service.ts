/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { inject, Injectable } from '@angular/core';
import { Config, AuthConfigService } from '@spartacus/core';
import { LoginFormComponentService } from './login-form-component.service';
import {
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { CustomFormValidators } from '@spartacus/storefront';

@Injectable()
export class ExtendedLoginFormComponentService extends LoginFormComponentService {
  config = inject(Config);
  authConfigService = inject(AuthConfigService);

  form: UntypedFormGroup = new UntypedFormGroup({
    userId: new UntypedFormControl('', [
      Validators.required,
      CustomFormValidators.emailValidator,
    ]),
    password: new UntypedFormControl('', Validators.required),
    csrf: new UntypedFormControl('', Validators.required),
  });

  method = 'POST';
  action = this.authConfigService?.getCustomLoginFormEndpoint();

  login(nativeForm: HTMLFormElement) {
    const csrf = [...nativeForm.elements].find(
      (element) => !!element.attributes['data-csrf']
    );
    this.form.get('csrf')?.setValue(csrf?.attributes['data-csrf'].value);

    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }

    nativeForm?.submit();
    this.busy$.next(true);
  }
}
