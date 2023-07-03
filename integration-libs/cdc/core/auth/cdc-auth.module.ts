/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AuthModule } from '@spartacus/core';
import { CdcUserAuthenticationTokenService } from './services/user-authentication/cdc-user-authentication-token.service';
import { CdcAuthStoreModule } from './store/cdc-auth-store.module';

@NgModule({
  imports: [CommonModule, AuthModule, CdcAuthStoreModule],
  providers: [CdcUserAuthenticationTokenService],
})
export class CdcAuthModule {}
