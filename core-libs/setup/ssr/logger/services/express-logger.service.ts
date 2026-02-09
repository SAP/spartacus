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
 * Custom `LoggerService` used in ExpressJS.
 *
 * It converts the input arguments to a final string message similar as the native `console`
 * does (using the native function `format` from `node:util`) and passes this message
 * to a concrete server logger, used in ExpressJS.
 *
 * Besides the message, it also passes the current `request` of ExpressJS as an additional
 * context to the concrete server logger.
 *
 * In the modern SSR system (CxAngularNodeAppEngine), the logger is provided via
 * REQUEST_CONTEXT.cx.logger and the request is provided via Angular's REQUEST token.
 * In the legacy system (OptimizedSsrEngine), the logger is provided via the
 * EXPRESS_SERVER_LOGGER injection token and the request via Spartacus's REQUEST token.
 */
@Injectable({ providedIn: 'root' })
export class ExpressLoggerService implements LoggerService {
  /**
   * Request object resolved at injection time.
   *
   * Resolution order:
   * 1. Legacy path: Spartacus's REQUEST token (Express Request from OptimizedSsrEngine)
   * 2. Modern path: Angular's REQUEST token (IncomingMessage from AngularNodeAppEngine)
   *
   * Note: Angular's REQUEST provides IncomingMessage, not Express Request.
   * Both are compatible for logging purposes (url, method, headers).
   */
  request: Request | IncomingMessage =
    inject(LEGACY_REQUEST, { optional: true }) ??
    (inject(REQUEST, { optional: true }) as IncomingMessage | null) ??
    ({} as Request);

  /**
   * Server logger resolved at injection time.
   *
   * Resolution order:
   * 1. Legacy path: EXPRESS_SERVER_LOGGER token (from OptimizedSsrEngine)
   * 2. Modern path: REQUEST_CONTEXT.cx.logger (from CxAngularNodeAppEngine)
   */
  serverLogger: ExpressServerLogger =
    inject(EXPRESS_SERVER_LOGGER, { optional: true }) ??
    (inject(REQUEST_CONTEXT, { optional: true }) as RequestContextWithCx | null)
      ?.cx?.logger ??
    this.createFallbackLogger();

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
   * Creates a fallback logger that uses console methods.
   */
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
