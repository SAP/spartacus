/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { LogContext, ServerLogger } from './server-logger';

export class DefaultServerLogger extends ServerLogger {
  log(message: string, context?: LogContext) {
    console.log(this.createLogMessage(message, context));
  }
  warn(message: string, context?: LogContext) {
    console.warn(this.createLogMessage(message, context));
  }
  error(message: string, context?: LogContext) {
    console.error(this.createLogMessage(message, context));
  }

  protected createLogMessage(message: string, context: LogContext | undefined) {
    return {
      message,
      context: {
        timestamp: new Date().toISOString(),
        ...context,
      },
    };
  }
}
