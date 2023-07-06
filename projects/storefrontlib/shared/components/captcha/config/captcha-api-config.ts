/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, Type } from '@angular/core';
import { Config } from '@spartacus/core';
import { CaptchaProvider } from '../captcha.model';

@Injectable({
  providedIn: 'root',
  useExisting: Config,
})
export abstract class CaptchaApiConfig {
  apiUrl?: string;
  fields?: { [key: string]: string };
  captchaProvider?: Type<CaptchaProvider>;
}

declare module '@spartacus/core' {
  interface Config extends CaptchaApiConfig {}
}
