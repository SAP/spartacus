/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Request } from 'express';
import { LogContext, ServerLogger } from './server-logger';

/**
 * Logger that's used for SSR purposes to enhance logs visible e.g. in monitoring tools like Kibana.
 * It logs to the console an object extended with a timestamp and provided context.
 * It also formats the request object to a more readable format.
 */
export class ExpressServerLogger implements ServerLogger {
  log(message: string, context: LogContext): void {
    /* eslint-disable-next-line no-console */
    console.log(this.createLogMessage(message, context));
  }
  warn(message: string, context: LogContext): void {
    /* eslint-disable-next-line no-console */
    console.warn(this.createLogMessage(message, context));
  }
  error(message: string, context: LogContext): void {
    /* eslint-disable-next-line no-console */
    console.error(this.createLogMessage(message, context));
  }
  info(message: string, context: LogContext): void {
    /* eslint-disable-next-line no-console */
    console.info(this.createLogMessage(message, context));
  }
  debug(message: string, context: LogContext): void {
    /* eslint-disable-next-line no-console */
    console.debug(this.createLogMessage(message, context));
  }

  protected createLogMessage(message: string, context: LogContext): string {
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
      render: request.res?.locals.cx.render,
      /* remove headers before release. Replace with information about about traceparent */
      headers: request.headers, //
    };
  }
}
