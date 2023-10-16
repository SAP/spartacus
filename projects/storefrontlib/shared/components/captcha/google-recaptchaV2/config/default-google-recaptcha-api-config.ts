/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { GoogleRecaptchaV2Service } from '../google-recaptchaV2.service';
import { GoogleRecaptchaApiConfig } from './google-recaptcha-api-config';

export const defaultGoogleRecaptchaApiConfig: GoogleRecaptchaApiConfig = {
  apiUrl: 'https://www.google.com/recaptcha/api.js',
  fields: { 'data-theme': 'light', 'data-size': 'normal' },
  captchaProvider: GoogleRecaptchaV2Service,
};
