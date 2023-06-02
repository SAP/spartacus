/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';

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
}
