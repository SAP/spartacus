/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, REQUEST, REQUEST_CONTEXT, inject } from '@angular/core';
import { LoggerService } from '@spartacus/core';
import { Request } from 'express';
import { IncomingMessage } from 'http';
import { formatWithOptions } from 'util';
import { RequestContextWithCx } from '../../engine/request-context.model';
import { REQUEST as LEGACY_REQUEST } from '../../tokens/express.tokens';
import { getLoggerInspectOptions } from '../get-logger-inspect-options';
import { EXPRESS_SERVER_LOGGER, ExpressServerLogger } from '../loggers';

/**
 * Custom `LoggerService` used in Express-based SSR.
 *
 * Converts input arguments to a formatted string message (similar to native `console`)
 * and passes it to a server logger along with the current request context.
 *
 * Supports both modern (CxAngularNodeAppEngine) and legacy (OptimizedSsrEngine) SSR systems.
 */
@Injectable({ providedIn: 'root' })
export class ExpressLoggerService implements LoggerService {
  /** Current request (Express Request or IncomingMessage) */
  private request: Request | IncomingMessage = this.resolveRequest();

  /** Server logger instance */
  private serverLogger: ExpressServerLogger = this.resolveLogger();

  log(...args: Parameters<typeof console.log>): void {
    this.serverLogger.log(this.formatLogMessage(...args), {
      request: this.request as Request,
    });
  }

  warn(...args: Parameters<typeof console.warn>): void {
    this.serverLogger.warn(this.formatLogMessage(...args), {
      request: this.request as Request,
    });
  }

  error(...args: Parameters<typeof console.error>): void {
    this.serverLogger.error(this.formatLogMessage(...args), {
      request: this.request as Request,
    });
  }

  info(...args: Parameters<typeof console.info>): void {
    this.serverLogger.info(this.formatLogMessage(...args), {
      request: this.request as Request,
    });
  }

  debug(...args: Parameters<typeof console.debug>): void {
    this.serverLogger.debug(this.formatLogMessage(...args), {
      request: this.request as Request,
    });
  }

  protected formatLogMessage(message?: any, ...optionalParams: any[]): string {
    return formatWithOptions(
      getLoggerInspectOptions(),
      message,
      ...optionalParams
    );
  }

  /**
   * Resolves the request object from available injection tokens.
   * Prefers legacy Spartacus REQUEST (Express Request) over Angular's REQUEST (IncomingMessage).
   */
  private resolveRequest(): Request | IncomingMessage {
    return (
      inject(LEGACY_REQUEST, { optional: true }) ??
      (inject(REQUEST, { optional: true }) as IncomingMessage | null) ??
      ({} as Request)
    );
  }

  /**
   * Resolves the server logger from available sources.
   * Prefers legacy EXPRESS_SERVER_LOGGER token over REQUEST_CONTEXT.cx.logger.
   */
  private resolveLogger(): ExpressServerLogger {
    return (
      inject(EXPRESS_SERVER_LOGGER, { optional: true }) ??
      (inject(REQUEST_CONTEXT, { optional: true }) as RequestContextWithCx | null)
        ?.cx?.logger ??
      this.createFallbackLogger()
    );
  }

  /** Creates a fallback logger using console methods. */
  private createFallbackLogger(): ExpressServerLogger {
    return {
      /* eslint-disable no-console */
      log: (message: string) => console.log(message),
      warn: (message: string) => console.warn(message),
      error: (message: string) => console.error(message),
      info: (message: string) => console.info(message),
      debug: (message: string) => console.debug(message),
      /* eslint-enable no-console */
    };
  }
}
