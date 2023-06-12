/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, inject } from '@angular/core';
import { LoggerService, WindowRef } from '@spartacus/core';
import { formatWithOptions } from 'util';
import { SERVER_LOGGER } from '../loggers/server-logger';

@Injectable({ providedIn: 'root' })
export class PrerenderingLoggerService implements LoggerService {
  serverLogger = inject(SERVER_LOGGER);
  windowRef = inject(WindowRef);

  log(...args: Parameters<typeof console.log>) {
    this.serverLogger.log(
      formatWithOptions({ breakLength: Infinity }, ...args),
      {
        request: { url: this.windowRef.location.href },
      }
    );
  }
  warn(...args: Parameters<typeof console.warn>) {
    this.serverLogger.warn(
      formatWithOptions({ breakLength: Infinity }, ...args),
      {
        request: { url: this.windowRef.location.href },
      }
    );
  }
  error(...args: Parameters<typeof console.error>) {
    this.serverLogger.error(
      formatWithOptions({ breakLength: Infinity }, ...args),
      {
        request: { url: this.windowRef.location.href },
      }
    );
  }
  info(...args: Parameters<typeof console.info>) {
    this.serverLogger.info(
      formatWithOptions({ breakLength: Infinity }, ...args),
      {
        request: { url: this.windowRef.location.href },
      }
    );
  }
  debug(...args: Parameters<typeof console.debug>) {
    this.serverLogger.debug(
      formatWithOptions({ breakLength: Infinity }, ...args),
      {
        request: { url: this.windowRef.location.href },
      }
    );
  }
}
