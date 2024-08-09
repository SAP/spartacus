/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CmsConfig, NotAuthGuard, provideDefaultConfig } from '@spartacus/core';
import { SpinnerModule } from '@spartacus/storefront';
import { LoginFormCDCComponent } from './login-form-cdc.component';

@NgModule({
  imports: [CommonModule, RouterModule, SpinnerModule],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        ReturningOIDCLoginComponent: {
          component: LoginFormCDCComponent,
          guards: [NotAuthGuard],
        },
      },
    }),
  ],
  declarations: [LoginFormCDCComponent],
})
export class LoginFormCDCModule {}
