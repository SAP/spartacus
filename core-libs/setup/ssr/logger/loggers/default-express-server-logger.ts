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
 * TraceContext is used for log message in server side rendering.
 * It contains values of traceparent header.
 *
 * @property version - version of traceparent header
 * @property traceId - traceId of traceparent header
 * @property spanId - spanId of traceparent header
 * @property traceFlags - traceFlags of traceparent header
 *
 * @see https://www.w3.org/TR/trace-context/#traceparent-header-field
 */
interface Traceparent {
  version: string;
  traceId: string;
  spanId: string;
  traceFlags: string;
}

/**
 *
 * Default logger used in SSR (ExpressJS) to enhance logs visible e.g. in monitoring tools e.g. Kibana.
 * It outputs a JSON with properties "message" and "context",
 * which contains a "timestamp" and details of the "request" ("url", "uuid", "timeReceived")
 */
export class DefaultExpressServerLogger implements ExpressServerLogger {
  log(message: string, context: ExpressServerLoggerContext): void {
    /* eslint-disable-next-line no-console */
    console.log(this.createLogMessage(message, context));
  }
  warn(message: string, context: ExpressServerLoggerContext): void {
    /* eslint-disable-next-line no-console */
    console.warn(this.createLogMessage(message, context));
  }
  error(message: string, context: ExpressServerLoggerContext): void {
    /* eslint-disable-next-line no-console */
    console.error(this.createLogMessage(message, context));
  }
  info(message: string, context: ExpressServerLoggerContext): void {
    /* eslint-disable-next-line no-console */
    console.info(this.createLogMessage(message, context));
  }
  debug(message: string, context: ExpressServerLoggerContext): void {
    /* eslint-disable-next-line no-console */
    console.debug(this.createLogMessage(message, context));
  }

  protected createLogMessage(
    message: string,
    context: ExpressServerLoggerContext
  ): string {
    const timestamp = new Date().toISOString();
    const object = {
      message,
      context: {
        timestamp,
        ...context,
      },
    };
    if (context.request) {
      Object.assign(object.context, {
        request: this.mapRequest(context.request),
      });
    }

    return isDevMode()
      ? JSON.stringify(object, null, 2)
      : JSON.stringify(object);
  }

  protected mapRequest(request: Request): Record<string, any> {
    const mappedRequest = {
      url: request.originalUrl,
      ...request.res?.locals.cx.request,
    };

    if (
      request.headers?.traceparent &&
      typeof request.headers?.traceparent === 'string'
    ) {
      Object.assign(mappedRequest, {
        openTracing: this.mapTraceparent(request.headers.traceparent),
      });
    }

    return mappedRequest;
  }

  /**
   * Maps traceparent header to object with properties version, traceId, spanId and traceFlags.
   *
   * @param traceparent
   * @returns Params of the traceparent header
   *
   * @see https://www.w3.org/TR/trace-context/#traceparent-header-field-values
   */
  protected mapTraceparent(traceparent: string): Traceparent {
    const [version, traceId, spanId, traceFlags] = traceparent.split('-');
    return {
      version,
      traceId,
      spanId,
      traceFlags,
    };
  }
}
