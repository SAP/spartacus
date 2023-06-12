/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { LogContext, ServerLogger } from './server-logger';

export class PrerenderingServerLogger extends ServerLogger {
  log(message: string, context?: LogContext) {
    /* eslint-disable-next-line no-console */
    console.log(this.createLogMessage(message, context));
  }
  warn(message: string, context?: LogContext) {
    /* eslint-disable-next-line no-console */
    console.warn(this.createLogMessage(message, context));
  }
  error(message: string, context?: LogContext) {
    /* eslint-disable-next-line no-console */
    console.error(this.createLogMessage(message, context));
  }

  protected createLogMessage(message: string, context: LogContext | undefined) {
    const messageObject = {
      message,
      context: {
        timestamp: new Date().toISOString(),
        ...context,
      },
    };

    return JSON.stringify(messageObject);
  }
}
