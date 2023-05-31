/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, inject } from '@angular/core';
import { LoggerService, WindowRef } from '@spartacus/core';
import { format } from 'util';
import { serverLoggerToken } from '../loggers/server-logger';

@Injectable({ providedIn: 'root' })
export class PrerenderingLoggerService implements LoggerService {
  ssrLogger = inject(serverLoggerToken);
  windowRef = inject(WindowRef);

  log(...args: Parameters<typeof console.log>) {
    this.ssrLogger.log(format(...args), {
      request: { url: this.windowRef.location.href },
    });
  }
  warn(...args: Parameters<typeof console.warn>) {
    this.ssrLogger.warn(format(...args), {
      request: { url: this.windowRef.location.href },
    });
  }
  error(...args: Parameters<typeof console.error>) {
    this.ssrLogger.error(format(...args), {
      request: { url: this.windowRef.location.href },
    });
  }
}
