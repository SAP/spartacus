/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  CmsConfig,
  FeaturesConfigModule,
  GlobalMessageService,
  I18nModule,
  NotAuthGuard,
  UrlModule,
  provideDefaultConfig,
} from '@spartacus/core';
import {
  FormErrorsModule,
  IconModule,
  KeyboardFocusModule,
  SpinnerModule,
} from '@spartacus/storefront';
import { RegistrationVerificationTokenFormComponent } from './verify-register-verification-token-form.component';
import { RegistrationVerificationTokenFormComponentService } from './verify-register-verification-token-form.service';
import { UserRegisterFacade } from '@spartacus/user/profile/root';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    KeyboardFocusModule,
    ReactiveFormsModule,
    RouterModule,
    UrlModule,
    IconModule,
    I18nModule,
    FormErrorsModule,
    SpinnerModule,
    FeaturesConfigModule,
  ],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        VerifyOTPForRegistrationComponent: {
          component: RegistrationVerificationTokenFormComponent,
          guards: [NotAuthGuard],
          providers: [
            {
              provide: RegistrationVerificationTokenFormComponentService,
              useClass: RegistrationVerificationTokenFormComponentService,
              deps: [GlobalMessageService, UserRegisterFacade],
            },
          ],
        },
      },
    }),
  ],
  declarations: [RegistrationVerificationTokenFormComponent],
})
export class RegistrationVerificationTokenFormModule {}
