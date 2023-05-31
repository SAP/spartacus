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
    console.log(...args);
  }
  warn(...args: Parameters<typeof console.warn>): void {
    console.warn(...args);
  }
  error(...args: Parameters<typeof console.error>): void {
    console.error(...args);
  }
}
