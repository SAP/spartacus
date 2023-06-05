/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, inject } from '@angular/core';
import { REQUEST } from '@nguniversal/express-engine/tokens';
import { LoggerService } from '@spartacus/core';
import { formatWithOptions } from 'util';
import { serverLoggerToken } from '../loggers/server-logger';

@Injectable({ providedIn: 'root' })
export class ExpressLoggerService implements LoggerService {
  request = inject(REQUEST);
  logger = inject(serverLoggerToken);

  log(...args: Parameters<typeof console.log>): void {
    this.logger.log(this.formatLogMessage(...args), {
      request: this.request,
    });
  }
  warn(...args: Parameters<typeof console.warn>): void {
    this.logger.warn(this.formatLogMessage(...args), {
      request: this.request,
    });
  }
  error(...args: Parameters<typeof console.error>): void {
    this.logger.error(this.formatLogMessage(...args), {
      request: this.request,
    });
  }

  protected formatLogMessage(message?: any, ...optionalParams: any[]): string {
    return formatWithOptions(
      { breakLength: Infinity },
      message,
      ...optionalParams
    );
  }
}
