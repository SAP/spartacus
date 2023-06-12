/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, inject } from '@angular/core';
import { REQUEST } from '@nguniversal/express-engine/tokens';
import { LoggerService } from '@spartacus/core';
import { formatWithOptions } from 'util';
import { SERVER_LOGGER } from '../loggers/server-logger';

@Injectable({ providedIn: 'root' })
export class ExpressLoggerService implements LoggerService {
  request = inject(REQUEST);
  serverLogger = inject(SERVER_LOGGER);

  log(...args: Parameters<typeof console.log>): void {
    this.serverLogger.log(this.formatLogMessage(...args), {
      request: this.request,
    });
  }
  warn(...args: Parameters<typeof console.warn>): void {
    this.serverLogger.warn(this.formatLogMessage(...args), {
      request: this.request,
    });
  }
  error(...args: Parameters<typeof console.error>): void {
    this.serverLogger.error(this.formatLogMessage(...args), {
      request: this.request,
    });
  }

  protected formatLogMessage(message?: any, ...optionalParams: any[]): string {
    // TODO: add comment about why - (because Kibana, to not split into separate lines)
    return formatWithOptions(
      { breakLength: Infinity },
      message,
      ...optionalParams
    );
  }
}
