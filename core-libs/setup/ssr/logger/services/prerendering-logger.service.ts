/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { LoggerService } from '@spartacus/core';

@Injectable({
  providedIn: 'root',
})
export class PrerenderingLoggerService extends LoggerService {
  log(...args: Parameters<typeof console.log>): void {
    /* eslint-disable-next-line no-console */
    console.log(...args);
  }
  warn(...args: Parameters<typeof console.warn>): void {
    /* eslint-disable-next-line no-console */
    console.warn(...args);
  }
  error(...args: Parameters<typeof console.error>): void {
    /* eslint-disable-next-line no-console */
    console.error(...args);
  }
  info(...args: Parameters<typeof console.info>): void {
    /* eslint-disable-next-line no-console */
    console.info(...args);
  }
  debug(...args: Parameters<typeof console.debug>): void {
    /* eslint-disable-next-line no-console */
    console.debug(...args);
  }
}
