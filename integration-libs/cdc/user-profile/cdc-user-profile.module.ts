/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { CDCForgotPasswordModule } from './forgot-password/cdc-forgot-password.module';
import { CDCRegisterModule } from './register/cdc-register.module';
import { CDCUpdateEmailModule } from './update-email/cdc-update-email.module';
import { CDCUpdatePasswordModule } from './update-password/cdc-update-password.module';
import { CDCUpdateProfileModule } from './update-profile/cdc-update-profile.module';

@NgModule({
  imports: [
    CDCRegisterModule,
    CDCForgotPasswordModule,
    CDCUpdateProfileModule,
    CDCUpdatePasswordModule,
    CDCUpdateEmailModule,
  ],
})
export class CDCUserProfileModule {}
