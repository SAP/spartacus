/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { Config } from '@spartacus/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
  useExisting: Config,
})
export abstract class CaptchaApiConfig {
  apiUrl?: string;
  fields?: { [key: string]: string };
  renderingFunction?: (params: { [key: string]: any }) => Observable<string>;
}

declare module '@spartacus/core' {
  interface Config extends CaptchaApiConfig {}
}
