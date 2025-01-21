/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { MockCaptchaService } from '../mock-captcha.service';
import { CaptchaApiConfig } from '../../captcha-api-config';

export const MockCaptchaApiConfig: CaptchaApiConfig = {
  captchaRenderer: MockCaptchaService,
};
