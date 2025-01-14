/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
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
  NgSelectA11yModule,
  PageSlotModule,
  SpinnerModule,
} from '@spartacus/storefront';
import { ReactiveFormsModule, UntypedFormBuilder } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { UserRegisterFacade } from '@spartacus/user/profile/root';
import { OneTimePasswordRegisterComponent } from './otp-login-register.component';
import { RegisterComponentService } from '../register';

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
  declarations: [OneTimePasswordRegisterComponent],
})
export class OneTimePasswordRegisterModule {}
