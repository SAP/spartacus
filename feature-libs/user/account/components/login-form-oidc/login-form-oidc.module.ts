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
import { LoginFormOidcComponent } from './login-form-oidc.component';
// import { defaultOidcAuthConfig } from './default-oidc-auth-config';

@NgModule({
  imports: [CommonModule, RouterModule, SpinnerModule],
  providers: [
    // provideDefaultConfig(defaultOidcAuthConfig),
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        ReturningOIDCLoginComponent: {
          component: LoginFormOidcComponent,
          guards: [NotAuthGuard],
        },
      },
    }),
  ],
  declarations: [LoginFormOidcComponent],
})
export class LoginFormOidcModule {}
