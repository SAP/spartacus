/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { InjectionToken } from '@angular/core';
import { Request } from 'express';
import { ExpressLogTransformer } from '../transformers/express-log-transformer';

/**
 * ExpressServerLoggerContext is used for log message in server side rendering.
 * It contains optional request object and additional properties that can be used in log message.
 */
export interface ExpressServerLoggerContext {
  request?: Request;
  [_key: string]: any;
}

//TODO: add more props to jsdoc

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
export abstract class ExpressServerLogger {
  _transformers: ExpressLogTransformer[] = [];
  abstract log(message: string, context: ExpressServerLoggerContext): void;
  abstract warn(message: string, context: ExpressServerLoggerContext): void;
  abstract error(message: string, context: ExpressServerLoggerContext): void;
  abstract info(message: string, context: ExpressServerLoggerContext): void;
  abstract debug(message: string, context: ExpressServerLoggerContext): void;
  transform(
    message: string,
    context: ExpressServerLoggerContext,
    transformers: ExpressLogTransformer[],
    logger?: ExpressServerLogger
  ): [string, ExpressServerLoggerContext] {
    return transformers.reduce(
      ([transformedMessage, transformedContext], transformer) => {
        return transformer.transform(
          transformedMessage,
          transformedContext,
          logger
        );
      },
      [message, context]
    );
  }
  setTransformers(transformers: ExpressLogTransformer[]) {
    this._transformers = transformers;
  }
}

/**
 * Injection token for ExpressServerLogger used for log message in server side rendering.
 * EXPRESS_SERVER_LOGGER is used to provide proper logger to LoggerService instance.
 *
 * Spartacus is providing two types of server loggers:
 * - DefaultExpressServerLogger - default implementation used for logging contextual messages in SSR.
 * - LegacyExpressServerLogger - used for logging if contextual logging is disabled
 *
 */
export const EXPRESS_SERVER_LOGGER = new InjectionToken<ExpressServerLogger>(
  'EXPRESS_SERVER_LOGGER'
);
