/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { InjectionToken } from '@angular/core';
import { Request } from 'express';

export interface LogContext {
  request?: Request | any;
  options?: any;
}

export class ServerLogger {
  log(message: string, _context?: LogContext): void {
    /* eslint-disable-next-line no-console */
    console.log(message);
  }
  warn(message: string, _context?: LogContext): void {
    /* eslint-disable-next-line no-console */
    console.warn(message);
  }
  error(message: string, _context?: LogContext): void {
    /* eslint-disable-next-line no-console */
    console.error(message);
  }
}

export const serverLoggerToken = new InjectionToken<ServerLogger>(
  'ServerLogger'
);

export const loggerEnabled = new InjectionToken<boolean>('featureFlag.logger');
