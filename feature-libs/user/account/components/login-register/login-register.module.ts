/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  CmsConfig,
  I18nModule,
  NotAuthGuard,
  provideDefaultConfig,
  UrlModule,
} from '@spartacus/core';
import { BtnLikeLinkModule, PageSlotModule } from '@spartacus/storefront';
import { LoginAsGuestGuard } from '../guards/login-as-guest.guard';
import { LoginRegisterB2bComponent } from './login-register-b2b/login-register-b2b.component';
import { LoginRegisterComponent } from './login-register.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    UrlModule,
    PageSlotModule,
    I18nModule,
    BtnLikeLinkModule,
    LoginRegisterComponent,
  ],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        ReturningCustomerRegisterComponent: {
          component: LoginRegisterComponent,
          guards: [NotAuthGuard, LoginAsGuestGuard],
        },
      },
    }),
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        ReturningB2bCustomerRegisterComponent: {
          component: LoginRegisterB2bComponent,
          guards: [NotAuthGuard],
        },
      },
    }),
  ],
})
export class LoginRegisterModule {}
