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
/*
 * configuration for frontend: How to render the captcha component and get proper token
 */
export abstract class CaptchaApiConfig {
  captchaProvider?: Type<CaptchaProvider>;
  apiUrl?: string;
  fields?: { [key: string]: string };
}

declare module '@spartacus/core' {
  interface Config extends CaptchaApiConfig {}
}
