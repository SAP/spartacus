/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, UntypedFormBuilder } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import {
  CmsConfig,
  FeaturesConfigModule,
  I18nModule,
  NotAuthGuard,
  provideDefaultConfig,
  UrlModule,
} from '@spartacus/core';
import {
  BtnLikeLinkModule,
  CaptchaModule,
  FormErrorsModule,
  FormRequiredAsterisksComponent,
  NgSelectA11yModule,
  PageSlotModule,
  SpinnerModule,
} from '@spartacus/storefront';
import { UserRegisterFacade } from '@spartacus/user/profile/root';
import { RegisterComponentService } from '../register';
import { OneTimePasswordRegisterComponent } from './otp-login-register.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    UrlModule,
    PageSlotModule,
    I18nModule,
    FeaturesConfigModule,
    BtnLikeLinkModule,
    ReactiveFormsModule,
    NgSelectModule,
    NgSelectA11yModule,
    CaptchaModule,
    SpinnerModule,
    FormErrorsModule,
    FormRequiredAsterisksComponent,
    OneTimePasswordRegisterComponent,
  ],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        RegisterCustomerWithOTPComponent: {
          component: OneTimePasswordRegisterComponent,
          guards: [NotAuthGuard],
          providers: [
            {
              provide: RegisterComponentService,
              useClass: RegisterComponentService,
              deps: [UserRegisterFacade, UntypedFormBuilder],
            },
          ],
        },
      },
    }),
  ],
})
export class OneTimePasswordRegisterModule {}
