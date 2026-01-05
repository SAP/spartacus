/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { isDevMode } from '@angular/core';
import { Request } from 'express';
import { formatWithOptions } from 'node:util';
import { getRequestContext } from '../../optimized-engine/request-context';
import { getLoggerInspectOptions } from '../get-logger-inspect-options';
import {
  ExpressServerLogger,
  ExpressServerLoggerContext,
} from './express-server-logger';

/**
 *
 * Default logger used in SSR (ExpressJS) to enhance logs visible e.g. in monitoring tools e.g. Kibana.
 * It outputs a JSON with properties "message" and "context",
 * which contains a "timestamp" and details of the "request" ("url", "uuid", "timeReceived")
 *
 * The output "context" JSON will contain also a property "traceContext"
 * with "traceId", "parentId", "version" and "traceFlags",
 * if only the given request has the special header "traceparent" (specifed in
 * the "W3C TraceContext" document. See https://www.w3.org/TR/trace-context/#traceparent-header ).
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
   * In prod mode, it prints a single line stringified JSON that can be easily parsed by
   * monitoring tools e.g. Kibana.
   *
   * In dev mode, it prints human readable multi-line stringified JSON with indentation.
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

    if (isDevMode()) {
      // In dev mode, we want a *human-readable* string representation of the log object
      // that can be printed in the console.
      return formatWithOptions(getLoggerInspectOptions(), logObject);
    }

    // In prod mode, we want a *single-line* JSON which is machine-readable - easy to parse for monitoring tools.
    // The monitoring tools can then decide how to display in their UI the JSON's properties.
    return JSON.stringify(
      logObject,
      /**
       * Replaces Error instances with their stringified representation.
       */
      (_key: string, value: any) => {
        return value instanceof Error ? this.stringifyError(value) : value;
      }
    );
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
      ...getRequestContext(request),
    };
  }

  /**
   * Converts an Error object into a detailed string (with message, stack, cause, etc.).
   *
   * Otherwise, the Error instance would not be visible in the logs after passing through `JSON.stringify()`.
   * For more, see https://stackoverflow.com/a/50738205/11734692
   */
  protected stringifyError(error: unknown): string {
    return formatWithOptions(getLoggerInspectOptions(), error);
  }
}
