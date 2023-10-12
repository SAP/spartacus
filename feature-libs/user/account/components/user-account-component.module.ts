/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { LoginFormModule } from './login-form/login-form.module';
import { LoginRegisterModule } from './login-register/login-register.module';
import { LoginModule } from './login/login.module';
// import { MyaccountViewNameModule } from './myaccount-view-name/myaccount-view-name.module';
import { UserMyaccountViewModule } from './user-myaccount-view/user-myaccount-view.module';

@NgModule({
  imports: [
    LoginModule,
    LoginFormModule,
    LoginRegisterModule,
    UserMyaccountViewModule,
  ],
})
export class UserAccountComponentsModule {}
