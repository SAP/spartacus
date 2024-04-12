/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  AuthService,
  CmsConfig,
  FeaturesConfigModule,
  GlobalMessageService,
  I18nModule,
  NotAuthGuard,
  UrlModule,
  WindowRef,
  provideDefaultConfig,
  provideDefaultConfigFactory,
} from '@spartacus/core';
import {
  FormErrorsModule,
  PasswordVisibilityToggleModule,
  SpinnerModule,
} from '@spartacus/storefront';
import { LoginFormComponentService } from './login-form-component.service';
import { LoginFormComponent } from './login-form.component';
import { OneTimePasswordLoginFormComponent } from './otp-login-form.component';

import { USE_ONE_TIME_PASSWORD_LOGIN } from './use-otp-login-form';

const oneTimePasswordLoginFormMapping: CmsConfig = {
  cmsComponents: {
    ReturningCustomerLoginComponent: {
      component: OneTimePasswordLoginFormComponent,
    },
  },
};

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
    PasswordVisibilityToggleModule,
    FeaturesConfigModule,
  ],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        ReturningCustomerLoginComponent: {
          component: LoginFormComponent,
          guards: [NotAuthGuard],
          providers: [
            {
              provide: LoginFormComponentService,
              useClass: LoginFormComponentService,
              deps: [AuthService, GlobalMessageService, WindowRef],
            },
          ],
        },
      },
    }),
    provideDefaultConfigFactory(() =>
      inject(USE_ONE_TIME_PASSWORD_LOGIN) ? oneTimePasswordLoginFormMapping : {}
    ),
  ],
  declarations: [LoginFormComponent, OneTimePasswordLoginFormComponent],
  exports: [LoginFormComponent, OneTimePasswordLoginFormComponent],
})
export class LoginFormModule {}
