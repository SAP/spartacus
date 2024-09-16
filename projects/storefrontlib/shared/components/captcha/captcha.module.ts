/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { provideDefaultConfig } from '@spartacus/core';
import { CaptchaComponent } from './captcha.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormErrorsModule } from '../form';
import { googleCaptchaApiConfig } from './mock-captcha/config/google-recaptcha-v2-api-config';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, FormErrorsModule],
  declarations: [CaptchaComponent],
  providers: [provideDefaultConfig(googleCaptchaApiConfig)],
  exports: [CaptchaComponent],
})
export class CaptchaModule {}
