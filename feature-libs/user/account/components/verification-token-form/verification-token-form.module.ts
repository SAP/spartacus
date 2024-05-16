/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
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
  FeaturesConfigModule,
  GlobalMessageService,
  I18nModule,
  NotAuthGuard,
  UrlModule,
  WindowRef,
  provideDefaultConfig,
} from '@spartacus/core';
import {
  FormErrorsModule,
  IconModule,
  KeyboardFocusModule,
  SpinnerModule,
} from '@spartacus/storefront';

import { defaultVerificationTokenLayoutConfig } from './default-verification-token-layout.config';
import { VerificationTokenDialogComponent } from './verification-token-dialog.component';
import { VerificationTokenFormComponentService } from './verification-token-form-component.service';
import { VerificationTokenFormComponent } from './verification-token-form.component';
import { VerificationTokenFacade } from '@spartacus/user/account/root';

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
        VerifyOTPTokenComponent: {
          component: VerificationTokenFormComponent,
          guards: [NotAuthGuard],
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
  declarations: [
    VerificationTokenFormComponent,
    VerificationTokenDialogComponent,
  ],
})
export class VerificationTokenFormModule {}
