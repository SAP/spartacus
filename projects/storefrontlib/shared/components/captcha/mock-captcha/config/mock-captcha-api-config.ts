/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { MockCaptchaService } from '../mock-captcha.service';
import { CaptchaApiConfig } from '../../captcha-api-config';

export const MockCaptchaApiConfig: CaptchaApiConfig = {
  captchaRenderer: MockCaptchaService,
};
