/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';

/**
 * By default it delegates logged messages to the native `console` object.
 *
 * It's a good extension point for customizing the destination of logs
 * (e.g. to use a 3rd party logger library) or to enhance logs with more contextual data.
 */
@Injectable({
  providedIn: 'root',
})
export class LoggerService {
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
