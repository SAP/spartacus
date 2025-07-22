/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { inject, Injectable } from '@angular/core';
import { Config, CSRFResponse, AuthConfigService } from '@spartacus/core';
import { LoginFormComponentService } from './login-form-component.service';
import {
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { CustomFormValidators } from '@spartacus/storefront';
import { tap } from 'rxjs/operators';

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

  nativeForm;

  // login() {
  //   if (!this.form.valid) {
  //     this.form.markAllAsTouched();
  //     return;
  //   }
  //
  //   this.busy$.next(true);
  //
  //   if (this.config.authentication?.customLoginPage?.enabled) {
  //     this.auth
  //       .customLoginForm(this.form)
  //       .subscribe(() => this.busy$.next(false));
  //   }
  // }

  login() {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }

    this.busy$.next(true);
    this.nativeForm?.submit();
  }

  initialize(nativeForm) {
    this.nativeForm = nativeForm;
    if (nativeForm) {
      this.nativeForm.method = 'POST';
      this.nativeForm.action =
        this.authConfigService?.getCustomLoginFormEndpoint();
      console.log(this.nativeForm);
      this.auth
        .getCsrf()
        .pipe(
          tap((csrf: CSRFResponse) => {
            if (csrf) {
              //TODO: csrfNativeElement.name = csrf?.parameterName;
              this.form.get('csrf')?.setValue(csrf?.token);
            }
          })
        )
        .subscribe();
    }
  }
}
