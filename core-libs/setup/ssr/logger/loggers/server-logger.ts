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

/**
 * Injection token for ServerLogger used for log message in server side rendering.
 * SERVER_LOGGER is used to provide proper logger to LoggerService instance. Server logger type is provided based on
 * the platform (browser or server).
 *
 * Spartacus is providing three types of server loggers:
 * - ExpressServerLogger - used for logging messages in Node.js environment (server side rendering)
 * - PrerenderingServerLogger - used for logging messages in browser environment (prerendering)
 * - ServerLogger - used for logging if contextual logging is disabled.
 *
 */
export const SERVER_LOGGER = new InjectionToken<ServerLogger>('SERVER_LOGGER');

/**
 * Injection token for enabling the contextual server logger.
 *
 * This flag has been introduced to provide to have notion about contextual logger availability state.
 * across Spartacus libraries. Such an value is used e.g. for providing proper instance of ErrorHandler that includes or not
 * reference to the contextual logger.
 *
 * This flag is going to be removed in 7.0 release when contextual logger will be enabled by default.
 *
 */
export const ENABLE_CONTEXTUAL_SERVER_LOGGER = new InjectionToken<boolean>(
  'ENABLE_CONTEXTUAL_SERVER_LOGGER'
);
