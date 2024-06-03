/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AuthModule } from '@spartacus/core';
import { CdcUserAuthenticationTokenService } from './services/user-authentication/cdc-user-authentication-token.service';

@NgModule({
  imports: [CommonModule, AuthModule],
  providers: [CdcUserAuthenticationTokenService],
})
export class CdcAuthModule {}
