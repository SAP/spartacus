/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { Config } from '../../config/config-tokens';

@Injectable({
  providedIn: 'root',
  useExisting: Config,
})
export abstract class ErrorHandlingConfig {
  ngrxErrorHandling?: boolean;
  httpErrorHandling?: boolean;
}

declare module '../../config/config-tokens' {
  interface Config extends ErrorHandlingConfig {}
}
