/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { isDevMode } from '@angular/core';
import { Request } from 'express';
import {
  ExpressServerLogger,
  ExpressServerLoggerContext,
} from './express-server-logger';

/**
 *
 * Default logger used in SSR (ExpressJS) to enhance logs visible e.g. in monitoring tools e.g. Kibana.
 * It outputs a JSON with properties "message" and "context",
 * which contains a "timestamp" and details of the "request" ("url", "uuid", "timeReceived")
 */
export class DefaultExpressServerLogger implements ExpressServerLogger {
  log(message: string, context: ExpressServerLoggerContext): void {
    /* eslint-disable-next-line no-console */
    console.log(this.stringifyWithContext(message, context));
  }
  warn(message: string, context: ExpressServerLoggerContext): void {
    /* eslint-disable-next-line no-console */
    console.warn(this.stringifyWithContext(message, context));
  }
  error(message: string, context: ExpressServerLoggerContext): void {
    /* eslint-disable-next-line no-console */
    console.error(this.stringifyWithContext(message, context));
  }
  info(message: string, context: ExpressServerLoggerContext): void {
    /* eslint-disable-next-line no-console */
    console.info(this.stringifyWithContext(message, context));
  }
  debug(message: string, context: ExpressServerLoggerContext): void {
    /* eslint-disable-next-line no-console */
    console.debug(this.stringifyWithContext(message, context));
  }

  /**
   * Converts a message and an ExpressServerLoggerContext object into a single JSON string containing both pieces of information, which can be used for logging purposes.
   *
   * @protected
   * @param message - The message to be included in the log entry.
   * @param context - The context object associated with the log entry.
   * @returns A JSON string containing both the message and context information, suitable for logging.
   */
  protected stringifyWithContext(
    message: string,
    context: ExpressServerLoggerContext
  ): string {
    const logObject = { message, context: this.mapContext(context) };

    return isDevMode()
      ? JSON.stringify(logObject, null, 2)
      : JSON.stringify(logObject);
  }

  /**
   * Map the context for the ExpressServerLogger
   *
   * @protected
   * @param context - The logging context object to be mapped
   * @returns - The mapped context with timestamp and request (if available)
   */
  protected mapContext(
    context: ExpressServerLoggerContext
  ): Record<string, any> {
    const timestamp = new Date().toISOString();
    const outputContext = { timestamp, ...context };

    if (context.request) {
      Object.assign(outputContext, {
        request: this.mapRequest(context.request),
      });
    }

    return outputContext;
  }

  /**
   * Maps a Request object into a JavaScript object with specific properties.
   *
   * @protected
   * @param request - An Express Request object.
   * @returns - A mapped request object. By default, it contains only "url", a random "uuid" and "timeReceived" of the request.
   */
  protected mapRequest(request: Request): Record<string, any> {
    return {
      url: request.originalUrl,
      ...request.res?.locals.cx.request,
    };
  }
}
