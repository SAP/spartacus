/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { provideDefaultConfig } from '@spartacus/core';
import { CaptchaComponent } from './captcha.component';
import { CommonModule } from '@angular/common';
import { defaultGoogleRecaptchaApiConfig } from './google-recaptchaV2/config/default-google-recaptcha-api-config';
import { ReactiveFormsModule } from '@angular/forms';
import { FormErrorsModule } from '../form';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, FormErrorsModule],
  declarations: [CaptchaComponent],
  providers: [provideDefaultConfig(defaultGoogleRecaptchaApiConfig)],
  exports: [CaptchaComponent],
})
export class CaptchaModule {}
