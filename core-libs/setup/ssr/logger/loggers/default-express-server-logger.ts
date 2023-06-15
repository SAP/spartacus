/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

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

    return JSON.stringify(object);
  }

  protected mapRequest(request: Request): Record<string, any> {
    return {
      url: request.originalUrl,
      ...request.res?.locals.cx.request,
    };
  }
}
