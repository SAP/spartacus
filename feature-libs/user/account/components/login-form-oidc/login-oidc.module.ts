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
import { LoginOidcComponent } from './login-oidc.component';

@NgModule({
  imports: [CommonModule, RouterModule, SpinnerModule],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        OidcLoginComponent: {
          component: LoginOidcComponent,
          guards: [NotAuthGuard],
        },
      },
    }),
  ],
  declarations: [LoginOidcComponent],
})
export class LoginFormOidcModule {}
