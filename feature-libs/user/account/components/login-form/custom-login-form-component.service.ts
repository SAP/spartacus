/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { inject, Injectable } from '@angular/core';
import { AuthConfigService } from '@spartacus/core';
import { LoginFormComponentService } from './login-form-component.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomFormValidators } from '@spartacus/storefront';

@Injectable()
export class CustomLoginFormComponentService extends LoginFormComponentService {
  protected authConfigService = inject(AuthConfigService);

  method = 'POST';
  action = this.authConfigService?.getCustomLoginFormEndpoint();

  form = new FormGroup({
    userId: new FormControl('', [
      Validators.required,
      CustomFormValidators.emailValidator,
    ]),
    password: new FormControl('', Validators.required),
    csrf: new FormControl('', Validators.required),
  });

  login(nativeForm: HTMLFormElement) {
    const csrf =
      [...nativeForm.elements]
        .find((element) => element.hasAttribute?.('data-csrf'))
        ?.getAttribute?.('data-csrf') ?? '';
    this.form.get('csrf')?.setValue(csrf);

    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }

    nativeForm?.submit();
    this.busy$.next(true);
  }
}
