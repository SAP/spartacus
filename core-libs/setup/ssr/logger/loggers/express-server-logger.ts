/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { InjectionToken } from '@angular/core';
import { Request } from 'express';

/**
 * ExpressServerLoggerContext is used for log message in server side rendering.
 * It contains optional request object and additional properties that can be used in log message.
 */
export interface ExpressServerLoggerContext {
  request?: Request;
  [_key: string]: any;
}

/**
 * ExpressServerLogger is used for log message in server side rendering.
 * It contains methods for logging messages with different levels. Each method accepts message and context.
 * Context is an object that contains additional information about the log message.
 *
 * @property log - logs message with level "log"
 * @property warn - logs message with level "warn"
 * @property error - logs message with level "error"
 * @property info - logs message with level "info"
 * @property debug - logs message with level "debug"
 */
export interface ExpressServerLogger {
  log(message: string, context: ExpressServerLoggerContext): void;
  warn(message: string, context: ExpressServerLoggerContext): void;
  error(message: string, context: ExpressServerLoggerContext): void;
  info(message: string, context: ExpressServerLoggerContext): void;
  debug(message: string, context: ExpressServerLoggerContext): void;
}

/**
 * Injection token for ExpressServerLogger used for log message in server side rendering.
 * EXPRESS_SERVER_LOGGER is used to provide proper logger to LoggerService instance.
 *
 * Spartacus is providing one type of server logger:
 * - DefaultExpressServerLogger - default implementation used for logging contextual messages in SSR.
 *
 */
export const EXPRESS_SERVER_LOGGER = new InjectionToken<ExpressServerLogger>(
  'EXPRESS_SERVER_LOGGER'
);
