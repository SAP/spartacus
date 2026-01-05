/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  AuthConfig,
  AuthService,
  CmsConfig,
  GlobalMessageService,
  I18nModule,
  NotAuthGuard,
  provideDefaultConfig,
  UrlModule,
  WindowRef,
} from '@spartacus/core';
import { FormErrorsModule, SpinnerModule } from '@spartacus/storefront';
import {
  LoginFormComponent,
  LoginFormComponentService,
} from '@spartacus/user/account/components';
import { CdcReconsentModule } from './reconsent/cdc-reconsent.module';
import { CdcLoginFormComponentService } from './cdc-login-form-component.service';
import { CdcJsService } from '@spartacus/cdc/root';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    UrlModule,
    I18nModule,
    FormErrorsModule,
    SpinnerModule,
    CdcReconsentModule,
  ],
  providers: [
    provideDefaultConfig(<AuthConfig>{
      authentication: {
        customLoginPage: undefined,
      },
    }),
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        ReturningCustomerLoginComponent: {
          component: LoginFormComponent,
          guards: [NotAuthGuard],
          providers: [
            {
              provide: LoginFormComponentService,
              useClass: CdcLoginFormComponentService,
              deps: [
                AuthService,
                GlobalMessageService,
                WindowRef,
                CdcJsService,
              ],
            },
          ],
        },
      },
    }),
  ],
})
export class CDCLoginFormModule {}
