/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, inject } from '@angular/core';
import { REQUEST } from '@nguniversal/express-engine/tokens';
import { LoggerService } from '@spartacus/core';
import { formatWithOptions } from 'util';
import { EXPRESS_SERVER_LOGGER } from '../loggers';

/**
 * Custom `LoggerService` used in ExpressJS.
 *
 * It converts the input arguments to a final string message similar as the native `console`
 * does (using the native function `format` from `node:util`) and passes this message
 * to a concrete server logger, used in ExpressJS.
 *
 * Besides the message, it also passes the current `request` of ExpressJS as an additional
 * context to the concrete server logger.
 */
@Injectable({ providedIn: 'root' })
export class ExpressLoggerService implements LoggerService {
  request = inject(REQUEST);
  serverLogger = inject(EXPRESS_SERVER_LOGGER);

  log(...args: Parameters<typeof console.log>): void {
    this.serverLogger.log(this.formatLogMessage(...args), {
      request: this.request,
    });
  }
  warn(...args: Parameters<typeof console.warn>): void {
    this.serverLogger.warn(this.formatLogMessage(...args), {
      request: this.request,
    });
  }
  error(...args: Parameters<typeof console.error>): void {
    this.serverLogger.error(this.formatLogMessage(...args), {
      request: this.request,
    });
  }
  info(...args: Parameters<typeof console.info>): void {
    this.serverLogger.info(this.formatLogMessage(...args), {
      request: this.request,
    });
  }
  debug(...args: Parameters<typeof console.debug>): void {
    this.serverLogger.debug(this.formatLogMessage(...args), {
      request: this.request,
    });
  }

  protected formatLogMessage(message?: any, ...optionalParams: any[]): string {
    return formatWithOptions(
      // Prevent automatically breaking a long string message into multiple lines.
      // Otherwise, multi-line logs would be treated on the server as separate log
      { breakLength: Infinity },
      message,
      ...optionalParams
    );
  }
}
