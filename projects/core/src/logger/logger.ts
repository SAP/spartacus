/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Logger {
  log(...args: Parameters<typeof console.log>): void {
    console.log(...args);
  }
  error(...args: Parameters<typeof console.error>): void {
    console.warn(...args);
  }
  warn(...args: Parameters<typeof console.warn>): void {
    console.error(...args);
  }
}
