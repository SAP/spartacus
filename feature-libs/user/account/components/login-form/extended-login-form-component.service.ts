/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { inject, Injectable } from '@angular/core';
import { Config } from '@spartacus/core';
import { LoginFormComponentService } from './login-form-component.service';

@Injectable()
export class ExtendedLoginFormComponentService extends LoginFormComponentService {
  config = inject(Config);

  login() {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }

    this.busy$.next(true);

    const { userId, password } = this.form.value;
    if (this.config.authentication?.customLoginPage?.enabled) {
      this.auth
        .customLoginForm(userId, password)
        .subscribe(() => this.busy$.next(false));
    }
  }
}
