/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ExpressServerLogger,
  ExpressServerLoggerContext,
} from './express-server-logger';

/**
 * @deprecated since 6.2, will be removed in a new major version, as contextual logging will be enabled by default.
 * Default implementation of `ExpressServerLogger` that just delegates log messages to the native `console` object without providing any context.
 * It's used when contextual logging is disabled.
 *
 *
 */
//CXSPA-3680 - remove this class in 7.0
export class LegacyExpressServerLogger implements ExpressServerLogger {
  log(message: string, _context?: ExpressServerLoggerContext): void {
    /* eslint-disable-next-line no-console */
    console.log(message);
  }
  warn(message: string, _context?: ExpressServerLoggerContext): void {
    /* eslint-disable-next-line no-console */
    console.warn(message);
  }
  error(message: string, _context?: ExpressServerLoggerContext): void {
    /* eslint-disable-next-line no-console */
    console.error(message);
  }
  info(message: string, _context?: ExpressServerLoggerContext): void {
    /* eslint-disable-next-line no-console */
    console.info(message);
  }
  debug(message: string, _context?: ExpressServerLoggerContext): void {
    /* eslint-disable-next-line no-console */
    console.debug(message);
  }
}
