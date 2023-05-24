/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Request } from 'express';
import { LogMetadata, SsrLogger } from '../ssr-logger';

export class DefaultExpressSsrLogger extends SsrLogger {
  log(message: string, context: LogMetadata): void {
    console.log(this.createLogMessage(message, context));
  }
  warn(message: string, context: LogMetadata): void {
    console.error(this.createLogMessage(message, context));
  }
  error(message: string, context: LogMetadata): void {
    console.error(this.createLogMessage(message, context));
  }

  protected createLogMessage(message: string, context: LogMetadata): string {
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

    return JSON.stringify(object, null, 2);
  }

  protected mapRequest(request: Request): Record<string, any> {
    return {
      url: request.originalUrl,
      render: request.res?.locals.cx.render,
    };
  }
}
