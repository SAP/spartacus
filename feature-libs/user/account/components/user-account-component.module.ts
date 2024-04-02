/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { LoginFormModule } from './login-form/login-form.module';
import { LoginRegisterModule } from './login-register/login-register.module';
import { LoginModule } from './login/login.module';
import { MyAccountV2UserModule } from './my-account-v2-user';

@NgModule({
  imports: [
    LoginModule,
    LoginFormModule,
    LoginRegisterModule,
    MyAccountV2UserModule,
  ],
})
export class UserAccountComponentsModule {}
