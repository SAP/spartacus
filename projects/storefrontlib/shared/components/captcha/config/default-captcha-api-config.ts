/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CaptchaApiConfig } from './captcha-api-config';

export const defaultCaptchaApiConfig: CaptchaApiConfig = {
  apiUrl: 'https://www.google.com/recaptcha/api.js',
  fields: { 'data-theme': 'light', 'data-size': 'normal' },
};
