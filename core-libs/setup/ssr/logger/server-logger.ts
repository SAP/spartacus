/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Inject, Injectable, Optional } from '@angular/core';
import { REQUEST } from '@nguniversal/express-engine/tokens';
import { Logger, WindowRef } from '@spartacus/core';
import { Request } from 'express';
import { format } from 'util';
import { SsrLogger, ssrLoggerToken } from './ssr-logger';

@Injectable()
export class ServerLogger implements Logger {
  constructor(
    @Inject(REQUEST) @Optional() protected request: Request,
    @Inject(ssrLoggerToken) protected ssrLogger: SsrLogger,
    protected windowRef: WindowRef
  ) {}
  log(message?: any, ...optionalParams: any[]): void {
    this.ssrLogger.log(format(message, ...optionalParams), {
      request: this.getRequest(),
    });
  }
  error(message?: any, ...optionalParams: any[]): void {
    this.ssrLogger.error(format(message, ...optionalParams), {
      request: this.getRequest(),
    });
  }
  warn(message?: any, ...optionalParams: any[]): void {
    this.ssrLogger.warn(format(message, ...optionalParams), {
      request: this.getRequest(),
    });
  }

  getRequest() {
    return this.request || { url: this.windowRef.location.href };
  }
}
