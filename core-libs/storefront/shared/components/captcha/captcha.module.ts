/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { provideDefaultConfig } from '@spartacus/core';
import { FormErrorsModule } from '../form';
import { CaptchaComponent } from './captcha.component';
import { MockCaptchaApiConfig } from './mock-captcha/config/mock-captcha-api-config';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormErrorsModule,
    CaptchaComponent,
  ],
  providers: [provideDefaultConfig(MockCaptchaApiConfig)],
  exports: [CaptchaComponent],
})
export class CaptchaModule {}
