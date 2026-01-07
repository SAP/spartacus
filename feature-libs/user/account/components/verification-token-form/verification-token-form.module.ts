/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  AuthService,
  CmsConfig,
  CustomLoginGuard,
  FeaturesConfigModule,
  GlobalMessageService,
  I18nModule,
  NotAuthGuard,
  provideDefaultConfig,
  UrlModule,
  WindowRef,
} from '@spartacus/core';
import {
  FormErrorsModule,
  FormRequiredAsterisksComponent,
  FormRequiredLegendComponent,
  IconModule,
  KeyboardFocusModule,
  SpinnerModule,
} from '@spartacus/storefront';

import { VerificationTokenFacade } from '@spartacus/user/account/root';
import { defaultVerificationTokenLayoutConfig } from './default-verification-token-layout.config';
import { VerificationTokenDialogComponent } from './verification-token-dialog.component';
import { VerificationTokenFormComponentService } from './verification-token-form-component.service';
import { VerificationTokenFormComponent } from './verification-token-form.component';

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
    FormRequiredAsterisksComponent,
    FormRequiredLegendComponent,
    VerificationTokenFormComponent,
    VerificationTokenDialogComponent,
  ],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        VerifyOTPTokenComponent: {
          component: VerificationTokenFormComponent,
          guards: [NotAuthGuard, CustomLoginGuard],
          providers: [
            {
              provide: VerificationTokenFormComponentService,
              useClass: VerificationTokenFormComponentService,
              deps: [
                AuthService,
                GlobalMessageService,
                VerificationTokenFacade,
                WindowRef,
              ],
            },
          ],
        },
      },
    }),
    provideDefaultConfig(defaultVerificationTokenLayoutConfig),
  ],
})
export class VerificationTokenFormModule {}
