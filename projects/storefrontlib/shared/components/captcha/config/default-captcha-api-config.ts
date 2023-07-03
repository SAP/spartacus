/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CaptchaApiConfig } from './captcha-api-config';
import { GoogleRecaptchaV2Service } from '../google-recaptchaV2/google-recaptchaV2.service';

export const defaultCaptchaApiConfig: CaptchaApiConfig = {
  apiUrl: 'https://www.google.com/recaptcha/api.js',
  fields: { 'data-theme': 'light', 'data-size': 'normal' },
  captchaProvider: GoogleRecaptchaV2Service,
};
