/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, inject } from '@angular/core';
import { LoggerService } from '../../logger';
import {
  ChainedErrorInterceptorFn,
  ErrorInterceptor,
} from './error-interceptor';

@Injectable({
  providedIn: 'root',
})
export class LoggerErrorInterceptor implements ErrorInterceptor {
  logger = inject(LoggerService);
  intercept(error: Error, next?: ChainedErrorInterceptorFn): void {
    this.logger.error(error);
    if (next) {
      next(error);
    }
  }
}
