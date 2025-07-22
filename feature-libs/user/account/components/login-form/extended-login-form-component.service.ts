/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { inject, Injectable } from '@angular/core';
import {
  AuthService,
  Config,
  CSRFResponse,
  WindowRef,
  GlobalMessageService,
} from '@spartacus/core';
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

  form: UntypedFormGroup = new UntypedFormGroup({
    username: new UntypedFormControl('', [
      Validators.required,
      CustomFormValidators.emailValidator,
    ]),
    password: new UntypedFormControl('', Validators.required),
  });

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

  constructor(
    protected auth: AuthService,
    protected globalMessage: GlobalMessageService,
    protected winRef: WindowRef
  ) {
    super(auth, globalMessage, winRef);

    this.auth
      .getCsrf()
      .pipe(
        tap((csrf: CSRFResponse) => {
          // csrfInput.name = csrf.parameterName;
          // csrfInput.value = csrf.token;
          if (csrf) {
            this.form.addControl(csrf?.parameterName, new UntypedFormControl());
            this.form.get(csrf.parameterName)?.setValue(csrf?.token);
          }
        })
      )
      .subscribe();
  }
}
