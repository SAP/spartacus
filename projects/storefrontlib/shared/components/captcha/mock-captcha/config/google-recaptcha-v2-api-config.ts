/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CaptchaApiConfig } from '../../captcha-api-config';
import { GoogleRecaptchaV2Service } from '../../google.recaptcha.v2.service';

export const googleCaptchaApiConfig: CaptchaApiConfig = {
  apiUrl: 'https://www.google.com/recaptcha/api.js',
  fields: { 'data-theme': 'light', 'data-size': 'normal' },
  captchaRenderer: GoogleRecaptchaV2Service,
};
