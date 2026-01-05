/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserRegistrationFormModule } from './form/user-registration-form.module';
import { UserRegistrationOTPFormModule } from './registration-otp-form/user-registration-otp-form.module';
import { RegisterVerificationTokenFormModule } from './verification-token-form';

@NgModule({
  imports: [
    RouterModule,
    UserRegistrationFormModule,
    UserRegistrationOTPFormModule,
    RegisterVerificationTokenFormModule,
  ],
})
export class UserRegistrationComponentsModule {}
