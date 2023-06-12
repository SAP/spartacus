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

export interface ServerLogger {
  log(message: string, context?: LogContext): void;
  warn(message: string, context?: LogContext): void;
  error(message: string, context?: LogContext): void;
  info(message: string, context?: LogContext): void;
  debug(message: string, context?: LogContext): void;
}

/**
 * @deprecated since 6.2, will be removed in 7.0 as contextual logging will be enabled by default.
 * Default implementation of ServerLogger that delegates log messages to the native `console` object without providing any context.
 * It's used when contextual logging is disabled.
 *
 *
 */
//CXSPA-3680 - remove this class in 7.0
export class LegacyServerLogger {
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
  info(message: string, _context?: LogContext): void {
    /* eslint-disable-next-line no-console */
    console.info(message);
  }
  debug(message: string, _context?: LogContext): void {
    /* eslint-disable-next-line no-console */
    console.debug(message);
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
