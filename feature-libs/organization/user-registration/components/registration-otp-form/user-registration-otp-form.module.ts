/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import {
  CmsConfig,
  ConfigModule,
  FeaturesConfigModule,
  I18nModule,
  NotAuthGuard,
  UrlModule,
} from '@spartacus/core';
import {
  FormErrorsModule,
  FormRequiredAsterisksComponent,
  NgSelectA11yModule,
  SpinnerModule,
} from '@spartacus/storefront';
import { UserRegistrationOTPFormComponent } from './user-registration-otp-form.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    UrlModule,
    I18nModule,
    SpinnerModule,
    FormErrorsModule,
    NgSelectModule,
    NgSelectA11yModule,
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        RegisterB2BCustomerWithOTPComponent: {
          component: UserRegistrationOTPFormComponent,
          guards: [NotAuthGuard],
        },
      },
    }),
    FeaturesConfigModule,
    FormRequiredAsterisksComponent,
    UserRegistrationOTPFormComponent,
  ],
  exports: [UserRegistrationOTPFormComponent],
})
export class UserRegistrationOTPFormModule {}
