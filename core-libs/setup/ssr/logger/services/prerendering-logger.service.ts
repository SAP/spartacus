/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { LoggerService } from '@spartacus/core';

/**
 * Custom `LoggerService` used in pre-rendering in the server environment.
 *
 * It simply forwards the arguments to the native `console` methods.
 */
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
