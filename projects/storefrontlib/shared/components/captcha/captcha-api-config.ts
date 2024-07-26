/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, Type } from '@angular/core';
import { Config } from '@spartacus/core';
import { CaptchaProvider } from './captcha.model';

@Injectable({
  providedIn: 'root',
  useExisting: Config,
})

/**
 * Configuration for the frontend: This class defines how to render the captcha component 
 * and obtain the appropriate token.
 *
 * @property {Type<CaptchaProvider>} captchaProvider - An implementation of the CaptchaProvider 
 * interface that renders the UI and interacts with the user.
 * @property {string} [apiUrl] - An optional parameter specifying the API endpoint for captcha validation.
 * @property {Object} [fields] - An optional parameter that holds additional fields needed for the captcha configuration.
 */
export abstract class CaptchaApiConfig {
  captchaProvider?: Type<CaptchaProvider>;
  apiUrl?: string;
  fields?: { [key: string]: string };
}

declare module '@spartacus/core' {
  interface Config extends CaptchaApiConfig {}
}
