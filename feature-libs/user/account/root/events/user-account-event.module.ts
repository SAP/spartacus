/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule, inject } from '@angular/core';
import { UserLoginCurrencyService } from '../services/user-login-currency.service';
import { UserAccountEventListener } from './user-account-event.listener';

@NgModule({})
export class UserAccountEventModule {
  protected _userLoginCurrencyService = inject(UserLoginCurrencyService);

  constructor(_userAccountEventListener: UserAccountEventListener) {
    // Intentional empty constructor
  }
}
