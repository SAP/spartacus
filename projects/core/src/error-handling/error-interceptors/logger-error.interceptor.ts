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
  ErrorInterceptorPriority,
} from './error-interceptor';

Injectable({
  providedIn: 'root',
});
export class LoggerErrorInterceptor implements ErrorInterceptor {
  priority = ErrorInterceptorPriority.HIGH;
  logger = inject(LoggerService);
  interceptError(error: Error, next?: ChainedErrorInterceptorFn): void {
    this.logger.error(error);
    if (next) {
      next(error);
    }
  }
}
