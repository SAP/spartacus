/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { LoginFormModule } from './login-form/login-form.module';
import { LoginRegisterModule } from './login-register/login-register.module';
import { LoginModule } from './login/login.module';

@NgModule({
  imports: [LoginModule, LoginFormModule, LoginRegisterModule],
})
export class UserAccountComponentsModule {}
