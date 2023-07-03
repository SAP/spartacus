/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { provideDefaultConfig } from '@spartacus/core';
import { CaptchaComponent } from './captcha.component';
import { CommonModule } from '@angular/common';
import { defaultCaptchaApiConfig } from './config/default-captcha-api-config';
import { ReactiveFormsModule } from '@angular/forms';
import { FormErrorsModule } from '../form';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, FormErrorsModule],
  declarations: [CaptchaComponent],
  providers: [provideDefaultConfig(defaultCaptchaApiConfig)],
  exports: [CaptchaComponent],
})
export class CaptchaModule {}
